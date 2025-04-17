from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import json
from auth import supabase_auth_required
from users.services import UsersService

users_service = UsersService()

@api_view(['GET'])
@supabase_auth_required
def get_campaign_view(request):
    user_id = request.supabase_user['id']
    result = users_service.get_campaign(user_id)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)

@api_view(['POST'])
@supabase_auth_required
def update_campaign_view(request):
    user_id = request.supabase_user['id']
    campaign_data = json.loads(request.body)
    result = users_service.update_campaign(user_id, campaign_data)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_400_BAD_REQUEST)

    return Response(result)