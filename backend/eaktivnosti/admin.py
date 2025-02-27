from django.contrib import admin
from eaktivnosti.models import (
    ActivityType,
    ActivityTypeRequirements,
    Activity,
    UserActivity,
    TeamLeadRecomendations,
)


class ActivityTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "has_hour")


class ActivityTypeRequirementsAdmin(admin.ModelAdmin):
    list_display = (
        "activity_type",
        "academic_year",
        "role_group",
        "value",
        "is_percentage",
        "team_orientation",
    )


class ActivityAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "date",
        "activity_type",
        "responsible_user",
        "team",
        "virtual_team",
        "academic_year",
    )


class UserActivityAdmin(admin.ModelAdmin):
    list_display = ("user", "activity", "academic_year", "hours")


class TeamLeadRecomendationsAdmin(admin.ModelAdmin):
    list_display = ("user", "recommendation", "passed", "academic_year")


# Register your models here.

admin.site.register(ActivityType, ActivityTypeAdmin)
admin.site.register(ActivityTypeRequirements, ActivityTypeRequirementsAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(UserActivity, UserActivityAdmin)
admin.site.register(TeamLeadRecomendations, TeamLeadRecomendationsAdmin)
