from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from suprach.serializers import (
    SuprachSerializer,
)
from suprach.models import (
    Suprach,
)


class SuprachView(viewsets.GenericViewSet):
    queryset = Suprach.objects.all()
    serializer_class = SuprachSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            queryset = Suprach.objects.get(active=True)
            serializer = SuprachSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
