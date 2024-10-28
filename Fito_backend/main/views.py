from django.contrib.auth import get_user_model
from rest_framework import status, generics, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from . import serializers
from .models import *
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


# SUNSCRIPTION VIEWS

# ADMIN SIDE
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

class TrainerListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.filter(is_trainer=True)
    serializer_class = serializers.TrainerSerializer
    permission_classes = [permissions.IsAdminUser]

class TrainerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(is_trainer=True)
    serializer_class = serializers.TrainerSerializer
    permission_classes = [permissions.IsAdminUser]

# USER SIDE
class UserTrainerListView(generics.ListAPIView):
    queryset = User.objects.filter(is_trainer=True)
    serializer_class = serializers.TrainerSerializer
    permission_classes = [permissions.AllowAny]

class UserSubscriptionListView(generics.ListAPIView):
    queryset = Subscription.objects.all()
    serializer_class = serializers.SubscriptionSerializer
    permission_classes = [permissions.AllowAny] #Accessible all authentcaited user
