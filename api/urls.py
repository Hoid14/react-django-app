from rest_framework import routers
from .views import NoteViewSet

router = routers.DefaultRouter()

router.register('api/notes', NoteViewSet, "notes")

urlpatterns = router.urls