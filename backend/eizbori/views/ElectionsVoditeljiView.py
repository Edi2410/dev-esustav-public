from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated

from logs.models import ErrorLogs
from estudenti.models import UsersPositions

from enums.RolesEnum import RolesEnum

from eizbori.models import Candidate
from eizbori.serializers import (
    CandidateSerializers,
)


class ElectionsVoditeljiView(viewsets.GenericViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializers()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            user = UsersPositions.objects.get(user=self.request.user)

            if (
                user.role.name == RolesEnum.CLAN.value
                or user.role.name == RolesEnum.VODITELJ.value
            ):
                candidate = Candidate.objects.filter(
                    team=user.team,
                    role__name=RolesEnum.VODITELJ.value,
                    elections__active=True,
                ).exclude(user=self.request.user)
            else:
                candidate = Candidate.objects.filter(
                    teamgroup=user.team_group,
                    role__name=RolesEnum.VODITELJ.value,
                    elections__active=True,
                ).exclude(user=self.request.user)

            serializer = CandidateSerializers(candidate, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
