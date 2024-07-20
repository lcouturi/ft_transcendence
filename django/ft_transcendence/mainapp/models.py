from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import os
from django.conf import settings
from datetime import datetime, timedelta

# Create your models here.

class Game(models.Model):
    player1 = models.CharField(max_length=50)
    player2 = models.CharField(max_length=50)
    p1_score = models.IntegerField()
    p2_score = models.IntegerField()
    date = models.CharField(max_length=50)

    def __str__(self):
        return self.player1

    def create_game(self, player1, player2, p1_score, p2_score, date):
        game = self.create(player1 = player1, player2 = player2, p1_score = p1_score,
                p2_score = p2_score, date = date)
        return game

class CustomUser(AbstractUser):
    image_profile = models.ImageField(upload_to='images/',default='default_profile_image.jpg', null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    friends_list = models.ManyToManyField('self')
    friends_requests = models.ManyToManyField('self', through='FriendRequest',symmetrical=False, related_name='friend_requesters',)
    latest_activity = models.DateTimeField(default=timezone.now)
    game_list = models.ForeignKey(Game, on_delete=models.CASCADE, blank=True, null=True)

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
    
class FriendRequest(models.Model):
    from_user = models.ForeignKey(CustomUser, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(CustomUser, related_name='received_requests', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('from_user', 'to_user')
    
    def __str__(self):
        return f"{self.from_user.username} -> {self.to_user.username}"

