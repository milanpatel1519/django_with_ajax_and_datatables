from django.urls import path
from . import views

urlpatterns = [
    path('', views.crud_demo, name='crud_demo'),
]
