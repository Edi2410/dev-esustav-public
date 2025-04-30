from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from logs.models import ErrorLogs
from estudenti.models import User
from suprach.serializers import (
    ScoresSerializer,
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
from prometheus_client import Counter

number_of_graded_user_in_suprach = Counter(
    'number_graded_user_in_suprach',
    'Koliko je korisnika ocjenjeno u suprachu'
)

class GradesView(viewsets.GenericViewSet):
    queryset = Gradings.objects.all()
    serializer_class = GradesSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        try:
            questions = SuprachsQuestions.objects.filter(
                suprach=Suprach.objects.get(active=True)
            ).values_list("question_id")
            queryset = (
                Scores.objects.filter(
                    question__id__in=questions,
                )
                .filter(user=request.user)
                .exclude(score=0)
            )
            serializer = ScoresSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            number_of_graded_user_in_suprach.inc()
            questions_results = request.data.get("questions")
            is_special = request.data.get("special")
            user = User.objects.get(id=request.user.id)

            if is_special:
                graded_user = SpecialPersonForGreade.objects.get(
                    id=request.data.get("graded_id")
                )
                if Gradings.objects.filter(
                    grader=request.user,
                    suprach__is_active=True,
                    suprach__grading_active=True,
                    special_graded=request.data.get("graded_id"),
                ).exists():
                    return Response(status=status.HTTP_200_OK)
            else:
                graded_user = User.objects.get(id=request.data.get("graded_id"))
                if Gradings.objects.filter(
                    grader=request.user,
                    suprach__is_active=True,
                    suprach__grading_active=True,
                    graded=request.data.get("graded_id"),
                ).exists():
                    return Response(status=status.HTTP_200_OK)

            for question in questions_results:
                if is_special:
                    data = {
                        "suprach": Suprach.objects.get(
                            active=True, grading_active=True
                        ).id,
                        "special_user": graded_user.id,
                        "question": question["question_id"],
                        "score": question["grade"],
                    }
                else:
                    data = {
                        "suprach": Suprach.objects.get(
                            active=True, grading_active=True
                        ).id,
                        "user": graded_user.id,
                        "question": question["question_id"],
                        "score": question["grade"],
                    }

                serializer = ScoresSerializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()

            notes = request.data.get("notes")
            if not request.data.get("anonymous"):
                notes = f"{notes} \n- {user.first_name} {user.last_name}"

            if is_special:
                Comments(
                    special_user=graded_user,
                    suprach__is_active=True,
                    suprach__grading_active=True,
                    comment=notes,
                ).save()
                Gradings(
                    suprach__is_active=True,
                    suprach__grading_active=True,
                    grader=request.user,
                    special_graded=graded_user,
                ).save()
            else:
                Comments(
                    user=graded_user,
                    suprach__is_active=True,
                    suprach__grading_active=True,
                    comment=notes,
                ).save()
                Gradings(
                    suprach__is_active=True,
                    suprach__grading_active=True,
                    grader=request.user,
                    graded=graded_user,
                ).save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
