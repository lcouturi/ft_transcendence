from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="accueil"),
    path("login_check", views.login_check),
    path("logout_check", views.logout_check, name = "logout"),
    path("register", views.register, name="register")
]