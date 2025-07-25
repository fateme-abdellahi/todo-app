from rest_framework import generics
from . import serializers
from .. import models


class ListToDOItemView(generics.ListAPIView):
    serializer_class=serializers.ItemSerializer
    
    def get_queryset(self):
        return models.ToDo.objects.filter(user=self.request.user)
    