from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from enums.RolesEnum import RolesEnum
from eizbori.models import Candidate
from eizbori.serializers import (
    CandidateSerializers,
)

from django.db.models import Q


class ElectionsUPView(viewsets.GenericViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializers()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            candidatesUP = Candidate.objects.filter(
                (
                    Q(role__name=RolesEnum.PREDSJEDNIK.value)
                    | Q(role__name=RolesEnum.POTPREDSJEDNIK.value)
                )
                & Q(elections__active=True)
            ).exclude(user=self.request.user)

            serializer = CandidateSerializers(candidatesUP, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
