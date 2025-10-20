from rest_framework import serializers
from .. import models


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ToDo
        exclude = [
            "user",
        ]
        read_only_fields = [
            "created",
            "updated",
        ]
    def validate(self, attrs):
        if attrs.get("title") and models.ToDo.objects.filter(user=self.context["request"].user,title=attrs["title"]).exists():
            raise serializers.ValidationError({"title":"task with this title already exists"})
        return attrs
    def save(self, **kwargs):
        return super().save(user=self.context["request"].user, **kwargs)
