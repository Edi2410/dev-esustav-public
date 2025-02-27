from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from suprach.serializers import (
    SpecialPersonForGreadeSerializer,
)
from suprach.models import (
    Gradings,
    Likes,
    SpecialPersonForGreade,
    Suprach,
)


class SpecialPersonForGreadeView(viewsets.GenericViewSet):
    queryset = SpecialPersonForGreade.objects.all()
    serializer_class = SpecialPersonForGreadeSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            queryset = SpecialPersonForGreade.objects.filter(deleted=False)
            serializer = SpecialPersonForGreadeSerializer(queryset, many=True)
            return_value = []
            for value in serializer.data:

                if (
                    Gradings.objects.filter(special_graded__id=value["id"])
                    .filter(suprach=Suprach.objects.get(active=True))
                    .filter(grader=request.user)
                    .exists()
                ):

                    return_value.append(
                        {
                            "id": value["id"],
                            "name": value["name"],
                            "graded": True,
                        }
                    )
                    continue
                if (
                    Likes.objects.filter(special_graded__id=value["id"])
                    .filter(grader=request.user)
                    .filter(suprach=Suprach.objects.get(active=True))
                    .exists()
                ):
                    return_value.append(
                        {
                            "id": value["id"],
                            "name": value["name"],
                            "graded": True,
                        }
                    )
                    continue
                return_value.append(
                    {
                        "id": value["id"],
                        "name": value["name"],
                        "graded": False,
                    }
                )
            return Response(return_value, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
