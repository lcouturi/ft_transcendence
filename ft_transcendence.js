import
{
	loadSavedParameters,
	saveParameter
}
from './frontend/game/gui.js';

import
{
	g
}
from './frontend/game/globals.js';

let	in_tournament = false;
let	contestant1 = "Guest";
let	contestant2 = "Guest";
let	friends_array = [];
let	language = "english";
let	losses = 0;
let	paused = false;
let	tournament_array = [];
let	username = null;
let	winners = [];
let	wins = 0;

window.onload = function()
{
	start_match();
};

document.querySelector("#about").addEventListener("hidden.bs.modal", function(e)
{
	e.preventDefault();
	unpause();
});

document.querySelector("#about").addEventListener("shown.bs.modal", function(e)
{
	e.preventDefault();
	pause();
});

document.querySelector("#contestant1-victory").addEventListener("click", function(e)
{
	e.preventDefault();
	result(1);
});

document.querySelector("#contestant2-victory").addEventListener("click", function(e)
{
	e.preventDefault();
	result(2);
});

document.querySelector("#english").addEventListener("change", function(e)
{
	e.preventDefault();
	language = "english";
	document.querySelector("#about-button").title = "About";
	document.querySelector("#about-close").innerHTML = "Close";
	document.querySelector("#about-label").innerHTML = "About";
	document.querySelector("#about-tab").innerHTML = "About";
	document.querySelector("#about-tab-pane").innerHTML = `
	div class="d-flex">
		<img class="inline-img" src="img/openart-image_yBIl3nIg_1717776713014_raw.jpg">
	</div>
	<br>
	On February 30th 2024, something happened that would forever change the course of history. Tired of being treated as little more than food, the avocados waged war against the animal kingdom as a whole.
	<br>
	<br>
	At first, the war went well for the avocados and they made short work of the weak human forces. With the humans out of the picture, the avocados thought they had won the war.
	<br>
	<br>
	They were wrong.
	<br>
	<br>
	They were not prepared for the onslaught from the pangolins. The pangolins were ruthless. The avocados found themselves evenly matched.
	<br>
	<br>
	This website exists to serve as an accurate retelling of the Great Avocado War of '24. As for who won the war? You will have to play to find out.`;
	document.querySelector("#about-title").innerHTML = "The Great Avocado War of '24";
	document.querySelector("#authors-tab").innerHTML = "Authors";
	document.querySelector("#authors-tab-pane").innerHTML = `
	<b>
		Bruno Pierre Bouchard
	</b>
	<br>
	<i>
		Database
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit contributor's homepage&#013;https://github.com/Nyonyx" type="button">
		<a href="https://github.com/Nyonyx" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Félix Barrette
	</b>
	<br>
	<i>
		Backend
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit contributor's homepage&#013;https://github.com/ShroomySquid" type="button">
		<a href="https://github.com/ShroomySquid" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		George Zhukov
	</b>
	<br>
	<i>
		Game
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit contributor's homepage&#013;https://github.com/joeroeg" type="button">
		<a href="https://github.com/joeroeg" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Léopold Couturier-Otis
	</b>
	<br>
	<i>
		Interface
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit contributor's homepage&#013;https://github.com/lcouturi" type="button">
		<a href="https://github.com/lcouturi" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Pierre Olivier Paquet
	</b>
	<br>
	<i>
		MIA
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit contributor's homepage&#013;https://github.com/pierreolivierpaquet" type="button">
		<a href="https://github.com/pierreolivierpaquet" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#avatar-button").title = "Open file dialog";
	document.querySelector("#components-tab").innerHTML = "Components";
	document.querySelector("#components-tab-pane").innerHTML = `
	<b>
		Bootstrap
	</b>
	<br>
	<i>
		Version 5.3.3
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit component's homepage&#013;https://getbootstrap.com" type="button">
		<a href="https://getbootstrap.com" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Django
	</b>
	<br>
	<i>
		Version 5.0.6
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit component's homepage&#013;https://www.djangoproject.com" type="button">
		<a href="https://www.djangoproject.com" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		PostgreSQL
	</b>
	<br>
	<i>
		Version 16.3
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit component's homepage&#013;https://www.postgresql.org" type="button">
		<a href="https://www.postgresql.org" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Three.js
	</b>
	<br>
	<i>
		Version r165
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visit component's homepage&#013;https://threejs.org" type="button">
		<a href="https://threejs.org" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#language-button").title = "Language";
	document.querySelector("#language-label").innerHTML = "Language";
	document.querySelector("#login-button").title = "Log in";
	document.querySelector("#login-close-label").innerHTML = "Cancel";
	document.querySelector("#login-label").innerHTML = "Log in";
	document.querySelector("#login-name-label").innerHTML = "Username:";
	document.querySelector("#login-pass-label").innerHTML = "Password:";
	document.querySelector("#login-title").innerHTML = "Log in";
	document.querySelector("#play").title = "Play";
	document.querySelector("#play-label").innerHTML = "Play";
	document.querySelector("#profile-delete-label").innerHTML = "Delete Account";
	document.querySelector("#profile-friends").innerHTML = "Manage Friends";
	document.querySelector("#profile-friends-count").innerHTML = "Friends: " + friends_array.length;
	document.querySelector("#profile-friends-name").innerHTML = "Friends";
	document.querySelector("#profile-history").innerHTML = "Match History";
	document.querySelector("#profile-history-name").innerHTML = "Historique des matchs";
	document.querySelector("#profile-history-opponent").innerHTML = "Opponent";
	document.querySelector("#profile-history-result").innerHTML = "Result";
	document.querySelector("#profile-history-time").innerHTML = "Time";
	document.querySelector("#profile-list-item").placeholder = "Enter username";
	document.querySelector("#profile-logout-label").innerHTML = "Log out";
	document.querySelector("#profile-losses").innerHTML = losses + " Losses";
	document.querySelector("#profile-wins").innerHTML = wins + " Wins";
	document.querySelector("#register-button-label").innerHTML = "Register";
	document.querySelector("#register-close").innerHTML = "Cancel";
	document.querySelector("#register-name-label").innerHTML = "Username:";
	document.querySelector("#register-pass-label").innerHTML = "Password:";
	document.querySelector("#register-pass2-label").innerHTML = "Confirm Password:";
	document.querySelector("#register-title").innerHTML = "Register";
	document.querySelector("#results-title").innerHTML = "Results";
	document.querySelector("#tournament-button").title = "Tournament";
	document.querySelector("#tournament-close").innerHTML = "Close";
	document.querySelector("#tournament-label").innerHTML = "Tournament";
	document.querySelector("#tournament-list-item").placeholder = "Enter username";
	document.querySelector("#tournament-start-label").innerHTML = "Tournament Start";
	document.querySelector("#tournament-start-match-label").innerHTML = "Next Match";
	document.querySelector("#tournament-title").innerHTML = "Tournament";
	document.title = "The Great Avocado War of '24";
	if (contestant1 == "Invité")
		contestant1 = "Guest";
	if (contestant2 == "Invité")
		contestant2 = "Guest";
	document.querySelector("#contestant1").innerHTML = contestant1;
	document.querySelector("#contestant2").innerHTML = contestant2;
	if (g.isSinglePlayer == false)
	{
		document.querySelector("#contestant1").innerHTML += " Team";
		document.querySelector("#contestant2").innerHTML += " Team";
	}
});

