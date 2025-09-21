from django.contrib import admin
from .models import Task, Goal, Event

# Register your models here.

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id','title','category','due_date','estimated_hours','priority','created_at')
    search_fields = ('title','category')

@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('id','name','target_per_week','progress')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id','title','date','start_time','end_time','category')
    list_filter = ('date','category')
