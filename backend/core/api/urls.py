from django.urls import path
from api.views import users, clients, rewards, referrals

urlpatterns = [
    path('campaigns/', users.get_campaign_view, name='get_campaign'),
    path('campaigns/update/', users.update_campaign_view, name='update_campaign'),
    path('clients/', clients.get_clients_view, name='get_clients'),
    path('referrals/pending/', referrals.get_pending_referrals_view, name='get_pending_referrals'),
    path('referrals/archived/', referrals.get_archived_referrals_view, name='get_archived_referrals'),
    path('referrals/update-status/', referrals.update_referral_status_view, name='update_referral_status'),
    path('rewards/', rewards.get_rewards_view, name='get_rewards'),
]