from config.supabase import get_supabase_client
import uuid
from users.services import UsersService

class ReferralsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()

    def get_pending_referrals(self, request):
        try:
            campaign = self.users_service.get_campaign(request)

            if not campaign:
                return {
                    "status": "error",
                    "message": "Failed to get campaign info",
                    "data": None
                }
                
            campaign_id = campaign["data"]["id"]

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
            campaign = self.users_service.get_campaign(request)
            if not campaign or "data" not in campaign or "id" not in campaign["data"]:
                return {
                    "status": "error",
                    "message": "Failed to get campaign information",
                    "data": None
                }
                
            campaign_id = campaign["data"]["id"]

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