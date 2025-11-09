from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, GoalViewSet, EventViewSet, HabitViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'habits', HabitViewSet)
router.register(r'goals', GoalViewSet)
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
