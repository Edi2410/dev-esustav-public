from django.contrib import admin

from .models import (
    Suprach,
    Comments,
    Likes,
    Gradings,
    Questions,
    QuestionRoleGroups,
    SuprachsQuestions,
    Scores,
    SpecialPersonForGreade,
)


class SuprachAdmin(admin.ModelAdmin):
    list_display = (
        "start_date",
        "end_date",
        "academic_year",
        "round",
        "active",
        "grading_active",
    )


class CommentsAdmin(admin.ModelAdmin):
    list_display = ("user", "special_user", "suprach")


class LikesAdmin(admin.ModelAdmin):
    list_display = ("suprach", "grader", "graded", "special_graded")


class GradingsAdmin(admin.ModelAdmin):
    list_display = ("suprach", "grader", "graded", "special_graded")


class QuestionsAdmin(admin.ModelAdmin):
    list_display = ("description",)


class QuestionRoleGroupsAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "grader_role_group",
        "graded_role_group",
        "special_role_group",
        "suprach",
    )


class ScoresAdmin(admin.ModelAdmin):
    list_display = ("suprach", "user", "special_user", "question", "score")


class SuprachsQuestionsAdmin(admin.ModelAdmin):
    list_display = ("suprach", "question")


class SpecialPersonForGreadeAdmin(admin.ModelAdmin):
    list_display = ("name", "suprach", "deleted")


admin.site.register(Suprach, SuprachAdmin)
admin.site.register(Comments, CommentsAdmin)
admin.site.register(Likes, LikesAdmin)
admin.site.register(Gradings, GradingsAdmin)
admin.site.register(Questions, QuestionsAdmin)
admin.site.register(QuestionRoleGroups, QuestionRoleGroupsAdmin)
admin.site.register(Scores, ScoresAdmin)
admin.site.register(SuprachsQuestions, SuprachsQuestionsAdmin)
admin.site.register(SpecialPersonForGreade, SpecialPersonForGreadeAdmin)
