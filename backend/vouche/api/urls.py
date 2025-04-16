from django.urls import path
from api.views import users, clients, rewards, referrals

urlpatterns = [
    path('', users.index, name='index'),
    path('campaigns/', users.get_campaign_view, name='get_campaign'),
    path('campaigns/update/', users.update_campaign_view, name='update_campaign'),
]