from logs.models import ErrorLogs
from enums.RolesEnum import RolesEnum
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets

from django.middleware.csrf import get_token
from .serializers import (
    UserPermissionSerializer,
    UserPositionSerializer,
    UserSerializer,
    TeamsSerializer,
    AcademicYearSerializer,
    TeamGroupsSerializer,
)
from .models import (
    User,
    UserPermissions,
    UsersPositions,
    Teams,
    VirtualTeams,
    AcademicYear,
    TeamGroups,
    Roles,
)
from rest_framework.response import Response
from rest_framework.decorators import permission_classes


@permission_classes([IsAuthenticated])
class UserView(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        try:
            users = User.objects.filter(deleted=False)
            serializer = UserSerializer(users, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(
        methods=["POST"],
        detail=False,
        url_path="parse",
    )
    def parse_users(self, request):
        try:
            csv_file = request.data.get("CSVfile")
            csv_file_data = csv_file.read().decode("utf-8")

            for line in csv_file_data.split("\n"):
                data = line.split(",")
                if not User.objects.filter(username=data[2]).exists():
                    User.objects.create(
                        first_name=data[0],
                        last_name=data[1],
                        username=data[2],
                        email=data[2],
                        password=data[2],
                        gender=data[3],
                        is_active=True,
                    )
                user = User.objects.get(username=data[2])
                if not UsersPositions.objects.filter(user=user).exists():
                    if data[5] != "":
                        virtual_team = VirtualTeams.objects.get(short_name=data[5])
                    else:
                        virtual_team = None

                    UsersPositions.objects.create(
                        user=user,
                        team=Teams.objects.get(short_name=data[4]),
                        virtual_team=virtual_team,
                        team_group=TeamGroups.objects.get(name=data[6]),
                        role=Roles.objects.get(name=data[7]),
                        academic_year=AcademicYear.objects.get(description=data[8]),
                    )

                    if not UserPermissions.objects.filter(user=user).exists():
                        if data[7] == RolesEnum.CLAN.value:
                            UserPermissions.objects.create(
                                user=user,
                                academic_year=AcademicYear.objects.get(
                                    description=data[8]
                                ),
                                info=True,
                                aktivnosti=False,
                                partneri=False,
                                izbori=True,
                                suprach=True,
                                admin=False,
                            )
                        elif data[4] == "IT" and (
                            data[7] == RolesEnum.VODITELJ.value
                            or data[7] == RolesEnum.KOORDINATOR.value
                        ):
                            UserPermissions.objects.create(
                                user=user,
                                academic_year=AcademicYear.objects.get(
                                    description=data[8]
                                ),
                                info=True,
                                aktivnosti=True,
                                partneri=True,
                                izbori=True,
                                suprach=True,
                                admin=True,
                            )
                        else:
                            UserPermissions.objects.create(
                                user=user,
                                academic_year=AcademicYear.objects.get(
                                    description=data[8]
                                ),
                                info=True,
                                aktivnosti=True,
                                partneri=True,
                                izbori=True,
                                suprach=True,
                                admin=False,
                            )
            return Response("estudenti uneseni", status=status.HTTP_200_OK)
        except Exception as e:
            error_message = "An error occurred: " + str(e)
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=["GET"],
        detail=False,
        url_path="data",
    )
    def user_data(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            permissions = UserPermissions.objects.get(
                user=self.request.user, academic_year=academic_year
            )
            user_position = UsersPositions.objects.get(
                user=self.request.user, academic_year=academic_year
            )
            permissions_serializer = UserPermissionSerializer(permissions)
            user_position_serializer = UserPositionSerializer(user_position)
            academic_year_serializer = AcademicYearSerializer(academic_year)
            return_data = {
                "user_data": user_position_serializer.data,
                "academic_year": academic_year_serializer.data,
                "permissions": permissions_serializer.data,
                "csrf_token": get_token(request),
            }
            return Response(return_data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class TeamsView(viewsets.ModelViewSet):
    queryset = Teams.objects.all()
    serializer_class = TeamsSerializer
    permission_classes = [IsAuthenticated]

    @action(
        methods=["GET"],
        detail=False,
        url_path="get-my-team",
    )
    def get_my_team(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            user_position = UsersPositions.objects.get(
                user=self.request.user, academic_year=academic_year
            )
            queryset = UsersPositions.objects.filter(
                team=user_position.team,
                role=Roles.objects.get(name=RolesEnum.CLAN.value),
            )
            serializer = UserPositionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class VirtualTeamsView(viewsets.ModelViewSet):
    queryset = VirtualTeams.objects.all()
    serializer_class = TeamsSerializer
    permission_classes = [IsAuthenticated]


class AcademicYearView(viewsets.ModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            queryset = AcademicYear.objects.all().order_by("-id")
            serializer = AcademicYearSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class TeamsGroupView(viewsets.GenericViewSet):
    queryset = TeamGroups.objects.all()
    serializer_class = TeamGroupsSerializer
    permission_classes = [IsAuthenticated]

    @action(
        methods=["GET"],
        detail=False,
        url_path="get-my-team-leaders",
    )
    def get_my_team_leaders(self, request):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            user_position = UsersPositions.objects.get(
                user=self.request.user, academic_year=academic_year
            )
            queryset = UsersPositions.objects.filter(
                team_group=user_position.team_group,
                role=Roles.objects.get(name=RolesEnum.VODITELJ.value),
            )
            serializer = UserPositionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
