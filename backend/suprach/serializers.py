from estudenti.serializers import AcademicYearSerializer
from .models import (
    Comments,
    Scores,
    Questions,
    SpecialPersonForGreade,
    Suprach,
    Likes,
    Gradings,
)
from rest_framework import serializers


class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = "__all__"


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"


class ScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scores
        fields = "__all__"


class SuprachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suprach
        fields = "__all__"


class SuprachListSerializer(serializers.ModelSerializer):
    academic_year = AcademicYearSerializer()

    class Meta:
        model = Suprach
        fields = "__all__"


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = "__all__"


class GradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gradings
        fields = "__all__"


class CommentsListSerializer(serializers.ModelSerializer):
    suprach = SuprachListSerializer()

    class Meta:
        model = Comments
        fields = "__all__"


class ScoreAvgSerializer(serializers.Serializer):
    question__id = serializers.IntegerField()
    question__description = serializers.CharField()
    avg_score = serializers.FloatField()


class SpecialPersonForGreadeSerializer(serializers.ModelSerializer):
    suprach = SuprachListSerializer()

    class Meta:
        model = SpecialPersonForGreade
        fields = "__all__"
