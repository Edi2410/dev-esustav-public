from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from logs.models import ErrorLogs
from enums.RolesEnum import RolesEnum
from eizbori.models import (
    Candidate,
    DocumentsVotes,
    Elections,
    IsVoted,
    Votes,
    NumberOfVotesPerTeam,
    VotingDocuments,
)
from django.db.models import Q
from eizbori.serializers import (
    CandidateSerializers,
    IDTeamSerializer,
    VotesSerializers,
    NumberOfVotesPerTeamSerializers,
    AddVotesSerializers,
    AddDocumentVotesSerializers
)
from estudenti.models import Teams, UsersPositions


class ElectionsVotesView(viewsets.GenericViewSet):
    queryset = Votes.objects.all()
    serializer_class = VotesSerializers()
    permission_classes = [IsAuthenticated]

    # def list(self, request):
    #     serializer = IDTeamSerializer(data=request.query_params)
    #     serializer.is_valid(raise_exception=True)
    #     queryset = Votes.objects.filter(
    #         team=serializer.validated_data["team"], deleted=False
    #     )
    #     serializer = VotesSerializers(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        try:
            active_elections = Elections.objects.get(active=True)
            print(request.data)
            if active_elections.for_documents:
                for item in request.data:
                    serializer = AddDocumentVotesSerializers(data=item)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(
                            {"error: error"}, status=status.HTTP_400_BAD_REQUEST
                        )

            else:
                for item in request.data:
                    serializer = AddVotesSerializers(data=item)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(
                            {"error: error"}, status=status.HTTP_400_BAD_REQUEST
                        )

            IsVoted.objects.create(
                user=self.request.user,
                elections=active_elections,
            )
            return Response({"success"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["GET"], detail=False, url_path="number")
    def number_of_votes(self, request):
        try:
            user = UsersPositions.objects.get(user=self.request.user)
            if user.role.name == RolesEnum.KOORDINATOR.value:

                queryset = NumberOfVotesPerTeam.objects.filter(
                    team__TeamGroups=user.team_group
                )
            else:
                queryset = NumberOfVotesPerTeam.objects.filter(team=user.team)

            serializer = NumberOfVotesPerTeamSerializers(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["GET"], detail=False, url_path="is-voted")
    def votes_data(self, request):
        try:
            active_election = Elections.objects.get(active=True)

            voted = IsVoted.objects.filter(
                    user=self.request.user, elections=active_election
                )

            if not voted:
                return Response(
                    {"is_voted": False, "message": "Glasaj"}, status=status.HTTP_200_OK
                )

            return Response(
                {"is_voted": True, "message": "Glasanje je već obavljeno"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["GET"], detail=False, url_path="results")
    def votes_results(self, request):
        try:
            return_data = []
            active_election = Elections.objects.get(active=True)

            if active_election.for_documents:
                documents = VotingDocuments.objects.filter(elections=active_election)

                for document in documents:
                    return_data.append(
                        {
                            "candidate": document.document_title,
                            "team": "-",
                            "role": "-",
                            "votes_yes": DocumentsVotes.objects.filter(
                                document=document, vote=True
                            ).count(),
                            "votes_no": DocumentsVotes.objects.filter(
                                document=document, vote=False
                            ).count(),
                        }
                    )

            else:
                kandidati = Candidate.objects.filter(
                    deleted=False, elections=active_election
                ).order_by("team")

                for kandidat in kandidati:
                    return_data.append(
                        {
                            "candidate": kandidat.user.first_name
                            + " "
                            + kandidat.user.last_name,
                            "team": kandidat.team.short_name,
                            "role": kandidat.role.name,
                            "votes_yes": Votes.objects.filter(
                                candidate=kandidat, vote=True
                            ).count(),
                            "votes_no": Votes.objects.filter(
                                candidate=kandidat, vote=False
                            ).count(),
                        }
                    )

            return JsonResponse(return_data, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)
