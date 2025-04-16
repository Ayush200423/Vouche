from rest_framework.exceptions import AuthenticationFailed
from functools import wraps
from django.http import JsonResponse
import jwt
import os

def get_user_from_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        raise AuthenticationFailed('No authorization header provided')
        
    if not auth_header.startswith('Bearer '):
        raise AuthenticationFailed('Invalid authorization header format')
        
    token = auth_header.split(' ')[1]
    if not token:
        raise AuthenticationFailed('No token provided')

    try:
        JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
        if not JWT_SECRET:
            raise AuthenticationFailed('JWT secret not configured')

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
            
        # uuid from supabase
        return payload['sub']
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Invalid token')

def supabase_auth_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        try:
            user_id = get_user_from_token(request)
            request.supabase_user = {'id': user_id}
            return view_func(request, *args, **kwargs)
        except AuthenticationFailed as err:
            return JsonResponse(
                {'error': str(err)},
                status=401
            )
        except Exception as err:
            return JsonResponse(
                {'error': f'Authentication error: {str(err)}'},
                status=401
            )
    
    return _wrapped_view