document.querySelector("#french").addEventListener("change", function(e)
{
	e.preventDefault();
	language = "french";
	document.querySelector("#about-button").title = "À propos";
	document.querySelector("#about-close").innerHTML = "Fermer";
	document.querySelector("#about-label").innerHTML = "À propos";
	document.querySelector("#about-tab").innerHTML = "À propos";
	document.querySelector("#about-tab-pane").innerHTML = `
	<div class="d-flex">
		<img class="inline-img" src="img/openart-image_yBIl3nIg_1717776713014_raw.jpg">
	</div>
	<br>
	Le 30 février 2024, quelque chose c’est produit qui a de façon permanente changé le cours de l’histoire. Épuisés d’être traités comme rien de plus que de la nourriture, les avocats ont déclaré la guerre contre l’entièreté du royaume des animaux.
	<br>
	<br>
	Au début, la guerre se déroulait bien pour les avocats et ils ont pu rapidement éliminer les faibles forces humaines. Avec les humains hors combat, les avocats crurent qu’ils avaient gagné la guerre.
	<br>
	<br>
	Ils avaient tort.
	<br>
	<br>
	Ils n’étaient pas préparés pour l’assaut des pangolins. Ils étaient sans pitié. Les avocats se reprouvèrent sur un pied d’égalité avec les pangolins.
	<br>
	<br>
	Ce site internet existe pour chroniquer de façon précise les évènements de la Grande guerre des avocats de 2024. Et pour ce qui est du vainqueur? Il vous faudra jouer pour le découvrir.`;
	document.querySelector("#about-title").innerHTML = "La grande guerre des avocats de 2024";
	document.querySelector("#authors-tab").innerHTML = "Auteurs";
	document.querySelector("#authors-tab-pane").innerHTML = `
	<b>
		Bruno Pierre Bouchard
	</b>
	<br>
	<i>
		Base de données
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du contributeur&#013;https://github.com/Nyonyx" type="button">
		<a href="https://github.com/Nyonyx" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Félix Barrette
	</b>
	<br>
	<i>
		Backend
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du contributeur&#013;https://github.com/ShroomySquid" type="button">
		<a href="https://github.com/ShroomySquid" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		George Zhukov
	</b>
	<br>
	<i>
		Jeu
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du contributeur&#013;https://github.com/joeroeg" type="button">
		<a href="https://github.com/joeroeg" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Léopold Couturier-Otis
	</b>
	<br>
	<i>
		Interface
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du contributeur&#013;https://github.com/lcouturi" type="button">
		<a href="https://github.com/lcouturi" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Pierre Olivier Paquet
	</b>
	<br>
	<i>
		MIA
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du contributeur&#013;https://github.com/pierreolivierpaquet" type="button">
		<a href="https://github.com/pierreolivierpaquet" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#avatar-button").title = "Ouvrir le sélecteur de fichiers";
	document.querySelector("#components-tab").innerHTML = "Composants";
	document.querySelector("#components-tab-pane").innerHTML = `
	<b>
		Bootstrap
	</b>
	<br>
	<i>
		Version 5.3.3
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du composant&#013;https://getbootstrap.com" type="button">
		<a href="https://getbootstrap.com" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Django
	</b>
	<br>
	<i>
		Version 5.0.6
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du composant&#013;https://www.djangoproject.com" type="button">
		<a href="https://www.djangoproject.com" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		PostgreSQL
	</b>
	<br>
	<i>
		Version 16.3
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du composant&#013;https://www.postgresql.org" type="button">
		<a href="https://www.postgresql.org" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>
	<b>
		Three.js
	</b>
	<br>
	<i>
		Version r165
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Visiter la page d'accueil du composant&#013;https://threejs.org" type="button">
		<a href="https://threejs.org" target="_blank">
			<img class="m-1" height="22" src="img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#language-button").title = "Langue";
	document.querySelector("#language-label").innerHTML = "Langue";
	document.querySelector("#login-button").title = "Connexion";
	document.querySelector("#login-close-label").innerHTML = "Annuler";
	document.querySelector("#login-label").innerHTML = "Connexion";
	document.querySelector("#login-name-label").innerHTML = "Nom d’utilisateur:";
	document.querySelector("#login-pass-label").innerHTML = "Mot de passe:";
	document.querySelector("#login-title").innerHTML = "Connexion";
	document.querySelector("#play").title = "Jouer";
	document.querySelector("#play-label").innerHTML = "Jouer";
	document.querySelector("#profile-delete-label").innerHTML = "Supprimer le compte";
	document.querySelector("#profile-friends").innerHTML = "Gérer les amis";
	document.querySelector("#profile-friends-count").innerHTML = "Amis: " + friends_array.length;
	document.querySelector("#profile-friends-name").innerHTML = "Amis";
	document.querySelector("#profile-history").innerHTML = "Historique des matchs";
	document.querySelector("#profile-history-name").innerHTML = "Historique des matchs";
	document.querySelector("#profile-history-opponent").innerHTML = "Adversaire";
	document.querySelector("#profile-history-result").innerHTML = "Résultat";
	document.querySelector("#profile-history-time").innerHTML = "Temps";
	document.querySelector("#profile-list-item").placeholder = "Entrez le nom d’utilisateur";
	document.querySelector("#profile-logout-label").innerHTML = "Déconnexion";
	document.querySelector("#profile-losses").innerHTML = losses + " défaites";
	document.querySelector("#profile-wins").innerHTML = wins + " victoires";
	document.querySelector("#register-button-label").innerHTML = "Inscription";
	document.querySelector("#register-close").innerHTML = "Annuler";
	document.querySelector("#register-name-label").innerHTML = "Nom d’utilisateur:";
	document.querySelector("#register-pass-label").innerHTML = "Mot de passe:";
	document.querySelector("#register-pass2-label").innerHTML = "Confirmez le mot de passe:";
	document.querySelector("#register-title").innerHTML = "Inscription";
	document.querySelector("#results-title").innerHTML = "Résultats";
	document.querySelector("#tournament-button").title = "Tournoi";
	document.querySelector("#tournament-close").innerHTML = "Fermer";
	document.querySelector("#tournament-label").innerHTML = "Tournoi";
	document.querySelector("#tournament-list-item").placeholder = "Entrez le nom d’utilisateur";
	document.querySelector("#tournament-start-label").innerHTML = "Commencer le tournoi";
	document.querySelector("#tournament-start-match-label").innerHTML = "Match suivant";
	document.querySelector("#tournament-title").innerHTML = "Tournoi";
	document.title = "La grande guerre des avocats de 2024";
	if (contestant1 == "Guest")
		contestant1 = "Invité";
	if (contestant2 == "Guest")
		contestant2 = "Invité";
	document.querySelector("#contestant1").innerHTML = contestant1;
	document.querySelector("#contestant2").innerHTML = contestant2;
	if (g.isSinglePlayer == false)
	{
		document.querySelector("#contestant1").innerHTML = "Équipe " + contestant1;
		document.querySelector("#contestant2").innerHTML = "Équipe " + contestant2;
	}
});

