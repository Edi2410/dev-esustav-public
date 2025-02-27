from datetime import datetime
from django.db import models
from estudenti.models import AcademicYear


# Create your models here.
class Partners(models.Model):
    legal_name = models.CharField(max_length=255)
    brand_name = models.CharField(max_length=255)
    oib = models.CharField(max_length=32)
    address = models.CharField(max_length=255)
    black_list = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.legal_name} - {self.brand_name}"


class PartnersContact(models.Model):
    partner = models.ForeignKey(Partners, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(default=datetime.now, blank=True)

    def __str__(self) -> str:
        return f"{self.partner.brand_name} - {self.name} - {self.position} - {self.email} -{self.phone_number}"


class Projects(models.Model):
    project_name = models.CharField(max_length=255)
    short_project_name = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.project_name} - {self.short_project_name} - {self.is_deleted}"


class PartnerNotes(models.Model):
    partner = models.ForeignKey(Partners, on_delete=models.DO_NOTHING)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.DO_NOTHING)
    project = models.ForeignKey(
        Projects, on_delete=models.DO_NOTHING, blank=True, null=True
    )
    date = models.DateField(default=datetime.now, blank=True)
    notes = models.TextField()

    def __str__(self) -> str:
        return f"{self.partner.brand_name} - {self.academic_year} - {self.project.short_project_name}"
