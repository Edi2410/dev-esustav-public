from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Avg
from logs.models import ErrorLogs
from estudenti.models import UsersPositions
from suprach.serializers import (
    ScoreAvgSerializer,
    ScoresSerializer,
)
from suprach.models import (
    Scores,
    Suprach,
    SuprachsQuestions,
)

# Create your views here.


class ScoreView(viewsets.GenericViewSet):
    queryset = Scores.objects.all()
    serializer_class = ScoresSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            user = UsersPositions.objects.get(user=request.user)
            suprach = Suprach.objects.get(active=True)
            question_for_active_suprach = SuprachsQuestions.objects.filter(
                suprach=suprach
            ).values_list("question_id", flat=True)

            scores = (
                Scores.objects.filter(
                    suprach=suprach,
                    user=user.user,
                    question__id__in=question_for_active_suprach,
                )
                .values("question__id", "question__description")
                .annotate(avg_score=Avg("score"))
            )
            serializer = ScoreAvgSerializer(scores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
