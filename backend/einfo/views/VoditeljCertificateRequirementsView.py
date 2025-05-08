from logs.models import ErrorLogs
from eaktivnosti.serializers import IDSerializer
from enums.ActivityTypeEnums import ActivityTypeEnums
from einfo.models import CertificateRequirements
from einfo.serializers import CertificateRequirementsSerializer
from eaktivnosti.models import ActivityTypeRequirements
from estudenti.models import AcademicYear, User

from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from einfo.utils import (
    get_user_position,
    get_sastanak_data,
    get_standiranje_data,
    get_activity_count_and_hours,
)


class VoditeljCertificateRequirementsView(viewsets.GenericViewSet):
    queryset = CertificateRequirements.objects.all()
    serializer_class = CertificateRequirementsSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, pk=None):
        try:
            serializer = IDSerializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)

            request_user = User.objects.get(id=serializer.data["id"])
            academic_year = AcademicYear.objects.get(active=True)
            user_position = get_user_position(request_user, academic_year)

            requirements = ActivityTypeRequirements.objects.filter(
                academic_year=academic_year,
                role_group=user_position.role.role_group,
            )

            return_value = []

            for requirement in requirements:
                activity_name = requirement.activity_type.name

                if activity_name == ActivityTypeEnums.SASTANAK.value:
                    data = get_sastanak_data(
                        requirement, academic_year, request_user, user_position, user_position
                    )

                elif activity_name == ActivityTypeEnums.VIP_SASTANAK.value:
                    data = get_sastanak_data(
                        requirement, academic_year, request_user, user_position, user_position
                    )

                elif activity_name == ActivityTypeEnums.STANDIRANJE.value:
                    data = get_standiranje_data(
                        requirement, academic_year, request_user, exclude_team=True, user_position=user_position
                    )

                elif activity_name == ActivityTypeEnums.PRISTUPNI_STANDIRANJE.value:
                    data = get_activity_count_and_hours(
                        requirement, academic_year, request_user
                    )

                else:
                    continue  # Preskoči nepoznate aktivnosti

                return_value.append(data)

            return JsonResponse(return_value, status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
