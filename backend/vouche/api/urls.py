from django.urls import path
from backend.vouche.api.views import users, clients, rewards, referrals

urlpatterns = [
    path('', users.index, name='index'),
]