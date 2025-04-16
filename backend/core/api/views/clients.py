from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from clients.services import ClientsService
from auth import supabase_auth_required

clients_service = ClientsService()

@api_view(['GET'])
@supabase_auth_required
def get_clients_view(request):
    result = clients_service.get_clients(request)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)