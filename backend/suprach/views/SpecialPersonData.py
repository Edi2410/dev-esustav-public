from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from django.db.models import Avg
from logs.models import ErrorLogs
from suprach.serializers import (
    CommentsListSerializer,
    ScoreAvgSerializer,
    GradesSerializer,
)
from suprach.models import (
    Comments,
    Gradings,
    Scores,
    SpecialPersonForGreade,
    Suprach,
    SuprachsQuestions,
)


class SpecialPersonData(viewsets.GenericViewSet):
    queryset = Gradings.objects.all()
    serializer_class = GradesSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            active_suprach = Suprach.objects.get(active=True)
            questions = SuprachsQuestions.objects.filter(
                suprach=active_suprach
            ).values_list("question_id")

            special_users_in_acitve_suoprach = (
                Gradings.objects.filter(
                    suprach=active_suprach,
                    special_graded__isnull=False,
                )
                .distinct()
                .values_list("special_graded", flat=True)
            )

            special_users = SpecialPersonForGreade.objects.filter(
                id__in=special_users_in_acitve_suoprach
            )
            return_value = []
            for user in special_users:
                scores = (
                    Scores.objects.filter(
                        suprach=active_suprach,
                        special_user=user,
                        question__id__in=questions,
                    )
                    .values("question__id", "question__description")
                    .annotate(avg_score=Avg("score"))
                )
                score_serializer = ScoreAvgSerializer(scores, many=True)

                comments = Comments.objects.filter(
                    suprach=active_suprach,
                    special_user=user,
                )
                comments_serializer = CommentsListSerializer(comments, many=True)
                return_value.append(
                    {
                        "user": user.name,
                        "scores": score_serializer.data,
                        "comments": comments_serializer.data,
                    }
                )
            return Response(return_value, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
