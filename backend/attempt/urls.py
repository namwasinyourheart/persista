from django.urls import path
from .views import get_questions

urlpatterns = [
    path('api/questions/', get_questions, name='get_questions'),
]

