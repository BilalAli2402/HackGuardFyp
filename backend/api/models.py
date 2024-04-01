from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = extra_fields.get('is_staff', False)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class Permission(models.Model):
    permission_id = models.AutoField(primary_key=True)
    resource = models.CharField()
    action = models.CharField()

    class Meta:
        db_table = 'Permissions'
    
    def __str__(self):
        return str(self.permission_id)

class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=50)
    permissions = models.ManyToManyField(Permission, related_name='roles')
    def __str__(self):
        return self.role_id
    
    class Meta:
        db_table = 'Roles'

    def __str__(self) -> str:
        return str(self.role_id)
    
class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    username = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255, null=True)
    contact = models.CharField(max_length=11, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    roles = models.ManyToManyField(Role, related_name='users')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'Users'

    def __str__(self):
        return str(self.user_id)

class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question_text = models.TextField()
    active = models.BooleanField()
    created_by = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'creator')
    
    class Meta:
        db_table = 'Questions'
    
    def __str__(self) -> str:
        return str(self.question_id)
    
class Answer(models.Model):
    answer_id = models.AutoField(primary_key=True)
    answer = models.TextField()
    is_correct = models.BooleanField()
    question_id = models.ForeignKey(Question, on_delete = models.CASCADE, related_name = 'answers')

    class Meta:
        db_table = 'Answers'

    def __str__(self) -> str:
        return str(self.answer_id)
    
class QuizAttempt(models.Model):
    attempt_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete = models.CASCADE, related_name='attempts')
    score = models.IntegerField()
    attempted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Attempts'
        ordering = ['-score']

    def __str__(self) -> str:
        return str(self.user_id)