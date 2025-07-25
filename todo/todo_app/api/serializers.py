from rest_framework import serializers
from .. import models

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ToDo
        exclude=['user',]
        read_only_fields=["created","updated",]
        
    def validate_title(self,value):
        if models.ToDo.objects.filter(user=self.context.get('request').user,title=value).exists():
            raise serializers.ValidationError({"error":"the title already exists"})
        return value

    def save(self, **kwargs):
        return super().save(user=self.context['request'].user,**kwargs)
    