document.querySelector("#login").addEventListener("hidden.bs.modal", function(e)
{
	e.preventDefault();
	unpause();
});

document.querySelector("#login").addEventListener("shown.bs.modal", function(e)
{
	e.preventDefault();
	pause();
});

document.querySelector("#login-banner-close").addEventListener("click", function(e)
{
	e.preventDefault();
	banner_close('#login-banner');
});

document.querySelector("#login-ok").addEventListener("click", function(e)
{
	e.preventDefault();
	login_validate();
});

document.querySelector("#pause").addEventListener("click", function(e)
{
	e.preventDefault();
	paused = true;
	pause();
	this.classList.remove("d-flex");
	this.classList.add("d-none");
	document.querySelector("#play").classList.remove("d-none");
	document.querySelector("#play").classList.add("d-flex");
});

document.querySelector("#play").addEventListener("click", function(e)
{
	e.preventDefault();
	paused = false;
	unpause();
	this.classList.remove("d-flex");
	this.classList.add("d-none");
	document.querySelector("#pause").classList.remove("d-none");
	document.querySelector("#pause").classList.add("d-flex");
});

document.querySelector("#profile-banner-close").addEventListener("click", function(e)
{
	e.preventDefault();
	banner_close('#profile-banner');
});

document.querySelector("#profile-delete").addEventListener("click", function(e)
{
	e.preventDefault();
	profile_logout();
});

