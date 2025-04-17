from config.supabase import get_supabase_client
import uuid

class UsersService:
    def __init__(self):
        self.supabase = get_supabase_client()

    def get_campaign(self, user_id):
        try:
            # First check if user has a campaign
            response = self.supabase.table('campaigns') \
                .select('*') \
                .eq('user_id', user_id) \
                .execute()
            
            # Check for errors in the response
            if hasattr(response, 'error') and response.error:
                return {
                    "status": "error",
                    "message": f"Database error: {response.error.message}",
                    "data": None
                }
            
            # If we have data and it's not empty, return the first campaign
            if response.data and len(response.data) > 0:
                return {
                    "status": "success",
                    "message": "Campaign retrieved successfully",
                    "data": response.data[0]
                }
            
            # If no campaign exists, create one
            new_campaign = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "name": "My Campaign",
                "description": "",
                "referrer_reward_type": "message",
                "referrer_reward_value": "",
                "referred_reward_type": "message",
                "referred_reward_value": ""
            }
            
            create_response = self.supabase.table('campaigns') \
                .insert(new_campaign) \
                .execute()
            
            # Check for errors in the create response
            if hasattr(create_response, 'error') and create_response.error:
                return {
                    "status": "error",
                    "message": f"Failed to create campaign: {create_response.error.message}",
                    "data": None
                }
            
            if create_response.data:
                return {
                    "status": "success",
                    "message": "Campaign created successfully",
                    "data": create_response.data[0]
                }
            
            return {
                "status": "error",
                "message": "Failed to create campaign: No data returned",
                "data": None
            }
            
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get campaign: {str(err)}",
                "data": None
            }

    def create_campaign(self, user_id, campaign_data):
        try:
            campaign_data['id'] = str(uuid.uuid4())
            campaign_data['user_id'] = user_id
            
            response = self.supabase.table('campaigns') \
                .insert(campaign_data) \
                .execute()
            
            return {
                "status": "success",
                "message": "Campaign created successfully",
                "data": response.data[0]
            }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to create campaign: {str(e)}",
                "data": None
            }

    def update_campaign(self, user_id, campaign_data):
        try:
            campaign_data['user_id'] = user_id
            
            response = self.supabase.table('campaigns') \
                .update(campaign_data) \
                .eq('user_id', user_id) \
                .execute()
            
            return {
                "status": "success",
                "message": "Campaign updated successfully",
                "data": response.data[0]
            }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to update campaign: {str(e)}",
                "data": None
            }