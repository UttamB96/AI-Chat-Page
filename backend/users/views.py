import jwt, json
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer

class RegisterView(TokenObtainPairView):
    #authentication_classes = [AllowAny]
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            auth_token = str(refresh.access_token)
            username = str(user.user_name)
            response = Response({
                'refresh': str(refresh),
                'access': auth_token
            }, status=status.HTTP_201_CREATED)
            response.set_cookie('token', refresh, httponly=True, secure=True)
            response.set_cookie('username', username, httponly=True, secure=True)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):
    #authentication_classes = [AllowAny]
    permission_classes = [AllowAny]
    
    def post(self, request):
        user_name = request.data.get('user_name')
        password = request.data.get('password')
        user = authenticate(user_name=user_name, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            auth_token = str(refresh.access_token)
            username = str(user.user_name)
            response = Response({
                'refresh': str(refresh),
                'access': auth_token
            }, status=status.HTTP_200_OK)
            response.set_cookie('token', refresh, httponly=True, secure=True)
            response.set_cookie('username', username, httponly=True, secure=True)
            return response
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

"""class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'You are viewing protected content!'}
        return Response(content, status=status.HTTP_200_OK)"""
