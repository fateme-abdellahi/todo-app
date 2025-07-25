from django.db import models
from django.contrib.auth.models import User

class ToDo(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='todo_items')
    title=models.CharField(max_length=70,unique=True)
    description=models.TextField()
    completed=models.BooleanField(default=False)
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    end_date=models.DateTimeField(null=True,default=None)
    
    def __str__(self):
        return f"{self.user.username}: {self.title}"
