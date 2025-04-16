from config.supabase import get_supabase_client
from users.services import UsersService

class ClientsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()

    def get_clients(self, request):
        try:
            campaign = self.users_service.get_campaign(request)
            if campaign["status"] == "error":
                return campaign

            campaign_id = campaign["data"]["id"]

            response = self.supabase.table('clients') \
                .select('*') \
                .eq('campaign', campaign_id) \
                .execute()
            
            return {
                "status": "success",
                "message": "Clients retrieved successfully",
                "data": response.data or []
            }
            
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get clients: {str(err)}",
                "data": None
            }