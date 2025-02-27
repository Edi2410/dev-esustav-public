from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("", views.AuthView, basename="user")


urlpatterns = [
    path("", include(router.urls)),
]
