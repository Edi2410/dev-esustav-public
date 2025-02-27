from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from logs.models import ErrorLogs
from suprach.serializers import (
    CommentsSerializer,
    CommentsListSerializer,
)
from suprach.models import Comments

# Create your views here.


class CommentsView(viewsets.GenericViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            queryset = Comments.objects.filter(user=self.request.user).order_by("-id")
            serializer = CommentsListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
