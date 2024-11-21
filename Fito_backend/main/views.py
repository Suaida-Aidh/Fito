from . import serializers
from .models import *
from .tokens import account_activation_token
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rest_framework import status, generics, permissions
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, redirect
from django.contrib import messages


User = get_user_model()

# Authentication
class UserRegisteration(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.UserRegisterationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate email verification token
        token = account_activation_token.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        email_subject = 'Activate Your Account'
        email_body = render_to_string('activation_email.html', {
            'user': user,
            'domain': '127.0.0.1:8000',
            'uidb64': uid,
            'token': token,
        })

        send_mail(email_subject, email_body, settings.EMAIL_HOST_USER , [user.email])

        data = serializer.data
        data["message"] = "Please confirm your email address to complete the registration."
        return Response(data, status=status.HTTP_201_CREATED)

class ActivateAccountView(GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            messages.success(request, 'Congratulations Your account is activated ')
            return redirect('http://localhost:5173/activate') 
            # return Response({"message": "Account activated successfully! You can login to your account now."}, status=status.HTTP_200_OK)
        return Response({"message": "Activation failed. Invalid link or token."}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(GenericAPIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed('Account does not exist')
        
        if not user.is_active:
            raise AuthenticationFailed('your account is not activated')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)

        return Response({
            "access_token": str(access_token),
            "refresh_token": str(refresh_token),
            "is_superuser": user.is_superuser,
            "is_trainer": user.is_trainer,
        })

# TRAINER 
class TrainerRegistration(GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.TrainerRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Send activation email
        token = account_activation_token.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        email_subject = 'Activate Your Trainer Account'
        email_body = render_to_string('activation_email.html', {
            'user': user,
            'domain': '127.0.0.1:8000',
            'uidb64': uid,
            'token': token,
        })

        send_mail(
            email_subject, email_body, settings.EMAIL_HOST_USER, [user.email]
        )

        return Response(
            {"message": "Trainer added successfully. An activation email has been sent."},
            status=status.HTTP_201_CREATED
        )

class TrainerListView(generics.ListAPIView):
    queryset = User.objects.filter(is_trainer=True)
    serializer_class = serializers.CustomUserSerializer
    permission_classes = [AllowAny,]  # Only accessible by admins

class TrainerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(is_trainer=True)
    serializer_class = serializers.CustomUserSerializer
    permission_classes = [IsAdminUser]  # Only accessible by admins

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Trainer deleted successfully"}, status=status.HTTP_204_NO_CONTENT)



# SUNSCRIPTIONS


class SubscriptionCreateList(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = serializers.SubscriptionSerializer
    permission_classes = [IsAdminUser]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            subscription = serializer.save()
            return Response(self.get_serializer(subscription).data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SubscriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = serializers.SubscriptionSerializer
    permission_classes = [IsAdminUser]
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSubscriptionListView(generics.ListAPIView):
    queryset = Subscription.objects.all()
    serializer_class = serializers.SubscriptionSerializer
    permission_classes = [permissions.AllowAny] 


# USERS

class UserListView(generics.ListAPIView):
    queryset = User.objects.filter(is_trainer=False, is_superuser=False)
    serializer_class = serializers.CustomUserSerializer
    permission_classes = [IsAdminUser]

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = serializers.CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class TrainerProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.filter(is_trainer=True)
    serializer_class = serializers.TrainerRegistrationSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

