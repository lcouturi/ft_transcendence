from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="accueil"),
    path("login_check", views.login_check),
    path("register", views.register, name="register")
]