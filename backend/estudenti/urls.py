from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("users", views.UserView, basename="users")
router.register("teams", views.TeamsView, basename="teams")
router.register("teamsgroup", views.TeamsGroupView, basename="teamsgroup")
router.register("virtualteam", views.VirtualTeamsView, basename="virtualteam")
router.register("academic-year", views.AcademicYearView, basename="academic-year")

urlpatterns = [
    path("", include(router.urls)),
]
