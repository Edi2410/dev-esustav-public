from django.contrib import admin
from .models import PartnerNotes, Partners, Projects, PartnersContact


class PartnersContactAdmin(admin.ModelAdmin):
    list_display = ("partner", "name", "position", "email", "phone_number", "date")


class PartnerNotesAdmin(admin.ModelAdmin):
    list_display = ("partner", "academic_year", "project", "date")


class PartnersAdmin(admin.ModelAdmin):
    list_display = ("legal_name", "brand_name", "oib", "address", "black_list")


class ProjectsAdmin(admin.ModelAdmin):
    list_display = ("project_name", "short_project_name", "is_deleted")


admin.site.register(PartnersContact, PartnersContactAdmin)
admin.site.register(PartnerNotes, PartnerNotesAdmin)
admin.site.register(Partners, PartnersAdmin)
admin.site.register(Projects, ProjectsAdmin)
