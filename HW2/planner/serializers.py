from rest_framework import serializers
from .models import Task, Goal, Event, Habit

class TaskSerializer(serializers.ModelSerializer):
    hours = serializers.ReadOnlyField()  # Include the computed hours property
    
    class Meta:
        model = Task
        fields = '__all__'

class HabitSerializer(serializers.ModelSerializer):
    checks = serializers.ReadOnlyField()  # Include the computed checks property
    
    class Meta:
        model = Habit
        fields = '__all__'

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
