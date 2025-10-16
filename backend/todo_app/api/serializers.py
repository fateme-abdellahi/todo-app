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

    def save(self, **kwargs):
        return super().save(user=self.context["request"].user, **kwargs)
