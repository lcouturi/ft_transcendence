from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="accueil"),
    path("login_check", views.login_check),
    path("logout_check", views.logout_check, name = "logout"),
    path("register_check", views.register_check, name="register"),
    path("upload_image", views.upload_image),
    path("add_friend", views.add_friend),
    path("delete_friend", views.delete_friend)
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
