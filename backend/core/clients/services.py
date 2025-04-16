from config.supabase import get_supabase_client
import uuid
from users.services import UsersService

class ClientsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()

    def get_clients(self, request):
        campaign = self.users_service.get_campaign(request)
        campaign_id = campaign["data"]["id"]

        try:
            response = self.supabase.table('clients') \
                .select('*') \
                .eq('campaign', campaign_id) \
                .execute()
            
            if response.data:
                return {
                    "status": "success",
                    "message": "Clients retrieved successfully",
                    "data": response.data
                }
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get clients: {str(err)}",
                "data": None
            }