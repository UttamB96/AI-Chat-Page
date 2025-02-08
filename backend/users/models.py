from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid

# Create your models here.    
class UserManager(BaseUserManager):
    def create_user(self, name, user_name, email, password=None, **extra_fields):
        if not name:
            raise ValueError('Name must be provided')
        if not user_name:
            raise ValueError('A Username must be provided')
        if not email:
            raise ValueError('Email must be provided')
        
        email = self.normalize_email(email)
        user = self.model(
            name=name,
            user_name=user_name,
            email=self.normalize_email(email)
        )
        user = self.model(
            name=name,
            user_name=user_name,
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, name, user_name, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, user_name, email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    '''Model definition for ModelName.'''
    name = models.CharField(max_length=254)
    user_name = models.CharField(unique=True, max_length=254)
    email = models.EmailField(max_length=254, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['name', 'email']
    
    objects = UserManager()

    def __str__(self):
        return f"{self.email}"