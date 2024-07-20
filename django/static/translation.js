import { switchLanguage } from './frontend/game/gui.js';
import { h } from './ft_transcendence.js';
import { g } from './frontend/game/globals.js';

export function english()
{
	document.querySelector("#english").checked = true;
	localStorage.setItem("userLanguage", "english");
	switchLanguage("en");
	h.language = "english";
	document.querySelector("#about-button").title = "About";
	document.querySelector("#about-close").innerHTML = "Close";
	document.querySelector("#about-label").innerHTML = "About";
	document.querySelector("#about-tab").innerHTML = "About";
	document.querySelector("#about-tab-pane").innerHTML = `
	<div class="d-flex">
		<img class="inline-img" src="/static/img/openart-image_yBIl3nIg_1717776713014_raw.jpg" %}'>
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#language-button").title = "Language";
	document.querySelector("#language-label").innerHTML = "Language";
	document.querySelector("#login-close-label").innerHTML = "Cancel";
	document.querySelector("#login-name-label").innerHTML = "Username:";
	document.querySelector("#login-pass-label").innerHTML = "Password:";
	document.querySelector("#login-title").innerHTML = "Log in";
	document.querySelector("#pause-label").innerHTML = "Pause";
	document.querySelector("#play").title = "Play";
	document.querySelector("#play-label").innerHTML = "Play";
	if (h.username)
	{
		document.querySelector("#profile-delete-label").innerHTML = "Delete Account";
		document.querySelector("#profile-friends").innerHTML = "Manage Friends";
		document.querySelector("#profile-friends-count").innerHTML = "Friends: " + h.friends_array.length;
		document.querySelector("#profile-friends-name").innerHTML = "Friends";
		document.querySelector("#profile-history").innerHTML = "Match History";
		document.querySelector("#profile-history-name").innerHTML = "Match History";
		document.querySelector("#profile-history-opponent").innerHTML = "Opponent";
		document.querySelector("#profile-history-result").innerHTML = "Result";
		document.querySelector("#profile-history-score").innerHTML = "Score";
		document.querySelector("#profile-history-time").innerHTML = "Time";
		document.querySelector("#profile-history-type").innerHTML = "Type";
		document.querySelector("#friend_to_add").placeholder = "Enter username";
		document.querySelector("#profile-logout-label").innerHTML = "Log out";
		document.querySelector("#profile-losses").innerHTML = h.losses + " Losses";
		document.querySelector("#profile-wins").innerHTML = h.wins + " Wins";
	}
	else
	{
		document.querySelector("#login-button").title = "Log in";
		document.querySelector("#login-label").innerHTML = "Log in";
	}
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
	if (h.contestant1 == "Invité" || h.contestant1 == "Гість")
		h.contestant1 = "Guest";
	if (h.contestant2 == "Invité" || h.contestant2 == "Гість")
		h.contestant2 = "Guest";
	document.querySelector("#contestant1").innerHTML = h.contestant1;
	document.querySelector("#contestant2").innerHTML = h.contestant2;
	if (g.isSinglePlayer == false)
	{
		document.querySelector("#contestant1").innerHTML += " Team";
		document.querySelector("#contestant2").innerHTML += " Team";
	}

	if (h.is_tracking_disabled == true) {
		document.querySelector("#disable-tracking-text").innerHTML = "Tracking off";
	} else {
		document.querySelector("#disable-tracking-text").innerHTML = "Tracking on";
	}
}

export function french()
{
	document.querySelector("#french").checked = true;
	localStorage.setItem("userLanguage", "french");
	switchLanguage("fr");
	h.language = "french";
	document.querySelector("#about-button").title = "À propos";
	document.querySelector("#about-close").innerHTML = "Fermer";
	document.querySelector("#about-label").innerHTML = "À propos";
	document.querySelector("#about-tab").innerHTML = "À propos";
	document.querySelector("#about-tab-pane").innerHTML = `
	<div class="d-flex">
		<img class="inline-img" src="/static/img/openart-image_yBIl3nIg_1717776713014_raw.jpg" %}'>
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#language-button").title = "Langue";
	document.querySelector("#language-label").innerHTML = "Langue";
	document.querySelector("#login-close-label").innerHTML = "Annuler";
	document.querySelector("#login-name-label").innerHTML = "Nom d’utilisateur:";
	document.querySelector("#login-pass-label").innerHTML = "Mot de passe:";
	document.querySelector("#login-title").innerHTML = "Connexion";
	document.querySelector("#pause-label").innerHTML = "Pause";
	document.querySelector("#play").title = "Jouer";
	document.querySelector("#play-label").innerHTML = "Jouer";
	if (h.username)
	{
		document.querySelector("#profile-delete-label").innerHTML = "Supprimer le compte";
		document.querySelector("#profile-friends").innerHTML = "Gérer les amis";
		document.querySelector("#profile-friends-count").innerHTML = "Amis: " + h.friends_array.length;
		document.querySelector("#profile-friends-name").innerHTML = "Amis";
		document.querySelector("#profile-history").innerHTML = "Historique des matchs";
		document.querySelector("#profile-history-name").innerHTML = "Historique des matchs";
		document.querySelector("#profile-history-opponent").innerHTML = "Adversaire";
		document.querySelector("#profile-history-result").innerHTML = "Résultat";
		document.querySelector("#profile-history-score").innerHTML = "Score";
		document.querySelector("#profile-history-time").innerHTML = "Temps";
		document.querySelector("#profile-history-type").innerHTML = "Type";
		document.querySelector("#friend_to_add").placeholder = "Entrez le nom d’utilisateur";
		document.querySelector("#profile-logout-label").innerHTML = "Déconnexion";
		document.querySelector("#profile-losses").innerHTML = h.losses + " défaites";
		document.querySelector("#profile-wins").innerHTML = h.wins + " victoires";
	}
	else
	{
		document.querySelector("#login-button").title = "Connexion";
		document.querySelector("#login-label").innerHTML = "Connexion";
	}
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
	if (h.contestant1 == "Guest" || h.contestant1 == "Гість")
		h.contestant1 = "Invité";
	if (h.contestant2 == "Guest" || h.contestant2 == "Гість")
		h.contestant2 = "Invité";
	document.querySelector("#contestant1").innerHTML = h.contestant1;
	document.querySelector("#contestant2").innerHTML = h.contestant2;
	if (g.isSinglePlayer == false)
	{
		document.querySelector("#contestant1").innerHTML = "Équipe " + h.contestant1;
		document.querySelector("#contestant2").innerHTML = "Équipe " + h.contestant2;
	}

	if (h.is_tracking_disabled == true) {
		document.querySelector("#disable-tracking-text").innerHTML = "Historique désactivée";
	} else {
		document.querySelector("#disable-tracking-text").innerHTML = "Historique activée";
	}
}

