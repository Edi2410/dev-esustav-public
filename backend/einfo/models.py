from django.db import models
from estudenti.models import User, AcademicYear


class CertificateRequirements(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    academic_year = models.ForeignKey(
        AcademicYear, models.DO_NOTHING, blank=True, null=True
    )
    suprach_1 = models.BooleanField(default=False)
    suprach_2 = models.BooleanField(default=False)
    zivotopis = models.BooleanField(default=False)
    bootcamp = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.email} - {self.suprach_1} - {self.suprach_2} - {self.zivotopis} - {self.bootcamp}"
