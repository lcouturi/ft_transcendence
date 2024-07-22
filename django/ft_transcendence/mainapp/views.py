from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from mainapp.models import CustomUser, FriendRequest, Game
from django import forms
from django.core import serializers
from django.contrib.auth.decorators import login_required
import json
from datetime import datetime
from django.utils import timezone
from .friend_request import *

# Create your views here.
def index(request):
    friends = None
    friend_requests = None
    friend_requesters = None

    if request.user.is_authenticated:
        request.user.latest_activity = timezone.now()
        friends = request.user.friends_list.all()
        friend_requests = request.user.friends_requests.all()
        friend_requesters = request.user.friend_requesters.all()
        request.user.save()
        
    return render(request, "index.html", {
        "user":request.user,
        "friends": friends,
        "friend_requests":friend_requests,
        "friend_requesters":friend_requesters
    })

# ------------- FRIEND REQUEST VIEWS ----------------

@login_required
def accept_friend_request_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        friend_to_add = data.get('friend_to_add')
        try:
            friend = CustomUser.objects.get(username=friend_to_add)
            accept_friend_request(friend, request.user)
        except:
            pass

    return redirect(reverse("accueil"))

@login_required
def request_friend(request):
    if request.method == 'POST':
        friend_to_add = request.POST['friend_to_add']

        if friend_to_add == request.user.username:
            return JsonResponse({'error': "self_adding"})
        
        try:
            request.user.friends_list.get(username=friend_to_add)
            return JsonResponse({'error': "already_friend"})
        except:
            pass

        try:
            friend = CustomUser.objects.get(username=friend_to_add)
        except:
            return JsonResponse({'error': "no_user_match"})

        if send_friend_request(request.user, friend):
            return JsonResponse({'message': "friend sucessfully added", 'profile_image': friend.get_image_profile_url()})
        else:
            return JsonResponse({'error': "friend_request_already_sent"})


    return JsonResponse({'error': "no_user_match"})

@login_required
def delete_friend_request(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        friend_to_del = data.get('friend_to_delete')

        try:
            friend = CustomUser.objects.get(username=friend_to_del)
            deleted = reject_friend_request(friend, request.user)
            if deleted:
                return JsonResponse({'message': "friend request deleted"})
        except:
            pass

        try:
            friend = CustomUser.objects.get(username=friend_to_del)
            deleted = reject_friend_request(request.user, friend)
            if deleted:
                return JsonResponse({'message': "friend request deleted"})
        except:
            pass      

    return JsonResponse({'error': "friend_request_not_exist"})
# ------------------ GAME ------------------------

@login_required
def save_game(request):
    if request.method == 'SAVE_GAME':
        data = json.loads(request.body)
        p1 = data.get('player1')
        user = CustomUser.objects.filter(username=p1)
        if not user.exists():
            return JsonResponse({'error': "user_not_found"})
        user = user.first()
        p2 = data.get('player2')
        score = data.get('score')
        date = data.get('date')
        game_type = data.get('game_type')
        result = data.get('result')
        new_game = Game.create_new_game(user_id = user.id, player1 = p1, player2 = p2, score = score, date = date, result = result , game_type = game_type)
        new_game.save()
        all_games = serializers.serialize('json', user.games.all())
        return (HttpResponse(all_games, content_type="application/json"))

    return redirect(reverse("accueil"))

@login_required
def get_games(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = CustomUser.objects.filter(username=data.get('username'))
        if not user.exists(): 
            return JsonResponse({'error': "user_not_found"}) 
        user = user.first()
        all_games = serializers.serialize('json', user.games.all())
        return (HttpResponse(all_games, content_type="application/json"))

    return redirect(reverse("accueil"))


####################################################

@login_required
def delete_friend(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        friendname = data.get('friend_to_delete')
        try:
            friend = CustomUser.objects.get(username=friendname)
            request.user.friends_list.remove(friend)
        except:
            pass
    return redirect(reverse("accueil"))


class ImageForm(forms.Form):
    imageFile = forms.ImageField()
    

@login_required 
def upload_image(request):
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            image_file = form.cleaned_data['imageFile']
            request.user.image_profile = image_file
            request.user.save()
    return redirect(reverse("accueil"))

def login_check(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        if not CustomUser.objects.filter(username=username).exists():
            return JsonResponse({'error': "no_user_match"})
        
        user = authenticate(request, username=username, password=password)
        if user is None:
            return JsonResponse({'error': "invalid_password"})

        login(request, user)
        return JsonResponse({'message': "Login sucessful !"})
    else:
        return redirect(reverse("accueil"))
    
def logout_check(request):
    logout(request)
    return redirect(reverse("accueil"))

def register_check(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if username == '':
            return JsonResponse({'error': "no_username"})
        elif username == 'Guest' or username == 'Invité' or username == 'Гість':
            return JsonResponse({'error': "forbidden_username"})
        elif password == '':
            return JsonResponse({'error': "no_pass"})
        elif CustomUser.objects.filter(username=username).exists():
            return JsonResponse({'error': "username_exist"})
        elif password != confirm_password:
            return JsonResponse({'error': "password_not_identic"})
        elif len(password) < 5:
            return JsonResponse({'error': "password_too_short"})

        new_user = CustomUser.objects.create_user(username=username, password=password)
        new_user.save()
        login(request, new_user)
        return JsonResponse({'message': "login sucessful !"})
    return redirect(reverse("accueil"))

@login_required 
def delete_account(request):
    if request.method == "POST":
        user = request.user
        user.delete()
        print("account deleted !" + user.username)
    return redirect(reverse("accueil"))

@login_required
def change_username(request):
    if request.method == "POST":
        data = json.loads(request.body)
        new_name = data.get("newname")
        
        if CustomUser.objects.filter(username=new_name).exists():
            return JsonResponse({'error': "username_exist"})
        
        request.user.username = new_name
        request.user.save()
        print("changing name to " + new_name)
        return JsonResponse({'message': "Username changed !"})
    return redirect(reverse("accueil"))

@login_required
def change_password(request):
    if request.method == "POST":
        password = request.POST['password']
        new_password = request.POST['newpassword']
        new_password2 = request.POST['newpassword2']
        
        if request.user.check_password(password) == False:
            return JsonResponse({'error': "current_password_not_identic"})
        elif new_password != new_password2:
            return JsonResponse({'error': "password_not_identic"})
        elif len(new_password) < 5:
            return JsonResponse({'error': "password_too_short"})
        
        user = request.user
        user.set_password(new_password)
        user.save()
        return JsonResponse({'message': "Password sucessfully changed"})
    return JsonResponse({'error': "cannot_change_password"})
