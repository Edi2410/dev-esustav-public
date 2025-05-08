from logs.models import ErrorLogs
from einfo.utils import get_sastanak_data, get_standiranje_data, get_user_position
from eaktivnosti.serializers import IDSerializer
from enums.ActivityTypeEnums import ActivityTypeEnums
from eaktivnosti.models import UserActivity, ActivityTypeRequirements
from estudenti.models import AcademicYear, User, UsersPositions
from einfo.models import CertificateRequirements
from einfo.serializers import CertificateRequirementsSerializer

from django.http import JsonResponse
from django.db.models import Sum
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class ClanCertificateRequirementsView(viewsets.GenericViewSet):
    queryset = CertificateRequirements.objects.all()
    serializer_class = CertificateRequirementsSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, pk=None):
        try:
            serializer = IDSerializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)

            request_user = User.objects.get(id=serializer.data["id"])
            academic_year = AcademicYear.objects.get(active=True)

            request_user_position = get_user_position(request_user, academic_year)
            current_user_position = get_user_position(request.user, academic_year)

            # Ako korisnik traži za drugog
            if request_user != request.user:
                current_user_position = request_user_position

            requirements = ActivityTypeRequirements.objects.filter(
                academic_year=academic_year,
                role_group=current_user_position.role.role_group,
            )

            return_value = []

            for requirement in requirements:
                activity_name = requirement.activity_type.name

                if activity_name == ActivityTypeEnums.SASTANAK.value:
                    data = get_sastanak_data(
                        requirement,
                        academic_year,
                        request_user,
                        current_user_position,
                        request_user_position,
                    )
                    return_value.append(data)

                elif activity_name == ActivityTypeEnums.STANDIRANJE.value:
                    data = get_standiranje_data(
                        requirement,
                        academic_year,
                        request_user,
                        current_user_position,
                    )
                    return_value.append(data)

            return JsonResponse(return_value, status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)