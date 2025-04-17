from config.supabase import get_supabase_client
import uuid
from datetime import datetime

class RewardsService:
    def __init__(self):
        self.supabase = get_supabase_client()

    def create_reward(self, referral_id, recipient_id):
        try:
            referral_campaign = self.supabase.table('referrals') \
                .select('campaign') \
                .eq('id', referral_id) \
                .execute()

            if not referral_campaign.data:
                return {
                    "status": "error",
                    "message": "Referral not found",
                    "data": None
                }

            campaign_id = referral_campaign.data[0]['campaign']

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

            reward_type = campaign['referrer_reward_type'] if is_referrer else campaign['referred_reward_type']
            reward_value = campaign['referrer_reward_value'] if is_referrer else campaign['referred_reward_value']

            if reward_type == 'message':
                return {
                    "status": "success",
                    "message": "Skipped creating reward for message type",
                    "data": None
                }

            response = self.supabase.table('rewards') \
                .insert({
                    'id': str(uuid.uuid4()),
                    'recipient': recipient_id,
                    'referral': referral_id,
                    'date': datetime.now().isoformat(),
                    'rewardtype': reward_type,
                    'rewardvalue': reward_value,
                    'status': 'issued'
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

    def get_rewards(self, campaign_id):
        try:
            referrals_response = self.supabase.table('referrals') \
                .select('id') \
                .eq('campaign', campaign_id) \
                .execute()

            if not referrals_response.data:
                return {
                    "status": "success",
                    "message": "No rewards found",
                    "data": []
                }

            referral_ids = [ref['id'] for ref in referrals_response.data]
            response = self.supabase.table('rewards') \
                .select('*') \
                .in_('referral', referral_ids) \
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