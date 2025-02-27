from django.urls import path, include

from rest_framework import routers

from .views import (
    UniversalCertificateRequirementsView,
    ClanCertificateRequirementsView,
    VoditeljCertificateRequirementsView,
    KoordinatorCertificateRequirementsView,
)

router = routers.DefaultRouter()
router.register("clan", ClanCertificateRequirementsView, basename="clan")
router.register("voditelj", VoditeljCertificateRequirementsView, basename="voditelj")
router.register(
    "koordinator", KoordinatorCertificateRequirementsView, basename="koordinator"
)
router.register("admin", UniversalCertificateRequirementsView, basename="admin")

urlpatterns = [
    path("", include(router.urls)),
]
