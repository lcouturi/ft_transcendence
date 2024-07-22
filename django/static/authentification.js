// Messages d'erreurs d'authentification et login possibles
// le back end renvoi le code d'erreur ex : password_too_short
import
{
    banner_open,
    h,
} from "./ft_transcendence.js";

let langs = {
    'french' : {
		'forbidden_username': "Nom d'utilisateur interdit.",
        'no_username': "Aucun nom d’utilisateur fourni.",
        'no_pass' : "Aucun password fourni.",
        'password_not_identic' : "Vos mots de passes ne correspondent pas.",
        'password_too_short' : "Votre mot de passe doit être au moins de 5 charactères.",
        'username_exist' : "Ce nom d'utillisateur existe déja.",
        
        'no_user_match' : "Ce nom d'utilisateur n'existe pas.",
        'invalid_password' : "Mot de passe incorrect."
    },
    'english' : {
		'forbidden_username': "Forbidden username.",
        'no_username': "No username provided.",
        'no_pass' : "No password provided.",
        'password_not_identic' : "Passwords do not match.",
        'password_too_short' : "Your password must be at least 5 characters.",
        'username_exist' : "This username already exists.",
        
        'no_user_match' : "This user does not exist.",
        'invalid_password' : "Invalid password."
    },
    'ukrainian' : {
		'forbidden_username': "Заборонене ім'я користувача.",
        'no_username': "Ім'я користувача не вказано.",
        'no_pass' : "Пароль не надано.",
        'password_not_identic' : "Паролі не збігаються.",
        'password_too_short' : "Ваш пароль має бути не менше 5 символів.",
        'username_exist' : "Це ім'я користувача вже існує.",
        
        'no_user_match' : "Цей користувач не існує.",
        'invalid_password' : "Недійсний пароль."
    }
};

// ------------ Fetch calls ---------------
// register
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.querySelector("#register-name").value;
    const password = document.querySelector("#register-pass").value;
    const password2 = document.querySelector("#register-pass2").value;
    
    // pas besoin d'envoyer la requête dans ces cas
    if (username == ""){
        banner_open(langs[h.language]['no_username'], "#register-banner");
        return;
    } else if (password == '' || password2 == ''){
        banner_open(langs[h.language]['no_pass'], "#register-banner");
        return;
    } else if (password != password2){
        banner_open(langs[h.language]['password_not_identic'], "#register-banner");
        return;
    }
    
    var formData = new FormData(this);
    fetch("register_check", {method: 'POST', body: formData,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': '{% csrf_token %}'
    }
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        banner_open(langs[h.language][data.error], "#register-banner");
    } else {
        window.location.href = "";
    }
}).catch(error => {console.error('Error:', error);});
});

// login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.querySelector("#login-name").value;
    const password = document.querySelector("#login-pass").value;
    
    // pas besoin d'envoyer la requête dans ces cas
    if (username == ""){
        console.log("username vide")
        banner_open(langs[h.language]['no_username'], "#login-banner");
        return;
    } else if (password == ''){
        banner_open(langs[h.language]['no_pass'], "#login-banner");
        return;
    }
    
    var formData = new FormData(this);
    fetch("login_check", {method: 'POST', body: formData,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': '{% csrf_token %}'
    }
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        banner_open(langs[h.language][data.error], "#login-banner");
    } else {
        window.location.href = "";
    }
}).catch(error => {console.error('Error:', error);});
});

// ---------------------------------------
