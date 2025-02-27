from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from django.db.models import Q

from logs.models import ErrorLogs
from estudenti.serializers import UserPositionSerializer, UserSerializer

from estudenti.models import AcademicYear, User, UsersPositions

from suprach.models import (
    Comments,
    Suprach,
)


class UserToCommentView(viewsets.GenericViewSet):
    queryset = UsersPositions.objects.all()
    serializer_class = UserPositionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["first_name", "last_name"]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            search_params = self.request.query_params.get("search")
            academic_year = AcademicYear.objects.get(active=True)
            all_users = None
            if search_params:
                search_params = search_params.lower()
                all_user_position = (
                    UsersPositions.objects.filter(academic_year=academic_year)
                    .filter(
                        Q(user__first_name__icontains=search_params)
                        | Q(user__last_name__icontains=search_params)
                    )
                    .exclude(user__id=self.request.user.id)
                    .values_list("user__id", flat=True)
                )
                all_users = User.objects.filter(id__in=all_user_position)[:15]

            else:
                all_user_position = (
                    UsersPositions.objects.filter(academic_year=academic_year)
                    .exclude(user__id=self.request.user.id)
                    .values_list("user__id")
                )
                all_users = User.objects.filter(id__in=all_user_position)[:15]
            serializer = UserSerializer(all_users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            suprach = Suprach.objects.get(active=True)
            user = User.objects.get(id=request.user.id)
            graded_user = User.objects.get(id=request.data.get("graded_id"))

            notes = request.data.get("notes")
            if not request.data.get("anonymous"):
                notes = f"{notes} \n- {user.first_name} {user.last_name}"

            comment = Comments(
                user=graded_user,
                suprach=suprach,
                comment=notes,
            )
            comment.save()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
