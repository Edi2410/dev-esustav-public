def requirements_status(user, activity_data, activity_requirements):
    try:
        requirements_status = []
        for activity_requirement in activity_requirements:
            dict = {}
            dict["activity_type"] = activity_requirement.activity_type.name
            dict["role_group"] = activity_requirement.role_group.name

            user_activity = activity_data.filter(
                user__id=user.id,
                activity__activity_type=activity_requirement.activity_type,
            )
            if activity_requirement.activity_type.has_hour:
                hours_count = 0
                for activity in user_activity:
                    hours_count += activity.hours

                dict["value"] = hours_count
                dict["requirement"] = activity_requirement.value
            else:
                dict["value"] = user_activity.count()
                dict["requirement"] = activity_requirement.value / 100

            dict["team_orientation"] = activity_requirement.team_orientation
            requirements_status.append(dict)

    except Exception as e:
        print(e)
        return False
