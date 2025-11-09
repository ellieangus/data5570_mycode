from django.shortcuts import render
from rest_framework import viewsets
from .models import Task, Goal, Event, Habit
from .serializers import TaskSerializer, GoalSerializer, EventSerializer, HabitSerializer

# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all().order_by('-created_at')
    serializer_class = HabitSerializer

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all().order_by('-id')
    serializer_class = GoalSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('date','start_time')
    serializer_class = EventSerializer
