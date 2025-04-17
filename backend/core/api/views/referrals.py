from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from referrals.services import ReferralsService
from .helpers.campaigns import get_campaign_info
from auth import supabase_auth_required

referrals_service = ReferralsService()

@api_view(['GET'])
@supabase_auth_required
def get_pending_referrals_view(request):
    campaign_data, error_response = get_campaign_info(request.supabase_user['id'])
    if error_response:
        return error_response

    result = referrals_service.get_pending_referrals(campaign_data["id"])

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)

@api_view(['GET'])
@supabase_auth_required
def get_archived_referrals_view(request):
    campaign_data, error_response = get_campaign_info(request.supabase_user['id'])
    if error_response:
        return error_response

    result = referrals_service.get_archived_referrals(campaign_data["id"])

    if result["status"] == "error":
        return Response(result, status=status.HTTP_404_NOT_FOUND)
    return Response(result)

@api_view(['POST'])
@supabase_auth_required
def update_referral_status_view(request):
    referral_id = request.data.get('referral_id')
    new_status = request.data.get('status')

    if not referral_id or not new_status:
        return Response({
            "status": "error",
            "message": "Missing required fields: referral_id and status",
            "data": None
        }, status=status.HTTP_400_BAD_REQUEST)

    result = referrals_service.update_referral_status(referral_id, new_status)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
    return Response(result)

@api_view(['POST'])
@supabase_auth_required
def create_referral_view(request):
    campaign_data, error_response = get_campaign_info(request.supabase_user['id'])
    if error_response:
        return error_response

    data = request.data
    referrer_email = data.get('referrer_email')
    referred_email = data.get('referred_email')

    if not referrer_email or not referred_email:
        return Response({
            "status": "error",
            "message": "Both referrer and referred emails are required.",
            "data": None
        }, status=status.HTTP_400_BAD_REQUEST)

    result = referrals_service.create_referral(campaign_data["id"], referrer_email, referred_email)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
    return Response(result)