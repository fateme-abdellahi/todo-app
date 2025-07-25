from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.ListToDOItemView.as_view(), name='list-items'),
    path('create/', views.CreateToDoItemView.as_view(), name='create-item'),

]
