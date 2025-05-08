from einfo.utils import get_sastanak_data, get_user_position
from logs.models import ErrorLogs
from eaktivnosti.serializers import IDSerializer
from enums.ActivityTypeEnums import ActivityTypeEnums
from einfo.models import CertificateRequirements
from einfo.serializers import CertificateRequirementsSerializer
from eaktivnosti.models import UserActivity, ActivityTypeRequirements
from estudenti.models import AcademicYear, User, UsersPositions


from django.http import JsonResponse
from django.db.models import Sum
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class KoordinatorCertificateRequirementsView(viewsets.GenericViewSet):
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
                        requirement,
                        academic_year,
                        request_user,
                        user_position,
                        user_position,
                    )
                    return_value.append(data)

                elif activity_name == ActivityTypeEnums.PRISTUPNI_STANDIRANJE.value:
                    # U ovom slučaju želimo da se ne isključuje njegov tim
                    result = (
                        UserActivity.objects.filter(
                            academic_year=academic_year,
                            user=request_user,
                            activity__activity_type=requirement.activity_type,
                        ).aggregate(total=Sum("hours"))
                    )

                    data = {
                        "aktivnost": requirement.activity_type.name,
                        "potrebno": requirement.value,
                        "prisustvovao": result["total"] if result["total"] else 0,
                        "postotak": requirement.is_percentage,
                    }
                    return_value.append(data)

            return JsonResponse(return_value, status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)