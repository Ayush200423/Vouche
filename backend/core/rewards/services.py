from config.supabase import get_supabase_client
import uuid
from referrals.services import ReferralsService

class RewardsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.referrals_service = ReferralsService()

    def get_rewards(self, request):
        try:
            archived_referrals = self.referrals_service.get_archived_referrals(request)
            if archived_referrals["status"] == "error":
                return {
                    "status": "error",
                    "message": archived_referrals["message"],
                    "data": None
                }

            referrals_data = archived_referrals["data"]
            if not referrals_data:
                return {
                    "status": "success",
                    "message": "No rewards found",
                    "data": []
                }

            response = self.supabase.table('rewards') \
                .select('*') \
                .in_('referral', [referral["id"] for referral in referrals_data]) \
                .execute()
            
            if response.data:
                return {
                    "status": "success",
                    "message": "Rewards retrieved successfully",
                    "data": response.data
                }
            return {
                "status": "success",
                "message": "No rewards found",
                "data": []
            }
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get rewards: {str(err)}",
                "data": None
            }