document.querySelector("#profile-list-add").addEventListener("click", function(e)
{
	e.preventDefault();
	add_item("profile", null);
	if (language == "english")
		document.querySelector("#profile-friends-count").innerHTML = "Friends: " + friends_array.length;
	else if (language == "french")
		document.querySelector("#profile-friends-count").innerHTML = "Amis: " + friends_array.length;
});

document.querySelector("#profile-logout").addEventListener("click", function(e)
{
	e.preventDefault();
	profile_logout();
});

document.querySelector("#profile-name-edit").addEventListener("click", function(e)
{
	e.preventDefault();
	document.querySelector("#profile-name-container").classList.remove("position-relative");
	document.querySelector("#profile-name-inside").classList.add("d-none");
	document.querySelector("#profile-name-input").value = username;
	document.querySelector("#profile-name-input-container").classList.remove("d-none");
});

document.querySelector("#profile-name-input-button").addEventListener("click", function(e)
{
	e.preventDefault();
	if (document.querySelector("#profile-name-input").value == "")
		return ;
	document.querySelector("#profile-name-inside").innerHTML = document.querySelector("#profile-name-input").value;
	if (contestant1 == username)
	{
		contestant1 = document.querySelector("#profile-name-input").value;
		document.querySelector("#contestant1").innerHTML = contestant1;
	}
	if (contestant2 == username)
	{
		contestant2 = document.querySelector("#profile-name-input").value;
		document.querySelector("#contestant2").innerHTML = contestant2;
	}
	username = document.querySelector("#profile-name-input").value;
	document.querySelector("#profile-name-container").classList.add("position-relative");
	document.querySelector("#profile-name-inside").classList.remove("d-none");
	document.querySelector("#profile-name-input-container").classList.add("d-none");
});

document.querySelector("#register").addEventListener("hidden.bs.modal", function(e)
{
	e.preventDefault();
	unpause();
});

document.querySelector("#register").addEventListener("shown.bs.modal", function(e)
{
	e.preventDefault();
	pause();
});

document.querySelector("#register-banner-close").addEventListener("click", function(e)
{
	e.preventDefault();
	banner_close('#register-banner');
});

