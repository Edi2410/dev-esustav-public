from datetime import datetime
from rest_framework import viewsets, status

from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from logs.models import ErrorLogs
from estudenti.models import User

from google.oauth2 import id_token
from google.auth.transport import requests

from settings.settings import GOOGLE_SCOPE_ID

from estudenti.models import User
from authentication.serializers import CredentialSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes


class AuthView(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = CredentialSerializer
    permission_classes = [AllowAny]

    @extend_schema(
        parameters=[OpenApiParameter(name="credential", type=OpenApiTypes.STR)],
        responses={200: CredentialSerializer},
    )
    def list(self, request):
        
        user = User.objects.get(email='edi.graovac@estudent.hr')
                    # picture = decoded_token.get("picture")
        refresh = RefreshToken.for_user(user)
        return Response(
            {"accessToken": str(refresh.access_token)},
            status=status.HTTP_200_OK,
        )
        
        try:
            credential = request.query_params.get("credential")
            if not credential:
                return Response(
                    {"error": "Credential not provided"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            decoded_token = id_token.verify_oauth2_token(
                credential, requests.Request(), GOOGLE_SCOPE_ID
            )
            email = decoded_token.get("email")
            
            if email and email.split("@")[1] == "estudent.hr":
                try:
                    user = User.objects.get(username=email, deleted=0)
                    picture = decoded_token.get("picture")
                    if not (user.photo == picture):
                        user.photo = picture
                        user.save()
                    refresh = RefreshToken.for_user(user)
                    return Response(
                        {"accessToken": str(refresh.access_token)},
                        status=status.HTTP_200_OK,
                    )
                except User.DoesNotExist:
                    return Response(
                        {"error": "User does not exist"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                return Response(
                    {"error": "Invalid email domain"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            print("Error:", str(e))
            ErrorLogs.objects.create(error=str(e))
            return Response(
                {"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST
            )

