from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name = "get_routes"),
    path('notes/', views.get_notes, name = "get_notes"), 
    path('notes/create/', views.create_note, name = "create_note"),
    path('notes/<str:pk>/update/', views.update_note, name = "update_note"),
    path('notes/<str:pk>', views.get_note, name = "get_note"), 
    path('notes/<str:pk>/delete/', views.delete_note, name = "delete_note")
]

