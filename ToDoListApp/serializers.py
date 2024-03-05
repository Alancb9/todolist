from rest_framework import serializers
from .models import ToDo 


class TodoSerializador(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ["id", "tarea", "completada"]