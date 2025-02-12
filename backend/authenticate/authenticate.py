# authenticate/authenticate.py
from rest_framework.response import Response
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework import status
from django.conf import settings
import jwt
from django.contrib.auth import get_user_model

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Extract the token from cookies (adjust 'access_token' to match your cookie name)
        username = request.COOKIES.get('username')
        token = str(request.COOKIES.get('token'))

        if not token:
            return "No such user"  # No token found, authentication skipped (another class may handle it)

        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=["HS256"],  # You can specify the algorithm used in your project
            )
            # Get user from the payload
            check = get_user_model().objects.get(user_name=username)
            # Placeholder return statement. Needs to be changed based on frontend.
            #return Response({'username': check, 'token': str(token)}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(_('Token has expired'))
        except jwt.InvalidTokenError:
            raise AuthenticationFailed(_('Invalid token'))
        except get_user_model().DoesNotExist:
            raise AuthenticationFailed(_('User not found'))

        # Return the user and the token if the authentication is successful
        context = {
            "status": "Success",
            "user name": check,
            "token": str(token)
        }
        #response = Response(context, status=status.HTTP_200_OK)
        return (check, str(token))
