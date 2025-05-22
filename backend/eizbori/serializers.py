from rest_framework import serializers

from estudenti.serializers import UserSerializer, TeamsSerializer, RolesSerializer
from .models import (
    Candidate,
    Elections,
    Votes,
    NumberOfVotesPerTeam,
    VotingDocuments,
    DocumentsVotes,
)


class CandidateSerializers(serializers.ModelSerializer):
    user = UserSerializer()
    team = TeamsSerializer()
    role = RolesSerializer()

    class Meta:
        model = Candidate
        fields = "__all__"


class IDTeamSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Candidate
        fields = ["team"]


class VotesSerializers(serializers.ModelSerializer):
    user = UserSerializer()
    kandidatura = CandidateSerializers()

    class Meta:
        model = Votes
        fields = "__all__"


class AddVotesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Votes
        fields = "__all__"


class AddDocumentVotesSerializers(serializers.ModelSerializer):
    class Meta:
        model = DocumentsVotes
        fields = "__all__"


class NumberOfVotesPerTeamSerializers(serializers.ModelSerializer):
    team = TeamsSerializer()

    class Meta:
        model = NumberOfVotesPerTeam
        fields = "__all__"


class ElectionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Elections
        fields = "__all__"


class VotingDocumentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = VotingDocuments
        fields = "__all__"
