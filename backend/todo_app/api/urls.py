from django.urls import path
from . import views

urlpatterns = [
    path("todos/", views.ListToDOItemView.as_view(), name="list-items"),
    path("create/", views.CreateToDoItemView.as_view(), name="create-item"),
    path("<int:pk>/update/", views.UpdataToDoItemView.as_view(), name="update-item"),
    path("<int:pk>/delete/", views.DeleteToDoItemView.as_view(), name="delete-item"),
    path("", views.index, name="index"),
]
