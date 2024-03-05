from django.db import models

# Create your models here.
class ToDo(models.Model):
    tareas = models.CharField(max_length = 100)
    completadas = models.BooleanField(default=False)
    creadas = models.DateField(auto_now_add=True)
    actualizadas = models.DateField(auto_now=True)

    def __str__(self):
        return self.tareas