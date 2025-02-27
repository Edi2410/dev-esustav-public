from django.db import models
from estudenti.models import AcademicYear, User, Roles, Teams, TeamGroups

# Create your models here.


class Elections(models.Model):
    description = models.TextField(blank=True, null=True)
    academic_year = models.ForeignKey(
        AcademicYear, on_delete=models.DO_NOTHING, null=True
    )
    for_leadership = models.BooleanField(default=False)
    for_up = models.BooleanField(default=False)
    for_coordinator = models.BooleanField(default=False)
    for_documents = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
    vote_active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.description} - {self.academic_year} - {self.active}"


class Candidate(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    role = models.ForeignKey(Roles, on_delete=models.DO_NOTHING, null=True)
    team = models.ForeignKey(Teams, on_delete=models.DO_NOTHING, null=True)
    teamgroup = models.ForeignKey(TeamGroups, on_delete=models.DO_NOTHING, null=True)
    elections = models.ForeignKey(Elections, on_delete=models.DO_NOTHING, null=True)
    cv = models.TextField(blank=True, null=True)
    plan_rada = models.TextField(blank=True, null=True)
    aktivnosti = models.TextField(blank=True, null=True)
    predstavljanje = models.TextField(blank=True, null=True)
    deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.role.name} - {self.team.name}"


class NumberOfVotesPerTeam(models.Model):
    team = models.ForeignKey(Teams, on_delete=models.DO_NOTHING, null=True)
    number_of_votes = models.IntegerField(default=1)

    def __str__(self) -> str:
        return f"{self.team.name} - {self.number_of_votes}"


class Votes(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.DO_NOTHING, null=True)
    vote = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.candidate.user.email} - {self.vote}"


class IsVoted(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    elections = models.ForeignKey(Elections, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.elections.description}"


class VotingDocuments(models.Model):
    elections = models.ForeignKey(Elections, on_delete=models.DO_NOTHING)
    document_title = models.TextField(blank=True, null=True)
    document_link = models.TextField(blank=True, null=True)
    deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.document_title}"


class DocumentsVotes(models.Model):
    document = models.ForeignKey(VotingDocuments, on_delete=models.DO_NOTHING)
    vote = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.document.document_title} - {self.vote}"
