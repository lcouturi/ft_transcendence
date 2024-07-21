from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import os
from django.conf import settings
from datetime import datetime, timedelta

# Create your models here.

class CustomUser(AbstractUser):
    image_profile = models.ImageField(upload_to='images/',default='default_profile_image.jpg', null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    friends_list = models.ManyToManyField('self')
    friends_requests = models.ManyToManyField('self', through='FriendRequest',symmetrical=False, related_name='friend_requesters',)
    latest_activity = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name_plural = "CustomUsers"

    def __str__(self):
        return self.username
    
    def is_online(self):
        return timezone.now() < (self.latest_activity + timedelta(minutes=5))
    
    def get_image_profile_url(self):
        if not self.image_profile:
            return settings.MEDIA_URL + 'default_profile_image.jpg'
        return self.image_profile.url


class Game(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='games', null=True, blank=True)
    player1 = models.CharField(max_length=50)
    player2 = models.CharField(max_length=50)
    score = models.CharField(max_length=50)
    game_type = models.CharField(max_length=50)
    result = models.CharField(max_length=50)
    date = models.CharField(max_length=50)

    def __str__(self):
        return self.player1

    @classmethod
    def create_new_game(self, user_id, player1, player2, score, date, result, game_type):
        print(player1)
        game = self.objects.create(user = CustomUser.objects.get(pk=user_id), 
                player1 = player1, player2 = player2, score = score,
                date = date, result = result, game_type = game_type)
        return game
    
class FriendRequest(models.Model):
    from_user = models.ForeignKey(CustomUser, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(CustomUser, related_name='received_requests', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('from_user', 'to_user')
    
    def __str__(self):
        return f"{self.from_user.username} -> {self.to_user.username}"

