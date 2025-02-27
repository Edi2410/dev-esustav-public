from django.contrib import admin
from .models import Candidate, Votes, NumberOfVotesPerTeam, Elections, IsVoted, VotingDocuments,DocumentsVotes

# Register your models here.


class ElectionsAdmin(admin.ModelAdmin):
    list_display = (
        "description",
        "academic_year",
        "for_leadership",
        "for_up",
        "for_coordinator",
        "for_documents",
        "active",
        "vote_active",
    )


class CandidateAdmin(admin.ModelAdmin):
    list_display = ("user", "role", "team", "elections")


class VotesAdmin(admin.ModelAdmin):
    list_display = ("candidate", "vote")


class NumberOfVotesPerTeamAdmin(admin.ModelAdmin):
    list_display = ("team", "number_of_votes")


class IsVotedAdmin(admin.ModelAdmin):
    list_display = ("user", "elections")


class VotingDocumentsAdmin(admin.ModelAdmin):
    list_display = ("document_title", "elections")
    
class DocumentsVotesAdmin(admin.ModelAdmin):
    list_display = ("document", "vote")

admin.site.register(Elections, ElectionsAdmin)
admin.site.register(Candidate, CandidateAdmin)
admin.site.register(Votes, VotesAdmin)
admin.site.register(NumberOfVotesPerTeam, NumberOfVotesPerTeamAdmin)
admin.site.register(IsVoted, IsVotedAdmin)
admin.site.register(VotingDocuments, VotingDocumentsAdmin)
admin.site.register(DocumentsVotes, DocumentsVotesAdmin)
