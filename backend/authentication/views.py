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

from prometheus_client import Counter

number_of_authentication_requests = Counter(
    'authentication_requests',
    'Broj puta kada je pozvan endpoint za autentifikaciju'
)
number_of_authentication_requests_failures = Counter(
    'authentication_requests_failures',
    'Broj puta kada je došlo do greške prilikom autentifikacije'
)

class AuthView(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = CredentialSerializer
    permission_classes = [AllowAny]

    @extend_schema(
        parameters=[OpenApiParameter(name="credential", type=OpenApiTypes.STR)],
        responses={200: CredentialSerializer},
    )
    def list(self, request):
        try:
            number_of_authentication_requests.inc()
            credential = request.query_params.get("credential")
            if not credential:
                number_of_authentication_requests_failures.inc(),
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
                    number_of_authentication_requests_failures.inc(),
                    return Response(
                        {"error": "User does not exist"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                number_of_authentication_requests_failures.inc(),
                return Response(
                    {"error": "Invalid email domain"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            number_of_authentication_requests_failures.inc()
            print("Error:", str(e))
            ErrorLogs.objects.create(error=str(e))
            return Response(
                {"error": "An error occurred"}, status=status.HTTP_400_BAD_REQUEST
            )

