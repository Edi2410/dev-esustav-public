from estudenti.serializers import AcademicYearSerializer, UserSerializer
from einfo.models import CertificateRequirements
from rest_framework import serializers


class CertificateRequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificateRequirements
        fields = "__all__"


class CertificateRequirementsListSerializer(serializers.ModelSerializer):
    academic_year = AcademicYearSerializer()
    user = UserSerializer()

    class Meta:
        model = CertificateRequirements
        fields = "__all__"
