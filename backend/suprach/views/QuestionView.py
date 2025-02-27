from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from logs.models import ErrorLogs
from estudenti.models import User, UsersPositions
from suprach.serializers import (
    QuestionsSerializer,
)
from suprach.models import (
    Questions,
    SpecialPersonForGreade,
    Suprach,
    SuprachsQuestions,
    QuestionRoleGroups,
)


class QuestionView(viewsets.GenericViewSet):
    queryset = Questions.objects.all()
    serializer_class = QuestionsSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        request.query_params
        try:
            user = UsersPositions.objects.get(user=request.user)
            suprach = Suprach.objects.get(active=True)
            question_for_active_suprach = SuprachsQuestions.objects.filter(
                suprach=suprach
            ).values_list("question_id")

            if request.query_params.get("special") == "true":
                graded_special_user = SpecialPersonForGreade.objects.get(
                    id=request.query_params.get("graded")
                )
                question_ids = QuestionRoleGroups.objects.values_list(
                    "question_id"
                ).filter(
                    question__id__in=question_for_active_suprach,
                    grader_role_group=user.role.role_group,
                    special_role_group=graded_special_user,
                    suprach=suprach,
                )

            else:
                graded_user = UsersPositions.objects.get(
                    user=User.objects.get(id=request.query_params.get("graded"))
                )
                question_ids = QuestionRoleGroups.objects.values_list(
                    "question_id"
                ).filter(
                    question__id__in=question_for_active_suprach,
                    grader_role_group=user.role.role_group,
                    graded_role_group=graded_user.role.role_group,
                    suprach=suprach,
                )

            queryset = Questions.objects.filter(id__in=question_ids)
            serializer = QuestionsSerializer(queryset, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
