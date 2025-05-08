from django.db.models import Sum
from eaktivnosti.models import UserActivity
from estudenti.models import UsersPositions


def get_user_position(user, academic_year):
    return UsersPositions.objects.get(user=user, academic_year=academic_year)


def get_sastanak_data(requirement, academic_year, request_user, user_position, request_user_position):
    if user_position.virtual_team:
        total = (
            UserActivity.objects.filter(
                academic_year=academic_year,
                activity__virtual_team=request_user_position.virtual_team,
                activity__activity_type=requirement.activity_type,
            )
            .values("activity")
            .distinct()
            .count()
        )

        attended = UserActivity.objects.filter(
            academic_year=academic_year,
            activity__virtual_team=request_user_position.virtual_team,
            user=request_user,
            activity__activity_type=requirement.activity_type,
        ).count()
    else:
        total = (
            UserActivity.objects.filter(
                academic_year=academic_year,
                activity__team=user_position.team,
                activity__activity_type=requirement.activity_type,
            )
            .values("activity")
            .distinct()
            .count()
        )

        attended = UserActivity.objects.filter(
            academic_year=academic_year,
            activity__team=user_position.team,
            user=request_user,
            activity__activity_type=requirement.activity_type,
        ).count()

    return {
        "aktivnost": requirement.activity_type.name,
        "odrzano": total or 0,
        "prisustvovao": attended or 0,
        "potrebno": requirement.value,
        "postotak": requirement.is_percentage,
    }


def get_standiranje_data(requirement, academic_year, request_user, exclude_team=True, user_position=None):
    queryset = UserActivity.objects.filter(
        academic_year=academic_year,
        user=request_user,
        activity__activity_type=requirement.activity_type,
    )

    if exclude_team and user_position:
        queryset = queryset.exclude(activity__team=user_position.team)

    result = queryset.aggregate(total=Sum("hours"))

    return {
        "aktivnost": requirement.activity_type.name,
        "potrebno": requirement.value,
        "prisustvovao": result["total"] or 0,
        "postotak": requirement.is_percentage,
    }


def get_activity_count_and_hours(requirement, academic_year, request_user):
    total = (
        UserActivity.objects.filter(
            academic_year=academic_year,
            activity__activity_type=requirement.activity_type,
        )
        .values("activity")
        .distinct()
        .count()
    )
    attended = (
        UserActivity.objects.filter(
            academic_year=academic_year,
            user=request_user,
            activity__activity_type=requirement.activity_type,
        ).aggregate(total=Sum("hours"))
    )

    return {
        "aktivnost": requirement.activity_type.name,
        "potrebno": requirement.value,
        "odrzano": total or 0,
        "prisustvovao": attended["total"] or 0,
        "postotak": requirement.is_percentage,
    }
