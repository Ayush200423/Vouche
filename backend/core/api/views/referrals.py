from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from referrals.services import ReferralsService
from auth import supabase_auth_required

referrals_service = ReferralsService()

@api_view(['GET'])
@supabase_auth_required
def get_pending_referrals_view(request):
    result = referrals_service.get_pending_referrals(request)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)

@api_view(['GET'])
@supabase_auth_required
def get_archived_referrals_view(request):
    result = referrals_service.get_archived_referrals(request)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)