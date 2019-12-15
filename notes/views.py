from django.shortcuts import render
from .models import Note

def index(request):
    notes = Note.objects.all().order_by('-date_created')
    data = {'notes':notes}
    return render(request, 'index.html', data)