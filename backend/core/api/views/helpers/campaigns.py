from users.services import UsersService
from rest_framework.response import Response
from rest_framework import status

users_service = UsersService()

def get_campaign_info(user_id):
    campaign = users_service.get_campaign(user_id)
    if campaign["status"] == "error" or not campaign["data"]:
        error_response = Response({
            "status": "error",
            "message": "No campaign found",
            "data": None
        }, status=status.HTTP_404_NOT_FOUND)
        return None, error_response
    
    return campaign["data"], None 