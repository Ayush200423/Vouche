from config.supabase import get_supabase_client
from users.services import UsersService

class ClientsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()

    def get_clients(self, campaign_id):
        try:
            # Get clients for the campaign
            response = self.supabase.table('clients') \
                .select('*') \
                .eq('campaign', campaign_id) \
                .execute()
            
            # Check for errors in the response
            if hasattr(response, 'error') and response.error:
                return {
                    "status": "error",
                    "message": f"Database error: {response.error.message}",
                    "data": None
                }

            # Return empty array if no clients found
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