from logs.models import ErrorLogs
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
            request_user = User.objects.get(
                id=serializer.data["id"]
            )  # ID korisnika za kojeg trebamo podatke
            academic_year = AcademicYear.objects.get(active=True)

            request_user_position = UsersPositions.objects.get(
                user=request_user,
                academic_year=academic_year,
            )

            user_position = UsersPositions.objects.get(
                user=request.user,
                academic_year=academic_year,
            )
            requirements = ActivityTypeRequirements.objects.filter(
                academic_year=academic_year,
                role_group=user_position.role.role_group,
            )
            if request_user != request.user:
                user_position = UsersPositions.objects.get(
                    user=request_user,
                    academic_year=academic_year,
                )
                requirements = ActivityTypeRequirements.objects.filter(
                    academic_year=academic_year,
                    role_group=user_position.role.role_group,
                )

            return_value = []
            for requirement in requirements:
                if requirement.activity_type.name == ActivityTypeEnums.SASTANAK.value:

                    if user_position.virtual_team != None:

                        all = (
                            UserActivity.objects.filter(
                                academic_year=academic_year,
                                activity__virtual_team=request_user_position.virtual_team,
                                activity__activity_type=requirement.activity_type,
                            )
                            .values("activity")
                            .distinct()
                            .count()
                        )

                        users = UserActivity.objects.filter(
                            academic_year=academic_year,
                            activity__virtual_team=request_user_position.virtual_team,
                            user=request_user,
                            activity__activity_type=requirement.activity_type,
                        ).count()

                    else:
                        all = (
                            UserActivity.objects.filter(
                                academic_year=academic_year,
                                activity__team=user_position.team,
                                activity__activity_type=requirement.activity_type,
                            )
                            .values("activity")
                            .distinct()
                            .count()
                        )

                        users = UserActivity.objects.filter(
                            academic_year=academic_year,
                            activity__team=user_position.team,
                            user=request_user,
                            activity__activity_type=requirement.activity_type,
                        ).count()

                    return_value.append(
                        {
                            "aktivnost": requirement.activity_type.name,
                            "odrzano": all,
                            "prisustvovao": users,
                            "potrebno": requirement.value,
                            "postotak": requirement.is_percentage,
                        }
                    )

                if (
                    requirement.activity_type.name
                    == ActivityTypeEnums.STANDIRANJE.value
                ):
                    users = (
                        UserActivity.objects.filter(
                            academic_year=academic_year,
                            user=request_user,
                            activity__activity_type=requirement.activity_type,
                        )
                        .exclude(activity__team=user_position.team)
                        .aggregate(total=Sum("hours"))
                    )
                    return_value.append(
                        {
                            "aktivnost": requirement.activity_type.name,
                            "potrebno": requirement.value,
                            "prisustvovao": users["total"] if users["total"] else 0,
                            "postotak": requirement.is_percentage,
                        }
                    )
            return JsonResponse(return_value, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
