from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class ToDoItemTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.todo_data = self.client.post(
            reverse("create-item"), {"title": "create", "description": "create item"}
        )
        self.pk = self.todo_data.data.get("id")

    def test_create_todo_item(self):

        self.assertEqual(self.todo_data.status_code, status.HTTP_201_CREATED)

    def test_update_todo_item(self):
        response = self.client.put(
            reverse("update-item", kwargs={"pk": self.pk}),
            {"title": "update", "description": "update item"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_todo_item(self):
        response = self.client.delete(reverse("delete-item", kwargs={"pk": self.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_list_todo_items(self):
        response = self.client.get(reverse("list-items"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
