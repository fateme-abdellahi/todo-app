from rest_framework import generics,permissions,filters
from . import serializers
from .. import models
from . import paginations


class ListToDOItemView(generics.ListAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=serializers.ItemSerializer
    pagination_class=paginations.ToDOListPagination
    filter_backends=[filters.SearchFilter,filters.OrderingFilter]
    search_fields=['title']
    ordering_fields=["title","created","updated","end_date"]
    throttle_scope="list"
    
    
    def get_queryset(self):
        return models.ToDo.objects.filter(user=self.request.user)
    
    
    
class CreateToDoItemView(generics.ListCreateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    throttle_scope="create" 
    serializer_class=serializers.ItemSerializer
    
    def get_queryset(self):
        return models.ToDo.objects.filter(user=self.request.user)
    

class UpdataToDoItemView(generics.UpdateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    throttle_scope="update"
    serializer_class=serializers.ItemSerializer
    
    def get_queryset(self):
        return models.ToDo.objects.filter(user=self.request.user)


class DeleteToDoItemView(generics.DestroyAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=serializers.ItemSerializer
    
    def get_queryset(self):
        return models.ToDo.objects.filter(user=self.request.user)
    