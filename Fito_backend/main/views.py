from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from . import serializers
from .models import *
from .serializers import  UserLoginSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

User = get_user_model()



class UserRegisteration(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.UserRegisterationSerializer

    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        print(request.data)
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token)
        }
        return Response(data, status=status.HTTP_201_CREATED)
    




def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response({"detail": "Account activated successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Activation link is invalid"}, status=status.HTTP_400_BAD_REQUEST)




class UserLogin(GenericAPIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed('Account does not exist')
        if user is None:
            raise AuthenticationFailed('User does not exist')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        return Response({
            "access_token": str(access_token),
            "refresh_token": str(refresh_token),
            "is_superuser": user.is_superuser,
        })
