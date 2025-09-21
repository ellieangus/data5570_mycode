from django.db import models

# Create your models here.

class Task(models.Model):
    CATEGORY_CHOICES = [
        ('school', 'School'),
        ('work', 'Work'),
        ('fun', 'Fun'),
        ('other', 'Other'),
    ]
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    due_date = models.DateTimeField(null=True, blank=True)
    estimated_hours = models.FloatField(null=True, blank=True)
    priority = models.IntegerField(default=3)  # 1 = High, 5 = Low
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Goal(models.Model):
    name = models.CharField(max_length=200)
    target_per_week = models.IntegerField(default=1)
    progress = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Event(models.Model):
    CATEGORY_CHOICES = Task.CATEGORY_CHOICES
    title = models.CharField(max_length=200)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')

    def __str__(self):
        return f"{self.title} on {self.date}"
