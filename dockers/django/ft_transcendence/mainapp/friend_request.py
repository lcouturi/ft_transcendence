from django.utils import timezone
from mainapp.models import CustomUser,FriendRequest

def send_friend_request(user1, user2):
    if not (FriendRequest.objects.filter(from_user=user1, to_user=user2).exists()) and not (FriendRequest.objects.filter(from_user=user2, to_user=user1).exists()):
        friend_request = FriendRequest(from_user=user1, to_user=user2, timestamp=timezone.now())
        friend_request.save()
        print("friend request sent from :" + user1.username + " to " + user2.username)
        return True
    return False

def accept_friend_request(user1, user2):
    try:
        friend_request = FriendRequest.objects.get(from_user=user1, to_user=user2)
        user1.friends_list.add(user2)
        user2.friends_list.add(user1)
        friend_request.delete()
    except FriendRequest.DoesNotExist:
        pass
    
def reject_friend_request(user1, user2):
    try:
        friend_request = FriendRequest.objects.get(from_user=user1, to_user=user2)
        friend_request.delete()
        return True
    except FriendRequest.DoesNotExist:
        return False
