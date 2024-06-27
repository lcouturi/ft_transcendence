from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class CustomUser(AbstractUser):
    image_profile = models.ImageField(upload_to='profile_images/',blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.username