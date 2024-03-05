from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import ToDo
from .serializers import TodoSerializador

# Create your views here.

@api_view(["GET", "POST"])
def toDoLista(request):
    if request.method ==  "GET":
        todos = ToDo.objects.all()
        serializador = TodoSerializador(todos, many=True)
        return Response(serializador.data)
    
    elif request.method == "POST":
        serializador = TodoSerializador(data=request.data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status=status.HTTP_201_CREATED)
        return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET", "PATCH", "PUT", "DELETE"])
def todo_detail(request, pk):
    todo = get_object_or_404(ToDo, id=pk)
    
    if request.method == 'GET':
        serializador = TodoSerializador(todo)
        return Response(serializador.data)
    
    elif request.method == 'PATCH':
        serializador = TodoSerializador(todo, data=request.data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data)
        return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
