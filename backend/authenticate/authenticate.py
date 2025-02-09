# authenticate/authenticate.py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.exceptions import InvalidToken
from django.conf import settings
import jwt
from django.contrib.auth import get_user_model

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Extract the token from cookies (adjust 'access_token' to match your cookie name)
        token = request.COOKIES.get('token')

        if not token:
            return None  # No token found, authentication skipped (another class may handle it)

        try:
            # Decode the token using SimpleJWT settings
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=["HS256"],  # You can specify the algorithm used in your project
            )

            # Get user from the payload
            user = get_user_model().objects.get(user_name=payload['user_name'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(_('Token has expired'))
        except jwt.InvalidTokenError:
            raise AuthenticationFailed(_('Invalid token'))
        except get_user_model().DoesNotExist:
            raise AuthenticationFailed(_('User not found'))

        # Return the user and the token if the authentication is successful
        return (user, token)
