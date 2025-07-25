from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class AuthTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="test",
            password="password@test",
            email="test@email.com"
        )
        self.token = Token.objects.create(user=self.user)

    def test_register(self):
        response = self.client.post(reverse('register'), {
            "username": "test2",
            "password": "password@test",
            "password2": "password@test",
            "email": "test2@email.com"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(reverse('register'), {
            "username": "test2",
            "password": "password@test",
            "password2": "password@test",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logout(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
