from django.http import JsonResponse
from django.shortcuts import render
from .models import Note


def index(request):
    notes = Note.objects.all().order_by('-date_created')
    data = {'notes': notes}
    response_data = {}
    if request.POST.get('action') == 'post':
        title = request.POST.get('title')
        text = request.POST.get('text')
        obj = Note.objects.create(
            title=title,
            text=text,
        )
        response_data['id'] = obj.id
        response_data['title'] = title
        response_data['text'] = text
        return JsonResponse(response_data)
    return render(request, 'index.html', data)


def details(request,pk):
    note = Note.objects.get(pk=pk)
    response_data = {}
    if request.POST.get('action') == 'post':
        title = request.POST.get('title')
        text = request.POST.get('text')
        Note.objects.filter(pk=pk).update(
            title = title,
            text = text,)
    response_data['id'] = note.id
    response_data['title'] = note.title
    response_data['text'] = note.text
    return JsonResponse(response_data)