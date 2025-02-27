from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from suprach.serializers import (
    LikesSerializer,
)
from suprach.models import (
    Likes,
    Suprach,
)


class LikesView(viewsets.GenericViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        try:
            suprach = Suprach.objects.get(active=True)
            data = {
                "suprach": suprach.id,
                "grader": request.data.get("grader"),
                "graded": request.data.get("graded"),
            }
            serializer = LikesSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
