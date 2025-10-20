from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .. import models


class UserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=False, default=None)

    class Meta:
        model = User
        fields = ["username", "password", "email", "image"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def save(self, **kwargs):
        if len(self.validated_data["password"])<8:
            raise serializers.ValidationError({"password":"Password length is less than 8 charachters"})
        user = User(
            username=self.validated_data["username"], email=self.validated_data["email"]
        )
        user.set_password(self.validated_data["password"])
        user.save()
        token = Token.objects.create(user=user)
        models.Profile.objects.create(user=user, image=self.validated_data["image"])
        return token