export function ukrainian()
{
	document.querySelector("#ukrainian").checked = true;
	switchLanguage("uk");
	localStorage.setItem("userLanguage", "ukrainian");
	h.language = "ukrainian";
	document.querySelector("#about-button").title = "Про";
	document.querySelector("#about-close").innerHTML = "Закрити";
	document.querySelector("#about-label").innerHTML = "Про";
	document.querySelector("#about-tab").innerHTML = "Про";
	document.querySelector("#about-tab-pane").innerHTML = `
	<div class="d-flex">
		<img class="inline-img" src="/static/img/openart-image_yBIl3nIg_1717776713014_raw.jpg" %}'>
	</div>
	<br>
	30 лютого 2024 року сталося те, що назавжди змінило хід історії. Втомившись від того, що до них ставляться лише як до їжі, авокадо почали війну проти тваринного світу в цілому.
	<br>
	<br>
	Спочатку війна йшла добре для авокадо, і вони обходили слабкі людські сили. Коли людей не було, авокадо думали, що виграли війну.
	<br>
	<br>
	Вони помилилися.
	<br>
	<br>
	Вони не були готові до натиску панголінів. Панголіни були безжальними. Авокадо виявилися рівномірними.
	<br>
	<br>
	Цей веб-сайт існує, щоб служити точним переказом Великої війни за авокадо 24 року. А хто виграв війну? Вам доведеться пограти, щоб дізнатися.`;
	document.querySelector("#about-title").innerHTML = "Велика авокадо війна 24 року";
	document.querySelector("#authors-tab").innerHTML = "Автори";
	document.querySelector("#authors-tab-pane").innerHTML = `
	<b>
		Bruno Pierre Bouchard
	</b>
	<br>
	<i>
		База даних
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку розробника&#013;https://github.com/Nyonyx" type="button">
		<a href="https://github.com/Nyonyx" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>
	<b>
		Félix Barrette
	</b>
	<br>
	<i>
		Бекенд
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку розробника&#013;https://github.com/ShroomySquid" type="button">
		<a href="https://github.com/ShroomySquid" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>
	<b>
		George Zhukov
	</b>
	<br>
	<i>
		Гра
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку розробника&#013;https://github.com/joeroeg" type="button">
		<a href="https://github.com/joeroeg" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>
	<b>
		Léopold Couturier-Otis
	</b>
	<br>
	<i>
		Інтерфейс
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку розробника&#013;https://github.com/lcouturi" type="button">
		<a href="https://github.com/lcouturi" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
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
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку розробника&#013;https://github.com/pierreolivierpaquet" type="button">
		<a href="https://github.com/pierreolivierpaquet" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#avatar-button").title = "Діалогове вікно відкриття файлів";
	document.querySelector("#components-tab").innerHTML = "Компоненти";
	document.querySelector("#components-tab-pane").innerHTML = `
	<b>
		Bootstrap
	</b>
	<br>
	<i>
		Версія 5.3.3
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку компонента&#013;https://getbootstrap.com" type="button">
		<a href="https://getbootstrap.com" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>
	<b>
		Django
	</b>
	<br>
	<i>
		Версія 5.0.6
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку компонента&#013;https://www.djangoproject.com" type="button">
		<a href="https://www.djangoproject.com" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>
	<b>
		PostgreSQL
	</b>
	<br>
	<i>
		Версія 16.3
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку компонента&#013;https://www.postgresql.org" type="button">
		<a href="https://www.postgresql.org" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>
	<b>
		Three.js
	</b>
	<br>
	<i>
		Версія r165
	</i>
	<br>
	<button class="border borderless-button d-flex m-1 p-0 rounded" title="Відвідайте домашню сторінку компонента&#013;https://threejs.org" type="button">
		<a href="https://threejs.org" target="_blank">
			<img class="m-1" height="22" src="/static/img/22/globe.svg">
		</a>
	</button>`;
	document.querySelector("#language-button").title = "Мова";
	document.querySelector("#language-label").innerHTML = "Мова";
	document.querySelector("#login-close-label").innerHTML = "Скасувати";
	document.querySelector("#login-name-label").innerHTML = "Ім'я користувача:";
	document.querySelector("#login-pass-label").innerHTML = "Пароль:";
	document.querySelector("#login-title").innerHTML = "Авторизуватися";
	document.querySelector("#pause-label").innerHTML = "Пауза";
	document.querySelector("#play").title = "Грати";
	document.querySelector("#play-label").innerHTML = "Грати";
	if (h.username)
	{
		document.querySelector("#profile-delete-label").innerHTML = "Видалити аккаунт";
		document.querySelector("#profile-friends").innerHTML = "Керуйте друзями";
		document.querySelector("#profile-friends-count").innerHTML = "Друзі: " + h.friends_array.length;
		document.querySelector("#profile-friends-name").innerHTML = "Друзі";
		document.querySelector("#profile-history").innerHTML = "Історія матчів";
		document.querySelector("#profile-history-name").innerHTML = "Історія матчів";
		document.querySelector("#profile-history-opponent").innerHTML = "Суперник";
		document.querySelector("#profile-history-result").innerHTML = "Результат";
		document.querySelector("#profile-history-score").innerHTML = "Оцінка";
		document.querySelector("#profile-history-time").innerHTML = "Час";
		document.querySelector("#profile-history-type").innerHTML = "Тип";
		document.querySelector("#friend_to_add").placeholder = "Введіть ім'я користувача";
		document.querySelector("#profile-logout-label").innerHTML = "Вийти";
		document.querySelector("#profile-losses").innerHTML = h.losses + " втрати";
		document.querySelector("#profile-wins").innerHTML = h.wins + " виграє";
	}
	else
	{
		document.querySelector("#login-button").title = "Авторизуватися";
		document.querySelector("#login-label").innerHTML = "Авторизуватися";
	}
	document.querySelector("#register-button-label").innerHTML = "Зареєструватися";
	document.querySelector("#register-close").innerHTML = "Скасувати";
	document.querySelector("#register-name-label").innerHTML = "Ім'я користувача:";
	document.querySelector("#register-pass-label").innerHTML = "Пароль:";
	document.querySelector("#register-pass2-label").innerHTML = "Підтвердьте пароль:";
	document.querySelector("#register-title").innerHTML = "Зареєструватися";
	document.querySelector("#results-title").innerHTML = "Результати";
	document.querySelector("#tournament-button").title = "Турнір";
	document.querySelector("#tournament-close").innerHTML = "Закрити";
	document.querySelector("#tournament-label").innerHTML = "Турнір";
	document.querySelector("#tournament-list-item").placeholder = "Введіть ім'я користувача";
	document.querySelector("#tournament-start-label").innerHTML = "Початок турніру";
	document.querySelector("#tournament-start-match-label").innerHTML = "Наступний матч";
	document.querySelector("#tournament-title").innerHTML = "Турнір";
	document.title = "Велика авокадо війна 24 року";
	if (h.contestant1 == "Invité" || h.contestant1 == "Guest")
		h.contestant1 = "Гість";
	if (h.contestant2 == "Invité" || h.contestant2 == "Guest")
		h.contestant2 = "Гість";
	document.querySelector("#contestant1").innerHTML = h.contestant1;
	document.querySelector("#contestant2").innerHTML = h.contestant2;
	if (g.isSinglePlayer == false)
	{
		document.querySelector("#contestant1").innerHTML = "Командний " + h.contestant1;
		document.querySelector("#contestant2").innerHTML = "Командний " + h.contestant2;
	}

	if (h.is_tracking_disabled == true) {
		document.querySelector("#disable-tracking-text").innerHTML = "Відстеження вимкнено";
	} else {
		document.querySelector("#disable-tracking-text").innerHTML = "Відстеження увімкнено";
	}
}
