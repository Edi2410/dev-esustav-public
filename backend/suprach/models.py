from django.db import models

from estudenti.models import AcademicYear, RoleGroups, User
from django_prometheus.models import ExportModelOperationsMixin

# Create your models here.
class Suprach(models.Model):
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.DO_NOTHING)
    round = models.IntegerField(blank=True, null=True)
    active = models.BooleanField(default=False)
    grading_active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.start_date} - {self.end_date} - {self.academic_year} - {self.round} - {self.active} - {self.grading_active}"


class SpecialPersonForGreade(models.Model):  # svi ocjenjuju
    suprach = models.ForeignKey(Suprach, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=100)
    deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name} - {self.deleted}"


class Comments(ExportModelOperationsMixin('suprach_comments'), models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, blank=True, null=True)
    special_user = models.ForeignKey(
        SpecialPersonForGreade, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    suprach = models.ForeignKey(Suprach, on_delete=models.DO_NOTHING)
    comment = models.TextField()

    def __str__(self) -> str:
        return f"{self.user.email if self.user else self.special_user.name}"


class Likes(ExportModelOperationsMixin('suprach_likes'), models.Model):
    grader = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="grader_user_likes"
    )
    graded = models.ForeignKey(
        User,
        on_delete=models.DO_NOTHING,
        related_name="graded_user_likes",
        blank=True,
        null=True,
    )
    special_graded = models.ForeignKey(
        SpecialPersonForGreade, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    suprach = models.ForeignKey(Suprach, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"from: {self.grader.email} - to: {self.graded.email if self.graded else self.special_graded.name}"


class Gradings(ExportModelOperationsMixin('suprach_grades'), models.Model):
    suprach = models.ForeignKey(Suprach, on_delete=models.DO_NOTHING)
    grader = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="grader_user"
    )
    graded = models.ForeignKey(
        User,
        on_delete=models.DO_NOTHING,
        related_name="graded_user",
        blank=True,
        null=True,
    )
    special_graded = models.ForeignKey(
        SpecialPersonForGreade, on_delete=models.DO_NOTHING, blank=True, null=True
    )

    def __str__(self) -> str:
        return f"from: {self.grader.email} - to: {self.graded.email if self.graded else self.special_graded.name}"


class Questions(models.Model):
    description = models.CharField(max_length=500)

    def __str__(self) -> str:
        return f"{self.description}"


class Scores(ExportModelOperationsMixin('suprach_scores'), models.Model):
    suprach = models.ForeignKey(Suprach, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, blank=True, null=True)
    special_user = models.ForeignKey(
        SpecialPersonForGreade, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    question = models.ForeignKey(Questions, on_delete=models.DO_NOTHING)
    score = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.user.email if self.user else self.special_user.name} - {self.question.id} - {self.score}"


class SuprachsQuestions(models.Model):
    suprach = models.ForeignKey(Suprach, on_delete=models.DO_NOTHING)
    question = models.ForeignKey(Questions, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"suprach: {self.suprach.academic_year.short}|{self.suprach.round} - {self.question.description}"


class QuestionRoleGroups(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.DO_NOTHING)
    grader_role_group = models.ForeignKey(
        RoleGroups,
        on_delete=models.DO_NOTHING,
        related_name="grader_role",
        blank=True,
        null=True,
    )
    graded_role_group = models.ForeignKey(
        RoleGroups,
        on_delete=models.DO_NOTHING,
        related_name="graded_role",
        blank=True,
        null=True,
    )
    special_role_group = models.ForeignKey(
        SpecialPersonForGreade, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    suprach = models.ForeignKey(
        Suprach, on_delete=models.DO_NOTHING, blank=True, null=True
    )

    def __str__(self) -> str:
        return f"suprach: {self.suprach.academic_year.short}|{self.suprach.round} - {self.grader_role_group.name} --> {self.graded_role_group.name if self.graded_role_group else self.special_role_group.name} - question: {self.question.description}"
