from config.supabase import get_supabase_client
import uuid
from users.services import UsersService
from datetime import datetime
from rewards.services import RewardsService

class ReferralsService:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.users_service = UsersService()
        self.rewards_service = RewardsService()

    def get_pending_referrals(self, campaign_id):
        try:
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
        
    def get_archived_referrals(self, campaign_id):
        try:
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

    def update_referral_status(self, referral_id, new_status):
        try:
            if not referral_id or not new_status:
                return {
                    "status": "error",
                    "message": "Missing required fields: referral_id and status",
                    "data": None
                }

            valid_statuses = ['pending approval', 'pending appointment', 'successful', 'cancelled']
            if new_status not in valid_statuses:
                return {
                    "status": "error",
                    "message": f"Invalid status. Must be one of: {', '.join(valid_statuses)}",
                    "data": None
                }

            response = self.supabase.table('referrals') \
                .update({'status': new_status}) \
                .eq('id', referral_id) \
                .execute()

            if not response.data:
                return {
                    "status": "error",
                    "message": "Failed to update referral status",
                    "data": None
                }

            if new_status == 'successful':
                referral = response.data[0]
                rewards_service = RewardsService()
                
                referrer_reward = rewards_service.create_reward(referral_id, referral['referrer'])
                if referrer_reward["status"] == "error":
                    return referrer_reward

                referred_reward = rewards_service.create_reward(referral_id, referral['referred'])
                if referred_reward["status"] == "error":
                    return referred_reward

            return {
                "status": "success",
                "message": "Referral status updated successfully",
                "data": response.data[0]
            }

        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to update referral status: {str(err)}",
                "data": None
            }
        
    def create_referral(self, campaign_id, referrer_email, referred_email):
        try:
            referrer_response = self.supabase.table('clients') \
                .select('id') \
                .eq('contact', referrer_email) \
                .eq('campaign', campaign_id) \
                .execute()

            if not referrer_response.data:
                referrer_response = self.supabase.table('clients') \
                    .insert({
                        'id': str(uuid.uuid4()),
                        'contact': referrer_email,
                        'referral_link': str(uuid.uuid4()),
                        'campaign': campaign_id
                    }) \
                    .execute()
            
            referrer_id = referrer_response.data[0]['id']

            referred_response = self.supabase.table('clients') \
                .select('id') \
                .eq('contact', referred_email) \
                .eq('campaign', campaign_id) \
                .execute()

            if not referred_response.data:
                referred_response = self.supabase.table('clients') \
                    .insert({
                        'id': str(uuid.uuid4()),
                        'contact': referred_email,
                        'referral_link': str(uuid.uuid4()),
                        'campaign': campaign_id
                    }) \
                    .execute()
            
            referred_id = referred_response.data[0]['id']

            response = self.supabase.table('referrals') \
                .insert({
                    'id': str(uuid.uuid4()),
                    'referrer': referrer_id,
                    'referred': referred_id,
                    'date': datetime.now().isoformat(),
                    'status': 'pending approval',
                    'campaign': campaign_id
                }) \
                .execute()

            if not response.data:
                return {
                    "status": "error",
                    "message": "Failed to create referral",
                    "data": None
                }

            return {
                "status": "success",
                "message": "Referral created successfully",
                "data": response.data[0]
            }

        except Exception as err:
            return {
                "status": "error",
                "message": f"Failed to create referral: {str(err)}",
                "data": None
            }