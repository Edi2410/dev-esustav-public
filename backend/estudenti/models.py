from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin


class AcademicYear(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.CharField(max_length=50, blank=True, null=True)
    short = models.CharField(max_length=50, blank=True, null=True)
    active = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.description}"


class RoleGroups(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name}"


class Roles(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    deleted = models.BooleanField(default=False)
    role_group = models.ForeignKey(RoleGroups, on_delete=models.DO_NOTHING, null=True)

    def __str__(self) -> str:
        return f"{self.name}"


class User(AbstractUser, PermissionsMixin):
    deleted = models.BooleanField(default=False)
    email = models.EmailField(unique=True)

    class Gender(models.TextChoices):
        MALE = "male"
        FEMALE = "female"
        OTHER = "other"

    gender = models.CharField(
        choices=Gender.choices,
        max_length=20,
        default=Gender.OTHER,
    )
    photo = models.TextField(blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self) -> str:
        return f"{self.email}"


class TeamGroups(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    short_name = models.CharField(max_length=50, blank=True, null=True)
    deleted = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
    virtual = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name}"


class Teams(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    short_name = models.CharField(max_length=50, blank=True, null=True)
    deleted = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)
    TeamGroups = models.ForeignKey(TeamGroups, on_delete=models.DO_NOTHING, null=True)

    def __str__(self) -> str:
        return f"{self.name}"


class VirtualTeams(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    short_name = models.CharField(max_length=50, blank=True, null=True)
    deleted = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)
    TeamGroups = models.ForeignKey(TeamGroups, on_delete=models.DO_NOTHING, null=True)

    def __str__(self) -> str:
        return f"{self.short_name}"


class UsersPositions(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    team = models.ForeignKey(
        Teams, on_delete=models.DO_NOTHING, null=True, related_name="team"
    )
    team_group = models.ForeignKey(
        TeamGroups, on_delete=models.DO_NOTHING, null=True, related_name="team_group"
    )
    virtual_team = models.ForeignKey(
        VirtualTeams, on_delete=models.DO_NOTHING, null=True, blank=True
    )
    role = models.ForeignKey(Roles, on_delete=models.DO_NOTHING, null=True)
    academic_year = models.ForeignKey(
        AcademicYear, on_delete=models.DO_NOTHING, null=True
    )

    def __str__(self) -> str:
        return f"{self.user.email} -{self.role.name}- {self.team.short_name} - {self.team_group.name} - {self.virtual_team.name if self.virtual_team else ''} - {self.academic_year}"


class UserPermissions(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    academic_year = models.ForeignKey(
        AcademicYear, on_delete=models.DO_NOTHING, null=True
    )
    info = models.BooleanField(default=False)
    aktivnosti = models.BooleanField(default=False)
    partneri = models.BooleanField(default=False)
    izbori = models.BooleanField(default=False)
    suprach = models.BooleanField(default=False)
    suprach_admin = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    can_vote = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.academic_year} - info: {self.info} - aktivnosti: {self.aktivnosti} - partneri: {self.partneri} - izbori: {self.izbori} - suprach: {self.suprach} - suprach_admin: {self.suprach_admin} - admin: {self.admin}"
