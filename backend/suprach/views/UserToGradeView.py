from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from logs.models import ErrorLogs
from estudenti.serializers import UserPositionSerializer, UserSerializer
from enums.RolesGroupEnum import RolesGroupEnum
from estudenti.models import AcademicYear, User, UsersPositions

from suprach.models import (
    Gradings,
    Likes,
    Suprach,
)


class UserToGradeView(viewsets.GenericViewSet):
    queryset = UsersPositions.objects.all()
    serializer_class = UserPositionSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            user = UsersPositions.objects.get(
                academic_year=academic_year, user=request.user
            )

            roles_team = None

            match user.role.role_group.name:
                case RolesGroupEnum.PREDSJEDNISTVO.value:
                    roles_team = UsersPositions.objects.values_list(
                        "user", flat=True
                    ).filter(team=user.team, academic_year_id=academic_year).exclude(
                        user=user.user
                    ).exclude(
                        role__role_group__name=RolesGroupEnum.CLAN.value
                    ) | UsersPositions.objects.values_list(
                        "user", flat=True
                    ).filter(
                        team_group=user.team_group, academic_year_id=academic_year
                    ).exclude(
                        user=user.user
                    ).exclude(
                        role__role_group__name=RolesGroupEnum.CLAN.value
                    )
                case RolesGroupEnum.VODITELJ.value:
                    roles_team = UsersPositions.objects.values_list(
                        "user", flat=True
                    ).filter(team=user.team, academic_year_id=academic_year).exclude(
                        user=user.user
                    ) | UsersPositions.objects.values_list(
                        "user", flat=True
                    ).filter(
                        team_group=user.team_group,
                        academic_year_id=academic_year,
                        role__role_group__name=RolesGroupEnum.PREDSJEDNISTVO.value,
                    ).exclude(
                        user=user.user
                    )
                case RolesGroupEnum.CLAN.value:
                    roles_team = (
                        UsersPositions.objects.values_list("user", flat=True)
                        .filter(team=user.team, academic_year_id=academic_year)
                        .exclude(user=user.user)
                        .exclude(
                            role__role_group__name=RolesGroupEnum.PREDSJEDNISTVO.value
                        )
                    )

            serializer = User.objects.filter(id__in=roles_team).exclude(is_active=0)
            users = UserSerializer(serializer, many=True)
            for user in users.data:
                if (
                    Gradings.objects.filter(graded_id=user["id"])
                    .filter(suprach=Suprach.objects.get(active=True))
                    .filter(grader=request.user)
                    .exists()
                ):
                    user["graded"] = True
                    continue
                if (
                    Likes.objects.filter(graded_id=user["id"])
                    .filter(grader=request.user)
                    .filter(suprach=Suprach.objects.get(active=True))
                    .exists()
                ):
                    user["graded"] = True
                    continue
                user["graded"] = False
            return Response(users.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
