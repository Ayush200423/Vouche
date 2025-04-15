from django.shortcuts import HttpResponse
from vouche.config.supabase import get_supabase_client

def index(request):
    supabase = get_supabase_client()

    return HttpResponse({"message": "Hello, World!"})