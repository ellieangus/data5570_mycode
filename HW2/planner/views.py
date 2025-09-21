from django.shortcuts import render
from rest_framework import viewsets
from .models import Task, Goal, Event
from .serializers import TaskSerializer, GoalSerializer, EventSerializer

# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-id')
    serializer_class = TaskSerializer

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all().order_by('-id')
    serializer_class = GoalSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('date','start_time')
    serializer_class = EventSerializer
