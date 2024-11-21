from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'is_staff', 'is_superuser', 'profile_img', 'is_active')

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
    profile_img = serializers.ImageField(required=False)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "confirm_password",
            "is_trainer",
            "position",
            "profile_img"
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password", None)
        profile_img = validated_data.pop("profile_img", None)
        password = validated_data.pop("password", None)
        user = self.Meta.model(**validated_data)
        if password:
            user.set_password(password)
        user.is_trainer = True  # Ensure it's a trainer
        user.is_active = False  # Require email activation
        user.save()

        if profile_img:
            user.profile_img = profile_img
            user.save()

        return user
    
    def update(self, instance, validated_data):
        profile_img = validated_data.pop('profileImage', None)
        password = validated_data.pop('password', None)
        
        if password:
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if profile_img:
            instance.profile_img = profile_img
        
        instance.save()
        return instance

# subscription
class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'name', 'description', 'price', 'duration', 'created_at', 'updated_at']
