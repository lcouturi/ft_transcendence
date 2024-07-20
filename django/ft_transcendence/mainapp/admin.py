# your_app/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,FriendRequest

class CustomUserAdmin(UserAdmin):
    list_display = ['username']
    
admin.site.register(CustomUser)
admin.site.register(FriendRequest)