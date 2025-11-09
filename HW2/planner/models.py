from django.db import models

# Create your models here.

class Task(models.Model):
    CATEGORY_CHOICES = [
        ('School', 'School'),
        ('Work', 'Work'),
        ('Personal', 'Personal'),
        ('Other', 'Other'),
    ]
    
    PRIORITY_CHOICES = [
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('done', 'Done'),
    ]
    
    title = models.CharField(max_length=200)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    minutes = models.IntegerField(default=0)  # Store as minutes to match frontend
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Other')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    due_date = models.CharField(max_length=10, null=True, blank=True)  # MM/DD format like frontend
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    @property
    def hours(self):
        """Convert minutes to hours for display"""
        return round(self.minutes / 60, 1) if self.minutes > 0 else 0


class Habit(models.Model):
    name = models.CharField(max_length=200)
    mon = models.BooleanField(default=False)
    tue = models.BooleanField(default=False)
    wed = models.BooleanField(default=False)
    thu = models.BooleanField(default=False)
    fri = models.BooleanField(default=False)
    sat = models.BooleanField(default=False)
    sun = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    @property
    def checks(self):
        """Return checks in frontend format"""
        return {
            'Mon': self.mon,
            'Tue': self.tue,
            'Wed': self.wed,
            'Thu': self.thu,
            'Fri': self.fri,
            'Sat': self.sat,
            'Sun': self.sun,
        }


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
