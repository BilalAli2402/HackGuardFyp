from rest_framework import serializers
from .models import User, Role, Permission, Question, Answer, QuizAttempt

class CreateUserSerializer(serializers.ModelSerializer):
    roles = serializers.PrimaryKeyRelatedField(many=True, queryset=Role.objects.all(), write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'created_at', 'password', 'is_staff', 'roles']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        roles_data = validated_data.pop('roles', [])
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        for role in roles_data:
            user.roles.add(role)
        return user

    def validate(self, data):
        errors = {}
        username = data.get('username')
        email = data.get('email')
        contact = data.get('contact')
        password = data.get('password')
        roles = data.get('roles')

        if not username:
            errors['username'] = 'username cannot be empty'

        if not email:
            errors['email'] = 'email cannot be empty'
        
        if contact and len(contact) != 11:
            errors['contact'] = 'contact must be 11 digits'

        if not password:
            errors['password'] = 'password should not be empty'
        
        if not roles:
            errors['roles'] = "set a role for user"
        elif roles and len(roles) < 1:
            errors['roles'] = "set a role for user"

        if errors:
            raise serializers.ValidationError(errors)
        
        return data

class FetchUserSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=False)
    uid = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    contact = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)
    roles = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)

    class Meta:
        model = User
        fields = ['user_id', 'uid', 'contact', 'address', 'created_at']

    def to_representation(self, instance):
        roles = instance.roles.all()
        roles_data = [{'id': role.role_id, 'name': role.role_name} for role in roles]
        return {
            'user_id': instance.user_id,
            'uid': instance.uid,
            'username': instance.username,
            'email': instance.email,
            'contact': instance.contact,
            'address': instance.address,
            'created_at': instance.created_at,
            'roles': roles_data,
        }
    
    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        contact = data.get('contact')
        user_id = data.get('user_id')
        if not user_id and not username and not email and not contact:
            raise serializers.ValidationError({'error':'please provide one user attribute to search on users'})
        
        return data

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['contact', 'address']

    def validate(self, data):
        errors = {}        
        contact = data.get('contact')
        if contact and len(contact) != 11:
            errors['contact'] = 'contact must be 11 digits'

        if errors:
            raise serializers.ValidationError(detail=errors)
        
        return data
    
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['role_id', 'role_name']

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['permission_id', 'permission_name', 'permission_method']

class CreateAnswerSerializer(serializers.Serializer):
    answer = serializers.CharField(required=True)
    is_correct = serializers.BooleanField(required=True)

class CreateQuestionSerializer(serializers.Serializer):
    question = serializers.CharField(required=True)
    active = serializers.BooleanField(required=True)
    answers = CreateAnswerSerializer(many=True, required=True)

    def validate(self, attrs):
        answers = attrs.get('answers')

        if len(answers) > 4:
            raise serializers.ValidationError("No more than 4 answers acceptable")
        
        return attrs
    
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['answer_id', 'answer', 'is_correct', 'question_id']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_id', 'question_text', 'active', 'created_by']

class AttempQuizSerializer(serializers.Serializer):
    answer_id = serializers.IntegerField(required=True)
    question_id = serializers.IntegerField(required=True)

class AttemptQuizRequestSerializer(serializers.Serializer):
    attempt = AttempQuizSerializer(many=True, required=True)
    
class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = ['attempt_id', 'user_id', 'score', 'attempted_at']