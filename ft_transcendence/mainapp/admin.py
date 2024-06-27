# your_app/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Ajoutez les champs personnalisés que vous souhaitez afficher dans l'interface admin
    list_display = ['username','date_joined','image_profile']

admin.site.register(CustomUser, CustomUserAdmin)