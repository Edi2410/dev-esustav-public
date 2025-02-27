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


class UsersWhoNotFillSuprach(viewsets.GenericViewSet):
    queryset = UsersPositions.objects.all()
    serializer_class = UserPositionSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            active_suprach = Suprach.objects.get(active=True)

            users_who_not_fill_suprach = (
                UsersPositions.objects.filter(
                    academic_year=academic_year,
                )
                .exclude(
                    user__in=Gradings.objects.filter(
                        suprach=active_suprach
                    ).values_list("grader_id", flat=True)
                )
                .exclude(
                    user__in=Likes.objects.filter(suprach=active_suprach).values_list(
                        "grader_id", flat=True
                    )
                )
            )
            users_who_not_fill_suprach_serializers = UserPositionSerializer(
                users_who_not_fill_suprach, many=True
            )

            return Response(
                users_who_not_fill_suprach_serializers.data, status=status.HTTP_200_OK
            )
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
