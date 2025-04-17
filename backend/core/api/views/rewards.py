from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rewards.services import RewardsService
from .helpers.campaigns import get_campaign_info
from auth import supabase_auth_required

rewards_service = RewardsService()

@api_view(['GET'])
@supabase_auth_required
def get_rewards_view(request):
    campaign_data, error_response = get_campaign_info(request.supabase_user['id'])
    if error_response:
        return error_response

    result = rewards_service.get_rewards(campaign_data["id"])

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)