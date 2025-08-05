# authenticate/authenticate.py
from rest_framework.exceptions import AuthenticationFailed
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.authentication import JWTAuthentication
import jwt
from django.contrib.auth import get_user_model


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try reading the token from the 'Authorization' header first
        header_auth = super().authenticate(request)
        if header_auth:
            return header_auth

        token = request.COOKIES.get("token")  # Get webtoken (cookie)

        if not token:
            return None  # No token found, authentication skipped (another class may handle it)

        try:
            # Validate token and get username from validated token
            validate_token = self.get_validated_token(token)
            validate_user = self.get_user(validate_token)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(_("Token has expired"))
        except jwt.InvalidTokenError:
            raise AuthenticationFailed(_("Invalid token"))
        except get_user_model().DoesNotExist:
            raise AuthenticationFailed(_("User not found"))

        return (validate_user, validate_token)
