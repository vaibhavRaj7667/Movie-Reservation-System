from rest_framework import serializers
from django.contrib.auth.models import User
import re


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    
    def validate_email(self,value):

        if User.objects.filter(email=value):
            raise serializers.ValidationError("email alredy exist")
        
        return value


    def validate(self, attrs):
        if not attrs.get('email') or not attrs.get('password'):
            raise serializers.ValidationError("email or password is not provided")
        
        pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{12,}$"

    

        if not re.match(pattern, attrs.get('password')):
            raise serializers.ValidationError(
                (
                    "The field password must be at least 12 characters long and contain at least one special character."
                ),
                code="invalid_password",
            )


        return attrs
    
        
    
    def create(self, validated_data):
        
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user