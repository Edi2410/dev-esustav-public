from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("types", views.ActivityTypeView, basename="types")
router.register("activity", views.ActivityView, basename="activity")
router.register("user/activity", views.UserOnActivityView, basename="user-activity")
router.register(
    "recomendations", views.TeamLeadRecomendationView, basename="recomendations"
)

urlpatterns = [
    path("", include(router.urls)),
]