document.querySelector("#register-button").addEventListener("click", function(e)
{
	e.preventDefault();
	register_open();
});

document.querySelector("#register-ok").addEventListener("click", function(e)
{
	e.preventDefault();
	register_validate();
});

document.querySelector("#results").addEventListener("hidden.bs.modal", function(e)
{
	e.preventDefault();
	unpause();
});

document.querySelector("#results").addEventListener("shown.bs.modal", function(e)
{
	e.preventDefault();
	pause();
});

document.querySelector("#tournament").addEventListener("hidden.bs.modal", function(e)
{
	e.preventDefault();
	unpause();
});

document.querySelector("#tournament").addEventListener("shown.bs.modal", function(e)
{
	e.preventDefault();
	pause();
});

document.querySelector("#tournament-banner-close").addEventListener("click", function(e)
{
	e.preventDefault();
	banner_close('#tournament-banner');
});

document.querySelector("#tournament-button").addEventListener("click", function(e)
{
	e.preventDefault();
	tournament_open();
});

document.querySelector("#tournament-list-add").addEventListener("click", function(e)
{
	e.preventDefault();
	add_item("tournament", null);
});

document.querySelector("#tournament-start").addEventListener("click", function(e)
{
	e.preventDefault();
	tournament_start();
});

document.querySelector("#tournament-start-match").addEventListener("click", function(e)
{
	e.preventDefault();
	start_match();
});

document.getElementById('avatar').onchange = function ()
{
	var	reader = new FileReader();

	reader.onload = function (e)
	{
		document.querySelector("#profile-avatar").src = e.target.result;
		document.querySelector("#profile-avatar-mini").src = e.target.result;
		if (contestant1 == username)
			document.querySelector("#contestant1-avatar").src = e.target.result;;
		if (contestant2 == username)
			document.querySelector("#contestant2-avatar").src = e.target.result;;
	};
	reader.readAsDataURL(this.files[0]);
	document.querySelector("#avatar-name").value = this.files[0].name;
};

function	add_item(prefix, value)
{
	let	array;
	let	item;

	if (prefix == "tournament")
		array = tournament_array;
	else
		array = friends_array;
	if (value == null)
		item = document.querySelector("#" + prefix + "-list-item").value;
	else
		item = value;
	if (prefix == "profile" && item == username)
	{
		if (language == "english")
			banner_open("Cannot add self to friends list.", "#profile-banner");
		else if (language == "french")
			banner_open("Vous ne pouvez pas vous rajouter à votre liste d’amis.", "#profile-banner");
		return ;
	}
	else if (item == "")
	{
		if (language == "english")
			banner_open("Cannot add user: empty input.", "#" + prefix + "-banner");
		else if (language == "french")
			banner_open("La boite de texte est vide.", "#" + prefix + "-banner");
		return ;
	}
	else if (array.indexOf(item) != -1)
	{
		if (language == "english")
			banner_open("Cannot add user: already in list.", "#" + prefix + "-banner");
		else if (language == "french")
			banner_open("L’utilisateur est déjà dans la liste.", "#" + prefix + "-banner");
		return ;
	}
	banner_close("#" + prefix + "-banner");
	const	div = document.createElement("div");
	let	divContainer = `
	<div class="d-flex" style="min-width: min-content;">`
	if (prefix == "profile")
	{
		divContainer += `
		<img class="mx-1 my-auto" height="22" src="img/22/im-user-away.svg" title="Away">`
	}
	divContainer += `
		<div class="m-1 p-1 w-100" style="min-width: min-content;">
			${sanitize(item)}
		</div>
		<button class="border button d-flex delete m-1 rounded shadow-sm">
			<img class="icon m-1" height="22" src="img/22/list-remove.svg">
		</button>
	</div>`;
	div.style.minWidth = "min-content";
	div.innerHTML = divContainer;
	div.querySelector(".delete").addEventListener("click", (e) =>
	{
		array.splice(array.indexOf(e.currentTarget.closest("div").innerText), 1);
		e.currentTarget.closest("div").remove();
		if (language == "english")
			document.querySelector("#profile-friends-count").innerHTML = "Friends: " + friends_array.length;
		else if (language == "french")
			document.querySelector("#profile-friends-count").innerHTML = "Amis: " + friends_array.length;
	});
	document.querySelector("#" + prefix + "-list").appendChild(div);
	array.push(item);
	document.querySelector("#" + prefix + "-list-item").value = "";
	if (prefix == "tournament")
		tournament_array = array;
	else
		friends_array = array;
}

