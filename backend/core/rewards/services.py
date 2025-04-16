from config.supabase import get_supabase_client
import uuid
from datetime import datetime
from users.services import UsersService

class RewardsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()

    def get_campaign_id(self, request):
        campaign = self.users_service.get_campaign(request)
        if not campaign:
            return {
                "status": "error",
                "message": "Failed to get campaign info",
                "data": None
            }
        return campaign["data"]["id"]

    def create_reward(self, referral_id, recipient_id):
        try:
            # Get the referral details
            referral_response = self.supabase.table('referrals') \
                .select('campaign') \
                .eq('id', referral_id) \
                .execute()

            if not referral_response.data:
                return {
                    "status": "error",
                    "message": "Referral not found",
                    "data": None
                }

            campaign_id = referral_response.data[0]['campaign']

            # Get the campaign details
            campaign_response = self.supabase.table('campaigns') \
                .select('*') \
                .eq('id', campaign_id) \
                .execute()

            if not campaign_response.data:
                return {
                    "status": "error",
                    "message": "Campaign not found",
                    "data": None
                }

            campaign = campaign_response.data[0]

            # Determine if this is for referrer or referred
            referral = self.supabase.table('referrals') \
                .select('referrer, referred') \
                .eq('id', referral_id) \
                .execute()

            if not referral.data:
                return {
                    "status": "error",
                    "message": "Referral not found",
                    "data": None
                }

            referral_data = referral.data[0]
            is_referrer = referral_data['referrer'] == recipient_id

            # Create the reward
            reward_type = 'referrer' if is_referrer else 'referred'
            reward_value = campaign['referrer_reward'] if is_referrer else campaign['referred_reward']

            response = self.supabase.table('rewards') \
                .insert({
                    'id': str(uuid.uuid4()),
                    'recipient': recipient_id,
                    'referral': referral_id,
                    'date': datetime.now().isoformat(),
                    'type': reward_type,
                    'value': reward_value
                }) \
                .execute()

            if not response.data:
                return {
                    "status": "error",
                    "message": "Failed to create reward",
                    "data": None
                }

            return {
                "status": "success",
                "message": "Reward created successfully",
                "data": response.data[0]
            }

        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to create reward: {str(err)}",
                "data": None
            }

    def get_rewards(self, request):
        try:
            campaign_id = self.get_campaign_id(request)
            if isinstance(campaign_id, dict) and campaign_id.get("status") == "error":
                return campaign_id

            response = self.supabase.table('rewards') \
                .select('*') \
                .eq('campaign', campaign_id) \
                .execute()
            
            if not response.data:
                return {
                    "status": "success",
                    "message": "No rewards found",
                    "data": []
                }

            return {
                "status": "success",
                "message": "Rewards retrieved successfully",
                "data": response.data
            }
        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to get rewards: {str(err)}",
                "data": None
            }