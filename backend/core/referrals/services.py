from config.supabase import get_supabase_client
import uuid
from users.services import UsersService

class ReferralsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()

    def get_pending_referrals(self, request):
        try:
            campaign_id = self.get_campaign_id(request)

            response = self.supabase.table('referrals') \
                .select('*') \
                .eq('campaign', campaign_id) \
                .in_('status', ['pending approval', 'pending appointment']) \
                .execute()
            
            if not response.data:
                return {
                    "status": "success",
                    "message": "No pending referrals found",
                    "data": []
                }

            return {
                "status": "success",
                "message": "Pending referrals retrieved successfully",
                "data": response.data
            }
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get referrals: {str(err)}",
                "data": None
            }
        
    def get_archived_referrals(self, request):
        try:
            campaign_id = self.get_campaign_id(request)
            if isinstance(campaign_id, dict) and campaign_id.get("status") == "error":
                return campaign_id

            response = self.supabase.table('referrals') \
                .select('*') \
                .eq('campaign', campaign_id) \
                .in_('status', ['successful', 'cancelled']) \
                .execute()
            
            if not response.data:
                return {
                    "status": "success",
                    "message": "No archived referrals found",
                    "data": []
                }

            return {
                "status": "success",
                "message": "Archived referrals retrieved successfully",
                "data": response.data
            }
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get referrals: {str(err)}",
                "data": None
            }

    def update_referral_status(self, request, referral_id, new_status):
        try:
            valid_statuses = ['successful', 'cancelled', "pending approval", "pending appointment"]
            if new_status not in valid_statuses:
                return {
                    "status": "error",
                    "message": "Invalid status.",
                    "data": None
                }
            
            campaign_id = self.get_campaign_id(request)
        
            update_response = self.supabase.table('referrals') \
                .update({'status': new_status}) \
                .eq('id', referral_id) \
                .eq('campaign', campaign_id) \
                .execute()

            if not update_response.data:
                return {
                    "status": "error",
                    "message": "Failed to update referral status",
                    "data": None
                }

            return {
                "status": "success",
                "message": f"Referral status updated to {new_status}",
                "data": update_response.data[0]
            }

        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to update referral status: {str(err)}",
                "data": None
            }
        
    def get_campaign_id(self, request):
        campaign = self.users_service.get_campaign(request)
        if not campaign:
            return {
                "status": "error",
                "message": "Failed to get campaign info",
                "data": None
            }
            
        return campaign["data"]["id"]