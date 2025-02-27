from django.contrib import admin
from django.contrib.auth.models import Group

from .models import (
    User,
    AcademicYear,
    RoleGroups,
    Roles,
    TeamGroups,
    Teams,
    UserPermissions,
    UsersPositions,
    VirtualTeams,
)


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "deleted",
        "is_staff",
        "is_superuser",
    )


class RoleGroupsAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "deleted",
    )


class RolesAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "role_group",
        "deleted",
    )


class TeamGroupsAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "deleted",
        "active",
        "virtual",
    )


class TeamsAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "deleted",
        "active",
        "TeamGroups",
    )


class VirtualTeamsAdmin(admin.ModelAdmin):
    list_display = (
        "short_name",
        "deleted",
        "active",
        "TeamGroups",
    )


class UsersPositionsAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "team",
        "team_group",
        "virtual_team",
        "role",
        "academic_year",
    )


@admin.action(description="Set Can Vote on True/False")
def set_can_vote_on_true(modeladmin, request, queryset):
    for obj in queryset:
        obj.can_vote = not obj.can_vote
        obj.save()
    
    
    
class UserPermissionsAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "academic_year",
        "info",
        "aktivnosti",
        "partneri",
        "izbori",
        "suprach",
        "suprach_admin",
        "can_vote",
    )
    actions = [set_can_vote_on_true]
    


class AcademicYearAdmin(admin.ModelAdmin):
    list_display = ("description", "start_date", "end_date", "active", "deleted")


admin.site.unregister(Group)


admin.site.register(User, UserAdmin)
admin.site.register(RoleGroups, RoleGroupsAdmin)
admin.site.register(Roles, RolesAdmin)

admin.site.register(TeamGroups, TeamGroupsAdmin)
admin.site.register(Teams, TeamsAdmin)
admin.site.register(VirtualTeams, VirtualTeamsAdmin)
admin.site.register(UsersPositions, UsersPositionsAdmin)
admin.site.register(UserPermissions, UserPermissionsAdmin)

admin.site.register(AcademicYear, AcademicYearAdmin)
