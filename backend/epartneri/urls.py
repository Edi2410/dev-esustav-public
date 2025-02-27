from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("partners", views.PartnersView, basename="partners")
router.register(
    "partners-contacts", views.PartnersContactsView, basename="partners-contacts"
)
router.register("partners-notes", views.Notes, basename="partners-notes")
router.register("projects", views.ProjectsView, basename="projects")
router.register("notes", views.Notes, basename="notes")

urlpatterns = [
    path("", include(router.urls)),
]
