from rest_framework import generics,permissions
from . import serializers
from .. import models


class ListToDOItemView(generics.ListAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=serializers.ItemSerializer
    
    def get_queryset(self):
        return models.ToDo.objects.filter(user=self.request.user)
    