from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from mainapp.models import CustomUser

# Create your views here.
def index(request):
    return render(request, "ft_transcendence.html", {
        "user":request.user
    })

def login_check(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect(reverse("accueil"))
            #return JsonResponse({'username': user.get_username()})
        else:
            return JsonResponse({'error': "Login or password incorrect"})
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

        if CustomUser.objects.filter(username=username).exists():
                return JsonResponse({'error': "User name already exists !"})
        else:
            if password != confirm_password:
                return JsonResponse({'error': "Passwords are not the same !"})

            new_user = CustomUser.objects.create_user(username=username, password=password)
            new_user.save()
            login(request, new_user)
            return JsonResponse({'sucess': "login sucessfull !"})
    else:
        form = UserCreationForm()
    return HttpResponse("vue de registration")