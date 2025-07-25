from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .. import models

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    image=serializers.ImageField(write_only=True,required=False,default=None)
    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email','image']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }
    def save(self, **kwargs):
        if self.validated_data['password'] != self.validated_data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email']
        )
        user.set_password(self.validated_data['password'])
        user.save()
        token=Token.objects.create(user=user)
        models.Profile.objects.create(user=user,image=self.validated_data['image'])
        return token
            