from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'is_staff', 'is_superuser', 'profile_img')

class UserRegisterationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "is_trainer")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password=validated_data.pop("password", None)
        user=self.Meta.model(**validated_data)
        if password:
            user.set_password(password)
        user.is_active = False
        user.save()

        return user
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

# Login Admin,user,trainer
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()  
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Incorrect Credentials")

        if user.is_superuser:
            attrs['is_superuser'] = True
        else:
            print("User is not a superuser")
            attrs['is_superuser'] = False
        
        if user.is_trainer:
            attrs['is_trainer'] = True
        else:
            print("User is not a trainer")
            attrs['is_trainer'] = False

        # Attach the user object to the validated data
        attrs['user'] = user

        return attrs

class TrainerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "is_trainer","position")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = self.Meta.model(**validated_data)
        if password:
            user.set_password(password)
        user.is_active = False
        user.is_trainer = True  
        user.save()
        return user 

# subscription
class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'name', 'description', 'price', 'duration', 'created_at', 'updated_at']
