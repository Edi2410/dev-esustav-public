from logs.models import ErrorLogs
from eaktivnosti.serializers import UserActivityListSerializer
from enums.ActivityTypeEnums import ActivityTypeEnums
from eaktivnosti.models import UserActivity
from einfo.models import CertificateRequirements
from einfo.serializers import (
    CertificateRequirementsSerializer,
    CertificateRequirementsListSerializer,
)

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from estudenti.models import User, UsersPositions
from estudenti.models import AcademicYear
from django.db.models import Q


class UniversalCertificateRequirementsView(viewsets.ModelViewSet):
    queryset = CertificateRequirements.objects.all()
    serializer_class = CertificateRequirementsSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            data = CertificateRequirements.objects.filter(academic_year=academic_year)
            serializer = CertificateRequirementsListSerializer(data, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            user_position = UsersPositions.objects.get(user=pk)
            data = CertificateRequirements.objects.get(
                academic_year=academic_year, user=pk
            )
            serializer = CertificateRequirementsSerializer(data)

            other_notes = UserActivity.objects.filter(
                academic_year=academic_year,
                user=user_position.user,
            ).exclude(
                Q(activity__activity_type__name=ActivityTypeEnums.SASTANAK.value)
                | Q(
                    activity__activity_type__name=ActivityTypeEnums.PRISTUPNI_STANDIRANJE.value
                )
                | Q(activity__activity_type__name=ActivityTypeEnums.VIP_SASTANAK.value)
                | Q(activity__activity_type__name=ActivityTypeEnums.STANDIRANJE.value)
            )
            other_notes_serializer = UserActivityListSerializer(other_notes, many=True)

            return_value = {
                "certificate_requirements": serializer.data,
                "other_notes": other_notes_serializer.data,
            }

            return Response(return_value, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False, url_path="create-new-empty-requirements")
    def create_new_empty_requirements(self, request):
        try:
            users = User.objects.filter(deleted=False)
            academic_year = AcademicYear.objects.get(active=True)

            for user in users:
                if not CertificateRequirements.objects.filter(
                    user=user, academic_year=academic_year
                ).exists():
                    CertificateRequirements.objects.create(
                        user=user, academic_year=academic_year
                    )
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False, url_path="suprach-1-all-true")
    def set_all_true_for_suprach1(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            CertificateRequirements.objects.filter(academic_year=academic_year).update(
                suprach_1=True
            )
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False, url_path="suprach-2-all-true")
    def set_all_true_for_suprach2(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            CertificateRequirements.objects.filter(academic_year=academic_year).update(
                suprach_2=True
            )
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False, url_path="zivotopis-all-true")
    def set_all_true_for_zivotopis(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            CertificateRequirements.objects.filter(academic_year=academic_year).update(
                zivotopis=True
            )
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False, url_path="bootcamp-all-true")
    def set_all_true_for_bootcamp(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            CertificateRequirements.objects.filter(academic_year=academic_year).update(
                bootcamp=True
            )
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