function	banner_close(id)
{
	document.querySelector(id + "-text").innerHTML = "";
	document.querySelector(id).classList.add("p-0", "overflow-hidden");
	document.querySelector(id).classList.remove("p-1");
	document.querySelector(id).style.maxHeight = "0";
}

function	banner_open(value, id)
{
	document.querySelector(id).classList.add("p-1");
	document.querySelector(id).classList.remove("overflow-hidden", "p-0");
	document.querySelector(id + "-text").innerHTML = value;
	document.querySelector(id).style.maxHeight = "500px";
}

function	login_complete()
{
	document.querySelector("#login-button").classList.add("d-none");
	document.querySelector("#login-button").classList.remove("d-flex");
	document.querySelector("#profile-name").innerHTML = username;
	document.querySelector("#profile-name-inside").innerHTML = username;
	document.querySelector("#profile-button").classList.remove("d-none");
	if (in_tournament == false)
	{
		prepare_next_match();
		start_match();
	}
}

function	login_validate()
{
	if (document.querySelector("#login-name").value == "")
	{
		if (language == "english")
			banner_open("No username provided.", "#login-banner");
		else if (language == "french")
			banner_open("Aucun nom d’utilisateur fourni.", "#login-banner");
		return ;
	}
	else if (document.querySelector("#login-pass").value == "")
	{
		if (language == "english")
			banner_open("No password provided.", "#login-banner");
		else if (language == "french")
			banner_open("Aucun mot de pass fourni.", "#login-banner");
		return ;
	}
	bootstrap.Modal.getInstance(document.getElementById("login")).hide();
	username = sanitize(document.querySelector("#login-name").value);
	document.querySelector("#login-name").value = "";
	document.querySelector("#login-pass").value = "";
	login_complete();
}

function	pause()
{
	g.aiPaddleSpeed = 0;
	g.ballSpeed = 0;
	g.orbitSpeed = 0;
	g.paddleSpeed = 0;
	g.Player2PaddleSpeed = 0;
	g.Player3PaddleSpeed = 0;
	g.Player4PaddleSpeed = 0;
	g.starsSpeed = 0;
}

function	prepare_next_match()
{
	if (in_tournament == true)
	{
		if (tournament_array.length == 0)
		{
			tournament_array = [...winners];
			winners = [];
		}
		contestant1 = tournament_array[Math.floor(Math.random()*tournament_array.length)];
		tournament_array.splice(tournament_array.indexOf(contestant1), 1);
		if (tournament_array.length == 0)
		{
			tournament_array = [...winners];
			winners = [];
		}
		contestant2 = tournament_array[Math.floor(Math.random()*tournament_array.length)];
		tournament_array.splice(tournament_array.indexOf(contestant2), 1);
		document.querySelector("#next-match").innerHTML = "The next match will be between " + contestant1 + " and " + contestant2 + ".";
	}
	else
	{
		if (username != null)
			contestant1 = username;
		else
		{
			if (language == "english")
				contestant1 = "Guest";
			else if (language == "french")
				contestant1 = "Invité";
		}
		if (language == "english")
			contestant2 = "Guest";
		else if (language == "french")
			contestant2 = "Invité";
		document.querySelector("#next-match").innerHTML = "";
	}
}

function	profile_log_add(winner, loser, tournament)
{
	const	date = new Date();
	const	tr = document.createElement("tr");
	let		opponent = "";
	let		result;
	let		score = "";
	let		type;

	if (tournament == true)
	{
		if (language == "english")
		{
			result = "Victory";
			type = "Tournament";
		}
		else if (language == "french")
		{
			result = "Victoire";
			type = "Tournoi";
		}
	}
	else
	{
		type = "Match";
		if (winner == username)
		{
			if (language == "english")
				result = "Victory";
			else if (language == "french")
				result = "Defeat";
			if (g.playerScore < g.aiScore)
				score = g.aiScore + "-" + g.playerScore;
			else
				score = g.playerScore + "-" + g.aiScore;
			opponent = loser;
		}
		else
		{
			if (language == "english")
				result = "Defeat";
			else if (language == "french")
				result = "Défaite";
			if (g.playerScore < g.aiScore)
				score = g.playerScore + "-" + g.aiScore;
			else
				score = g.aiScore + "-" + g.playerScore;
			opponent = winner;
		}
		if (g.isSinglePlayer == false)
		{
			if (language == "english")
				opponent += " Team";
			else if (language == "french")
				opponent = "Équipe " + opponent;
		}
	}
	tr.innerHTML = `
	<th class="text-nowrap" scope="row">
		${date.getFullYear() + "-" + String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')}
	</th>
	<td>
		${result}
	</td>
	<td>
		${type}
	</td>
	<td>
		${score}
	</td>
	<td>
		${opponent}
	</td>`
	document.querySelector("#profile-log").appendChild(tr);
}

