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


@api_view(['POST'])
@supabase_auth_required
def update_referral_status_view(request):
    result = referrals_service.update_referral_status(request)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
    return Response(result)

@api_view(['POST'])
@supabase_auth_required
def create_referral_view(request):
    data = request.data
    referrer_email = data.get('referrer_email')
    referred_email = data.get('referred_email')

    if not referrer_email or not referred_email:
        return Response({
            "status": "error",
            "message": "Both referrer and referred emails are required.",
            "data": None
        }, status=status.HTTP_400_BAD_REQUEST)

    result = referrals_service.create_referral(request, referrer_email, referred_email)

    if result["status"] == "error":
        return Response(result, status=status.HTTP_400_BAD_REQUEST)
        
    return Response(result)