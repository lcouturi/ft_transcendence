from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import os
from django.conf import settings

# Create your models here.
class CustomUser(AbstractUser):
    image_profile = models.ImageField(upload_to='images/',default='default_profile_image.jpg', null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    friends_list = models.ManyToManyField('self')

    class Meta:
        verbose_name_plural = "CustomUsers"

    def __str__(self):
        return self.username
    
    def get_image_profile_url(self):
        if not self.image_profile:
            return settings.MEDIA_URL + 'default_profile_image.jpg'
        return self.image_profile.url