function	profile_logout()
{
	document.querySelector("#login-button").classList.add("d-flex");
	document.querySelector("#login-button").classList.remove("d-none");
	document.querySelector("#profile-avatar").src = "img/22/im-user.svg";
	document.querySelector("#profile-button").classList.add("d-none");
	document.querySelector("#profile-log").innerHTML = "";
	document.querySelector("#profile-name").innerHTML = "";
	document.querySelector("#profile-name-inside").innerHTML = "";
	losses = 0;
	wins = 0;
	profile_update(0);
	username = null;
	if (in_tournament == false)
	{
		prepare_next_match();
		start_match()
	}
}

function	profile_update(value)
{
	if (value == -1)
		losses++;
	else if (value == 1)
		wins++;
	if (losses + wins == 0)
	{
		document.querySelector("#profile-bar").max = 2;
		document.querySelector("#profile-bar").value = 1;
	}
	else
	{
		document.querySelector("#profile-bar").max = losses + wins;
		document.querySelector("#profile-bar").value = wins;
	}
	if (language == "english")
	{
		document.querySelector("#profile-losses").innerHTML = losses + " Losses";
		document.querySelector("#profile-wins").innerHTML = wins + " Wins";
	}
	else if (language == "french")
	{
		document.querySelector("#profile-losses").innerHTML = losses + " défaites";
		document.querySelector("#profile-wins").innerHTML = wins + " victoires";
	}
}

function	register_open()
{
	document.querySelector("#avatar-name").value = "";
	document.querySelector("#login-name").value = "";
	document.querySelector("#login-pass").value = "";
	document.querySelector("#register-name").value = "";
	document.querySelector("#register-pass").value = "";
	document.querySelector("#register-pass2").value = "";
	new bootstrap.Modal(document.querySelector("#register")).show();
}

function	register_validate()
{
	if (document.querySelector("#register-name").value == "")
	{
		if (language == "english")
			banner_open("No username provided.", "#register-banner");
		else if (language == "french")
			banner_open("Aucun nom d’utilisateur fourni.", "#register-banner");
		return ;
	}
	else if (document.querySelector("#register-pass").value == "")
	{
		if (language == "english")
			banner_open("No password provided.", "#register-banner");
		else if (language == "french")
			banner_open("Aucun mot de pass fourni.", "#register-banner");
		return ;
	}
	else if (document.querySelector("#register-pass").value != document.querySelector("#register-pass2").value)
	{
		if (language == "english")
			banner_open("Passwords do not match.", "#register-banner");
		else (language == "french")
			banner_open("Vos mots de passes ne correspondent pas.", "#register-banner");
		return ;
	}
	bootstrap.Modal.getInstance(document.getElementById("register")).hide();
	username = sanitize(document.querySelector("#register-name").value);
	document.querySelector("#avatar-name").value = "";
	document.querySelector("#register-name").value = "";
	document.querySelector("#register-pass").value = "";
	document.querySelector("#register-pass2").value = "";
	login_complete();
}

export function	result(value)
{
	let	loser;
	let	winner;

	if (value == 1)
	{
		winner = contestant1;
		loser = contestant2;
	}
	else if (value == 2)
	{
		winner = contestant2;
		loser = contestant1;
	}
	if (in_tournament == true)
		winners.push(winner);
	if (winner == username)
	{
		profile_update(1);
		profile_log_add(winner, loser, false);
	}
	else if (loser == username)
	{
		profile_update(-1);
		profile_log_add(winner, loser, false);
	}
	document.querySelector("#result").innerHTML = winner;
	if (g.isSinglePlayer == false)
	{
		if (language == "english")
			document.querySelector("#result").innerHTML += " Team";
		else if (language == "french")
			document.querySelector("#result").innerHTML = "Équipe " + document.querySelector("#result").innerHTML;
	}
	if (in_tournament == true && tournament_array.length == 0 && winners.length == 1)
	{
		in_tournament = false;
		profile_log_add(null, null, true);
		if (language == "english")
			document.querySelector("#result").innerHTML +=  " won the tournament!";
		else if (language == "french")
			document.querySelector("#result").innerHTML +=  " a gagné le tournoi!";
	}
	else
	{
		if (language == "english")
			document.querySelector("#result").innerHTML += " won the match against ";
		else if (language == "french")
			document.querySelector("#result").innerHTML += " a gagné le match contre ";
		if (g.isSinglePlayer == false && language == "french")
			document.querySelector("#result").innerHTML += "Équipe ";
		document.querySelector("#result").innerHTML += loser;
		if (g.isSinglePlayer == false && language == "english")
			document.querySelector("#result").innerHTML += " Team";
		document.querySelector("#result").innerHTML += "!";
	}
	prepare_next_match();
	new bootstrap.Modal(document.querySelector("#results")).show();
}

