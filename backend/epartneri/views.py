from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render

from logs.models import ErrorLogs
from estudenti.models import AcademicYear
from epartneri.models import Partners, PartnersContact, Projects, PartnerNotes
from epartneri.serializers import (
    PartnersSerializers,
    PartnersContactSerializers,
    ProjectsSerializers,
    PartnerNotesSerializers,
    PartnerNotesListSerializers,
)


# Create your views here.
class PartnersView(viewsets.ModelViewSet):
    queryset = Partners.objects.all()
    serializer_class = PartnersSerializers
    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            return_data = []
            partners = Partners.objects.all()
            for partner in partners:
                project_data = (
                    PartnerNotes.objects.filter(
                        partner=partner, project__is_deleted=False
                    )
                    .values_list("project__short_project_name")
                    .distinct()
                )
                partner_serializer = PartnersSerializers(partner)
                return_data.append(
                    {"partner": partner_serializer.data, "projects": project_data}
                )

            return Response(return_data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            partner = Partners.objects.get(id=pk)
            partner_serializer = PartnersSerializers(partner)
            partner_contacts = PartnersContact.objects.filter(partner=partner)
            partner_contacts_serializer = PartnersContactSerializers(
                partner_contacts, many=True
            )
            academic_year = AcademicYear.objects.all().order_by("-id")
            notes = []
            for year in academic_year:
                partner_notes = PartnerNotes.objects.filter(
                    partner=partner, academic_year=year
                )
                partner_notes_serializer = PartnerNotesListSerializers(
                    partner_notes, many=True
                )
                notes.append(
                    {
                        "academic_year": year.description,
                        "year_notes": partner_notes_serializer.data,
                    }
                )

            return_data = {
                "partner": partner_serializer.data,
                "notes": notes,
                "contacts": partner_contacts_serializer.data,
            }
            return JsonResponse(return_data, status=status.HTTP_200_OK)
        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_404_NOT_FOUND)


class PartnersContactsView(viewsets.ModelViewSet):
    queryset = PartnersContact.objects.all()
    serializer_class = PartnersContactSerializers
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            ErrorLogs.objects.create(error=str(e), user=self.request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProjectsView(viewsets.ModelViewSet):
    queryset = Projects.objects.filter(is_deleted=False).order_by("project_name")
    serializer_class = ProjectsSerializers
    permission_classes = [IsAuthenticated]


class Notes(viewsets.ModelViewSet):
    queryset = PartnerNotes.objects.all()
    serializer_class = PartnerNotesSerializers
    permission_classes = [IsAuthenticated]
