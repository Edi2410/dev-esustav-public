from rest_framework import serializers


class CredentialSerializer(serializers.Serializer):
    credential = serializers.CharField()