function	sanitize(string)
{
	string = string.replace(/&/g, "&amp;").replace(/</g, "&lt;");
	string = string.replace(/\>/g, "&gt;").replace(/"/g, "&quot;");
	string = string.replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
	string = string.replace(/\//g, "&#x2F;").replace(/`/g, "&grave;");
	return (string.replace(/=/g, "&#x3D;"));
}

export function	start_match()
{
	g.aiScore = 0;
	g.playerScore = 0;
	g.bulbLight.position.set(0, 0.2, 0);
	g.paddleMesh.position.set(0, 1.1 / 2, 8);
	if (g.aiPaddleMesh)
		g.aiPaddleMesh.position.set(0, 1.1 / 2, -8);
	if (g.Player2PaddleMesh)
		g.Player2PaddleMesh.position.set(0, 1.1 / 2, -8);
	if (g.Player3PaddleMesh)
		g.Player3PaddleMesh.position.set(0, 1.1 / 2, 4);
	if (g.Player4PaddleMesh)
		g.Player4PaddleMesh.position.set(0, 1.1 / 2, -4);
	g.ballVelocity.set(0, 0, 5);
	update_score();
	document.querySelector("#contestant1").innerHTML = contestant1;
	if (g.isSinglePlayer == false)
	{
		if (language == "english")
			document.querySelector("#contestant1").innerHTML += " Team";
		else if (language == "french")
			document.querySelector("#contestant1").innerHTML = "Équipe " + document.querySelector("#contestant1").innerHTML;
	}
	if (contestant1 == username)
		document.querySelector("#contestant1-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant1-avatar").src = "img/22/im-user.svg";
	document.querySelector("#contestant2").innerHTML = contestant2;
	if (g.isSinglePlayer == false)
	{
		if (language == "english")
			document.querySelector("#contestant2").innerHTML += " Team";
		else if (language == "french")
			document.querySelector("#contestant2").innerHTML = "Équipe " + document.querySelector("#contestant2").innerHTML;
	}
	if (contestant2 == username)
		document.querySelector("#contestant2-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant2-avatar").src = "img/22/im-user.svg";
}

function	tournament_open()
{
	document.querySelector("#tournament-list-item").value = "";
	new bootstrap.Modal(document.querySelector("#tournament")).show();
	if (username != null)
		add_item("tournament", username);
}

function	tournament_start()
{
	if (tournament_array.length <= 1)
	{
		if (language == "english")
			banner_open("Tournament needs at least two users!", "#tournament-banner");
		else if (language == "french")
			banner_open("Le tournoi a besoin d’au moins deux utilisateurs!", "#tournament-banner");
		return ;
	}
	contestant1 = null;
	contestant2 = null;
	in_tournament = true;
	document.querySelector("#tournament-list").innerHTML = "";
	bootstrap.Modal.getInstance(document.getElementById("tournament")).hide();
	winners = [];
	prepare_next_match();
	start_match();
}

function	unpause()
{
	if (paused == false)
	{
		loadSavedParameters();
		if (g.aiPaddleSpeed == 0)
			g.aiPaddleSpeed = 8;
		if (g.ballSpeed == 0)
			g.ballSpeed = 0.016;
		if (g.orbitSpeed == 0)
			g.orbitSpeed = 0.002;
		if (g.paddleSpeed == 0)
			g.paddleSpeed = 8;
		if (g.Player2PaddleSpeed == 0)
			g.Player2PaddleSpeed = 8;
		if (g.Player3PaddleSpeed == 0)
			g.Player3PaddleSpeed = 8;
		if (g.Player4PaddleSpeed == 0)
			g.Player4PaddleSpeed = 8;
		if (g.starsSpeed == 0)
			g.starsSpeed = 0.05;
	}
}

export function	update_score()
{
	document.querySelector("#contestant1-score").innerHTML = ": " + g.playerScore;
	document.querySelector("#contestant2-score").innerHTML = ": " + g.aiScore;
}
