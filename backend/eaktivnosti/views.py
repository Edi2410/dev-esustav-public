from logs.models import ErrorLogs
from enums.RolesEnum import RolesEnum
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from estudenti.models import User, UsersPositions, AcademicYear
from django.http import JsonResponse

from eaktivnosti.serializers import (
    TeamLeadRecomendationSerializer,
    ActivityTypeSerializer,
    ActivityListSerializer,
    ActivitySerializer,
    IDSerializer,
    UserActivityListSerializer,
    UserActivitySerializer,
)
from eaktivnosti.models import (
    ActivityType,
    Activity,
    UserActivity,
    TeamLeadRecomendations,
)

# Create your views here.


class ActivityTypeView(viewsets.ModelViewSet):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    permission_classes = [IsAuthenticated]


class ActivityView(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            academic_year = AcademicYear.objects.get(active=True)
            queryset = Activity.objects.filter(academic_year=academic_year).order_by(
                "-id"
            )
            serialized = ActivityListSerializer(queryset, many=True)

            return Response(serialized.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserOnActivityView(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            serializer = IDSerializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            queryset = UserActivity.objects.filter(activity=serializer.data["id"])
            serialized = UserActivityListSerializer(queryset, many=True)

            return Response(serialized.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            serializer = UserActivitySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            try:
                activity = UserActivity.objects.get(
                    user=serializer.validated_data["user"],
                    activity=serializer.validated_data["activity"],
                )
                serializer.update(activity, serializer.validated_data)
                return Response(status=status.HTTP_200_OK)

            except UserActivity.DoesNotExist:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class TeamLeadRecomendationView(viewsets.ModelViewSet):
    queryset = TeamLeadRecomendations.objects.all()
    serializer_class = TeamLeadRecomendationSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user_data = User.objects.get(email=request.user)
        academic_year = AcademicYear.objects.get(active=True)
        try:
            user = UsersPositions.objects.get(
                user=user_data, academic_year=academic_year
            )

            if user.role.name == RolesEnum.VODITELJ.value:
                users = UsersPositions.objects.filter(
                    team=user.team,
                    role__name=RolesEnum.CLAN.value,
                    academic_year=academic_year,
                ).exclude(user=user_data)
            elif user.role.name == RolesEnum.KOORDINATOR.value:
                users = UsersPositions.objects.filter(
                    team_group=user.team_group,
                    role__name=RolesEnum.VODITELJ.value,
                    academic_year=academic_year,
                ).exclude(user=user_data)
            dict = []
            for user in users:
                try:
                    recommendation = TeamLeadRecomendations.objects.get(
                        user=user.user, academic_year=academic_year
                    )
                    dict.append(
                        {
                            "id": recommendation.id,
                            "user_id": recommendation.user.id,
                            "user": recommendation.user.email,
                            "recommendation": recommendation.recommendation,
                            "passed": recommendation.passed,
                        }
                    )
                except TeamLeadRecomendations.DoesNotExist:
                    dict.append(
                        {
                            "id": "",
                            "user_id": user.user.id,
                            "user": user.user.email,
                            "recommendation": "",
                            "passed": False,
                        }
                    )

            return JsonResponse(dict, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            serializer = TeamLeadRecomendationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            try:
                recomendations = TeamLeadRecomendations.objects.get(
                    user=serializer.validated_data["user"],
                    academic_year=serializer.validated_data["academic_year"],
                )
                # Ako postoji, ažurirajte postojeći zapis s novim podacima
                serializer.update(recomendations, serializer.validated_data)
                return Response(status=status.HTTP_200_OK)

            except TeamLeadRecomendations.DoesNotExist:
                # Ako ne postoji, stvorite novi zapis
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
