from django.urls import path, include
from rest_framework import routers

from .views import (
    LikesView,
    UserToCommentView,
    UserToGradeView,
    QuestionView,
    GradesView,
    CommentsView,
    ScoreView,
    SuprachView,
    SpecialPersonForGreadeView,
    SpecialPersonData,
    UsersWhoNotFillSuprach,
)


router = routers.DefaultRouter()
router.register("user-to-grade", UserToGradeView, basename="user-to-grade")
router.register("user-to-comment", UserToCommentView, basename="user-to-comment")
router.register(
    "user-who-not-fill-suprach",
    UsersWhoNotFillSuprach,
    basename="user-who-not-fill-suprach",
)
router.register("suprach", SuprachView, basename="suprach")
router.register("likes", LikesView, basename="likes")
router.register("questions", QuestionView, basename="questions")
router.register("grades", GradesView, basename="grades")
router.register("comments", CommentsView, basename="comments")
router.register("scores", ScoreView, basename="scores")
router.register("special", SpecialPersonForGreadeView, basename="special")
router.register("special/stats", SpecialPersonData, basename="special/stats")

urlpatterns = [
    path("", include(router.urls)),
]
