from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import (RoleSerializer, PermissionSerializer)
from .models import Role, Permission, Question, Answer, QuizAttempt
from .Users import UserDAO
from .serializers import (FetchUserSerializer, CreateUserSerializer, UpdateUserSerializer,
                           CreateQuestionSerializer, AnswerSerializer, QuestionSerializer, AttemptQuizRequestSerializer,
                           QuizAttemptSerializer)
from rest_framework.validators import ValidationError
from django.db import transaction
from collections import OrderedDict
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache
from django.db.models import Max
from django.contrib.auth.models import AnonymousUser
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
class UserAPIView(APIView):

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.AllowAny()]
        if self.request.method in ["GET", "PUT"]:
            return [permissions.IsAuthenticated()]
        
    def get(self, request, *args, **kwargs):
        serializer = FetchUserSerializer(data=request.query_params)

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        
        queryset = UserDAO.get_user_by_request_data(request_data=serializer.validated_data)
        if queryset:
            serialized_data = [serializer.to_representation(user) for user in queryset]
            return Response(serialized_data, status=status.HTTP_200_OK)
        else:
            return Response({"NotFound": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)
        
        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        user = UserDAO.create_user(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    def put(self, request, *args, **kwargs):
        print('Updating User: ', request.user)
        user = UserDAO.get_user_by_id(user_id=request.user.user_id)
        serializer = UpdateUserSerializer(user, data=request.data)
        
        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        
        serializer.save(update_fields=['address', 'contact'])
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserLoginView(APIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        
        if not email or not password:
            return Response({'error': 'Missing email or password'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserDAO.get_user_by_request_data(OrderedDict(email=email)).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username
            refresh['email'] = user.email
            refresh['roles'] = [role.role_name for role in user.roles.all()]
            return Response({
                'user_id': user.user_id,
                'uid': user.uid,
                'username': user.username,
                'roles': [role.role_name for role in user.roles.all()],
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RoleView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            Role.objects.create(**request.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PermissionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PermissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RolePermissionView(APIView):
    def post(self, request, *args, **kwargs):
        role_id = request.data.get("role_id")
        permission_ids = request.data.get("permission_ids", [])
        try:
            role = Role.objects.get(role_id=role_id)
            permissions = Permission.objects.filter(permission_id__in=permission_ids)
            role.permissions.set(permissions)
            return Response({"status": "permissions updated"}, status=status.HTTP_200_OK)
        except Role.DoesNotExist:
            return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)
        
class CreateQuestionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CreateQuestionSerializer(data=request.data)

        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        
        with transaction.atomic():
            question_dict = {'question_text': serializer.validated_data['question'], 'active': serializer.validated_data['active'], 'created_by': request.user.user_id}
            question_serializer = QuestionSerializer(data=question_dict)
            if not question_serializer.is_valid():
                raise ValidationError(question_serializer.errors)
            
            question = Question.objects.create(**question_serializer.validated_data)
            
            answers = serializer.validated_data['answers']
            for answer in answers:
                answer_dict = {'answer': answer['answer'], 'is_correct': answer['is_correct'], 'question_id': question.question_id}
                answer_serializer = AnswerSerializer(data=answer_dict)
                if not answer_serializer.is_valid():
                    raise ValidationError(answer_serializer.errors)
                Answer.objects.create(**answer_serializer.validated_data)
            response = {'question_id': question.question_id,
                        'question': question.question_text,
                        'active': question.active,
                        'answers': [{'answer_id': answer.answer_id ,'answer': answer.answer, 'is_correct': answer.is_correct} for answer in question.answers.all()]
                        }
            cache.delete('answers')
            return Response(response, status=status.HTTP_201_CREATED)
        
class GetQuizView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwars):
        active_questions = Question.objects.filter(active=True)[0:5]

        response = [{'question_id': question.question_id,
                        'question': question.question_text,
                        'active': question.active,
                        'answers': [{'answer_id': answer.answer_id ,'answer': answer.answer, 'is_correct': answer.is_correct} for answer in question.answers.all()]
                        }for question in active_questions]
        
        return Response(response, status=status.HTTP_200_OK)
    
class AttemptQuizView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request_serializer = AttemptQuizRequestSerializer(data=request.data)
        if not request_serializer.is_valid():
            raise ValidationError(request_serializer.errors)
        
        cached_answers = cache.get('answers', None)
        total_correct = 0

        if not cached_answers:
            answers = [answer.answer_id for answer in Answer.objects.filter(is_correct=True)]
            cache.set('answers', answers)
            cached_answers = cache.get('answers', None)

        for user_answer in request_serializer.validated_data.get('attempt'):
            if user_answer.get('answer_id') in cached_answers:
                total_correct += 1
        
        response = {'user_id': request.user.user_id,
                    'score': total_correct}
        attempt = QuizAttemptSerializer(data=response)
        if not attempt.is_valid():
            raise ValidationError(attempt.errors)
        attempt.save()
        return Response(response, status=status.HTTP_200_OK)
        
class GetLeaderboardView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request,*args, **kwars):
        print(type(request.user))
        top_10_attempts = QuizAttempt.objects.values("user_id").annotate(high_score=Max("score"))
        response = [{'email': UserDAO.get_user_by_id(attempts.get("user_id")).email,
                     'score': attempts.get("high_score"),
                     'is_myself': request.user.user_id == attempts.get("user_id") if type(request.user) != AnonymousUser else False} for attempts in top_10_attempts]
        return Response(response, status=status.HTTP_200_OK)