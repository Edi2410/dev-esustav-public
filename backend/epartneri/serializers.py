from rest_framework import serializers

from estudenti.serializers import AcademicYearSerializer
from epartneri.models import Partners, PartnersContact, Projects, PartnerNotes


class PartnersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Partners
        fields = "__all__"


class PartnersContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = PartnersContact
        fields = "__all__"


class PartnersContactListSerializers(serializers.ModelSerializer):
    partner = PartnersSerializers()

    class Meta:
        model = PartnersContact
        fields = "__all__"


class ProjectsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = "__all__"


class PartnerNotesSerializers(serializers.ModelSerializer):
    class Meta:
        model = PartnerNotes
        fields = "__all__"


class PartnerNotesListSerializers(serializers.ModelSerializer):
    project = ProjectsSerializers()
    partner = PartnersSerializers()
    academic_year = AcademicYearSerializer()

    class Meta:
        model = PartnerNotes
        fields = "__all__"
