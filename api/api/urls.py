from django.urls import path
from . import views
from .views import MyTokenObtainPairView, CreateUserView
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name="register"),
    path('notes/', views.NoteListCreate.as_view(), name="Note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]