from django.contrib import admin
from .models import Task, Goal, Event, Habit

# Register your models here.

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'priority', 'status', 'hours', 'due_date', 'created_at')
    search_fields = ('title', 'category')
    list_filter = ('category', 'priority', 'status')

@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'created_at')
    search_fields = ('name',)

@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'target_per_week', 'progress')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date', 'start_time', 'end_time', 'category')
    list_filter = ('date', 'category')
