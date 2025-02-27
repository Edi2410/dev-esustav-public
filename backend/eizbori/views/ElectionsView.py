from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from estudenti.models import AcademicYear
from eizbori.models import Elections
from eizbori.serializers import (
    ElectionsSerializers,
)


class ElectionsView(viewsets.GenericViewSet):
    queryset = Elections.objects.all()
    serializer_class = ElectionsSerializers()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            # Try to get the active election for the current academic year
            queryset = Elections.objects.get(academic_year__active=True, active=True)
            serializer = ElectionsSerializers(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Elections.DoesNotExist:
            return Response({"error": "Nema izbora"}, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
