from rest_framework import serializers
from estudenti.serializers import (
    AcademicYearSerializer,
    UserSerializer,
    TeamsSerializer,
)
from eaktivnosti.models import (
    ActivityTypeRequirements,
    ActivityType,
    Activity,
    UserActivity,
    TeamLeadRecomendations,
)


class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = "__all__"


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class IDSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class ActivityListSerializer(serializers.ModelSerializer):
    responsible_user = UserSerializer()
    team = TeamsSerializer()
    virtual_team = TeamsSerializer()
    activity_type = ActivityTypeSerializer()
    academic_year = AcademicYearSerializer()

    class Meta:
        model = Activity
        fields = "__all__"


class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = "__all__"


class UserActivityListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    activity = ActivitySerializer()

    class Meta:
        model = UserActivity
        fields = "__all__"


class TeamLeadRecomendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamLeadRecomendations
        fields = "__all__"


class TeamLeadRecomendationListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    recomender = UserSerializer()
    academic_year = AcademicYearSerializer()

    class Meta:
        model = TeamLeadRecomendations
        fields = "__all__"


class ActivityTypeRequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTypeRequirements
        fields = "__all__"
