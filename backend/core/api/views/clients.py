from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from clients.services import ClientsService
from .helpers.campaigns import get_campaign_info
from auth import supabase_auth_required

clients_service = ClientsService()

@api_view(['GET'])
@supabase_auth_required
def get_clients_view(request):
    campaign_data, error_response = get_campaign_info(request.supabase_user['id'])
    if error_response:
        return error_response

    result = clients_service.get_clients(campaign_data["id"])

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)