from django.contrib import admin

from einfo.models import CertificateRequirements

# Register your models here.


class CertificateRequirementsAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "academic_year",
        "suprach_1",
        "suprach_2",
        "zivotopis",
        "bootcamp",
    )


admin.site.register(CertificateRequirements, CertificateRequirementsAdmin)
