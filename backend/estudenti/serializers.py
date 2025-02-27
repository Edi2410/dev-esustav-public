from rest_framework import serializers

from .models import (
    Teams,
    AcademicYear,
    User,
    UserPermissions,
    UsersPositions,
    RoleGroups,
    Roles,
    TeamGroups,
)


class RoleGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleGroups
        fields = "__all__"


class RolesSerializer(serializers.ModelSerializer):
    role_group = RoleGroupsSerializer()

    class Meta:
        model = Roles
        fields = "__all__"


class TeamGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamGroups
        fields = "__all__"


class TeamsSerializer(serializers.ModelSerializer):
    TeamGroups = TeamGroupsSerializer()

    class Meta:
        model = Teams
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserPositionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    team = TeamsSerializer()
    team_group = TeamGroupsSerializer()
    virtual_team = TeamsSerializer()
    role = RolesSerializer()

    class Meta:
        model = UsersPositions
        fields = "__all__"


class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = "__all__"


class AcademicYearIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = ["id"]


class UserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPermissions
        fields = "__all__"
