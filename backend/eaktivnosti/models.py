from django.db import models
from estudenti.models import User, AcademicYear, RoleGroups, Teams, VirtualTeams
from django_prometheus.models import ExportModelOperationsMixin

class ActivityType(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    has_hour = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name}"


class ActivityTypeRequirements(models.Model):
    activity_type = models.ForeignKey(
        ActivityType, on_delete=models.DO_NOTHING, null=True
    )
    academic_year = models.ForeignKey(
        AcademicYear, on_delete=models.DO_NOTHING, null=True
    )
    role_group = models.ForeignKey(RoleGroups, on_delete=models.DO_NOTHING, null=True)
    value = models.IntegerField(default=0)
    is_percentage = models.BooleanField(default=False)
    team_orientation = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.activity_type.name} - {self.academic_year.description} - {self.role_group.name} - {self.value} - percentage: {self.is_percentage} - team_orientation: {self.team_orientation}"


class Activity(ExportModelOperationsMixin('activity'), models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    responsible_user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    team = models.ForeignKey(Teams, on_delete=models.DO_NOTHING, null=True)
    virtual_team = models.ForeignKey(
        VirtualTeams, on_delete=models.DO_NOTHING, null=True, blank=True
    )
    activity_type = models.ForeignKey(
        ActivityType, on_delete=models.DO_NOTHING, null=True
    )
    academic_year = models.ForeignKey(
        AcademicYear, on_delete=models.DO_NOTHING, null=True
    )

    def __str__(self) -> str:
        return f"{self.title} - {self.date} - {self.location} - {self.team.name} { '(' + self.virtual_team.short_name +')' if self.virtual_team else ''} - {self.activity_type.name}"


class UserActivity(ExportModelOperationsMixin('user_activity'), models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, null=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, null=True)
    hours = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.activity} - {self.hours}"


class TeamLeadRecomendations(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name="team_lead_recommendations",
    )
    recommender = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="given_recommendations"
    )
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, null=True)
    recommendation = models.TextField(blank=True, max_length=1500, null=True)
    passed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user} - {self.academic_year.short}"
