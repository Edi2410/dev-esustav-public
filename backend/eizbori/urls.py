from django.urls import path, include

from .views import (
    ElectionsView,
    ElectionsVoditeljiView,
    ElectionsVotesView,
    ElectionsUPView,
    ElectionsDocumentsView
)

from rest_framework import routers

router = routers.DefaultRouter()
router.register("elections", ElectionsView, basename="elections")
router.register(
    "elections/voditelji", ElectionsVoditeljiView, basename="elections/voditelji"
)
router.register("elections/up", ElectionsUPView, basename="elections/up")
router.register("elections/votes", ElectionsVotesView, basename="elections/votes")
router.register("elections/documents", ElectionsDocumentsView, basename="elections-documents")


urlpatterns = [
    path("", include(router.urls)),
]
