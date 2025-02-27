from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from enums.RolesEnum import RolesEnum
from eizbori.models import VotingDocuments
from eizbori.serializers import (
    VotingDocumentsSerializers,
)

from django.db.models import Q


class ElectionsDocumentsView(viewsets.GenericViewSet):
    queryset = VotingDocuments.objects.all()
    serializer_class = VotingDocumentsSerializers()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            candidatesDocument = VotingDocuments.objects.filter(elections__active=True)
            serializer = VotingDocumentsSerializers(candidatesDocument, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
