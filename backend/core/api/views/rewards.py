from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rewards.services import RewardsService
from auth import supabase_auth_required

rewards_service = RewardsService()

@api_view(['GET'])
@supabase_auth_required
def get_rewards_view(request):
    result = rewards_service.get_rewards(request)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)