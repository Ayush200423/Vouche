from rest_framework.exceptions import AuthenticationFailed
import jwt
import os

def get_user_from_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise AuthenticationFailed('No token provided')
        
    token = auth_header.split(' ')[1]
    
    try:
        JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )
            
        # uuid from supabase
        return payload['sub']
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Invalid token')