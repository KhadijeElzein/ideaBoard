from django.db import models
from datetime import datetime


class Note(models.Model):
    title = models.CharField(null=True, blank=True, max_length=120)
    text = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(default=datetime.now)


def __str__(self):
    return self.title