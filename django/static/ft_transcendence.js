import { loadSavedParameters, switchLanguage } from './frontend/game/gui.js';
import { g } from './frontend/game/globals.js';

export const h =
{
	contestant1: "Guest",
	contestant2: "Guest",
	friends_array: [],
	is_tracking_disabled: false,
	language: "english",
	losses: 0,
	paused: false,
	username: null,
	wins: 0
};

let	in_tournament = false;
let	tournament_array = [];
let	winners = [];
const CSRF_TOKEN = document.querySelector('[name=csrfmiddlewaretoken]').value;
const SUCCESS = 200;

export function	add_item(prefix, value)
{
		let	array;
		let	item;

		if (prefix == "tournament")
			array = tournament_array;
		else
			array = h.friends_array;
		if (value == null)
			item = document.querySelector("#" + prefix + "-list-item").value;
		else
			item = value;
		if (prefix == "profile" && item == h.username)
		{
			if (h.language == "english")
				banner_open("Cannot add self to friends list.", "#profile-banner");
			else if (h.language == "french")
				banner_open("Vous ne pouvez pas vous rajouter à votre liste d’amis.", "#profile-banner");
			else if (h.language == "ukrainian")
				banner_open("Не можу додати себе до списку друзів.", "#profile-banner");
			return ;
		}
		else if (item == "")
		{
			if (h.language == "english")
				banner_open("Cannot add user: empty input.", "#" + prefix + "-banner");
			else if (h.language == "french")
				banner_open("La boite de texte est vide.", "#" + prefix + "-banner");
			else if (h.language == "ukrainian")
				banner_open("Неможливо додати користувача: порожній вхід.", "#" + prefix + "-banner");
			return ;
		}
		else if (array.indexOf(item) != -1)
		{
			if (h.language == "english")
				banner_open("Cannot add user: already in list.", "#" + prefix + "-banner");
			else if (h.language == "french")
				banner_open("L’utilisateur est déjà dans la liste.", "#" + prefix + "-banner");
			else if (h.language == "ukrainian")
				banner_open("Неможливо додати користувача: уже в списку.", "#" + prefix + "-banner");
			return ;
		}
		banner_close("#" + prefix + "-banner");
		const	div = document.createElement("div");
		let	divContainer = `
		<div class="d-flex" style="min-width: min-content;">`
		if (prefix == "profile")
		{
			divContainer += `
			<img class="mx-1 my-auto" height="22" src="/static/img/22/im-user-away.svg" title="Away">`
		}
		divContainer += `
			<div class="m-1 p-1 w-100" style="min-width: min-content;">
				${sanitize(item)}
			</div>
			<button class="border button d-flex delete m-1 rounded shadow-sm">
				<img height="22" src="/static/img/22/list-remove.svg">
			</button>
		</div>`;
		div.style.minWidth = "min-content";
		div.innerHTML = divContainer;
		div.querySelector(".delete").addEventListener("click", (e) =>
		{
			array.splice(array.indexOf(e.currentTarget.closest("div").innerText), 1);
			e.currentTarget.closest("div").remove();
			if (h.language == "english")
				document.querySelector("#profile-friends-count").innerHTML = "Friends: " + h.friends_array.length;
			else if (h.language == "french")
				document.querySelector("#profile-friends-count").innerHTML = "Amis: " + h.friends_array.length;
			else if (h.language == "ukrainian")
				document.querySelector("#profile-friends-count").innerHTML = "Друзі: " + h.friends_array.length;
		});
		document.querySelector("#" + prefix + "-list").appendChild(div);
		array.push(item);
		//document.querySelector("#" + prefix + "-list-item").value = "";
		if (prefix == "tournament")
			tournament_array = array;
		else
			g.friends_array = array;
}

export function	banner_close(id)
{
	document.querySelector(id + "-text").innerHTML = "";
	document.querySelector(id).classList.add("p-0", "overflow-hidden");
	document.querySelector(id).classList.remove("p-1");
	document.querySelector(id).style.maxHeight = "0";
}

export function	banner_open(value, id)
{
	document.querySelector(id).classList.add("p-1");
	document.querySelector(id).classList.remove("overflow-hidden", "p-0");
	document.querySelector(id + "-text").innerHTML = value;
	document.querySelector(id).style.maxHeight = "500px";
}

export const render_match_history = async (data) => {
	const	tr = document.createElement("tr");
	tr.innerHTML = `
	<th class="text-nowrap" scope="row">
		${data.date}
	</th>
	<td>
		${data.result}
	</td>
	<td>
		${data.game_type}
	</td>
	<td>
		${data.score}
	</td>
	<td>
		${data.player2}
	</td>`
	document.querySelector("#profile-log").appendChild(tr);
};

export const get_games = async (username) => {
	const response = await fetch('/get_games', {
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": CSRF_TOKEN,
		},
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify({
			'username': username,
		}),
	});
	if (response.status !== SUCCESS) {
		throw new Error('nope, u suck to get game');
	}
	const data = await response.json();
	return data;
};

export function	login_complete()
{
	if (document.querySelector("#login-button"))
	{
		document.querySelector("#login-button").classList.add("d-none");
		document.querySelector("#login-button").classList.remove("d-flex");
	}
	if (document.querySelector("#profile-name"))
		document.querySelector("#profile-name").innerHTML = h.username;
	if (document.querySelector("#profile-name-inside"))
		document.querySelector("#profile-name-inside").innerHTML = h.username;
	if (document.querySelector("#profile-button"))
		document.querySelector("#profile-button").classList.remove("d-none");
	if (in_tournament == false)
	{
		prepare_next_match();
		start_match();
	}
	let username = document.getElementById("profile-name-inside").textContent;
	get_games(username)
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				render_match_history(data[i].fields);
			};
		})
		.catch(err => {
			console.log('error: ', err.message);
		});
}

export function	login_validate()
{
	if (document.querySelector("#login-name").value == "")
	{
		if (h.language == "english")
			banner_open("No username provided.", "#login-banner");
		else if (h.language == "french")
			banner_open("Aucun nom d’utilisateur fourni.", "#login-banner");
		else if (h.language == "ukrainian")
			banner_open("Ім'я користувача не вказано.", "#login-banner");
		return ;
	}
	else if (document.querySelector("#login-pass").value == "")
	{
		if (h.language == "english")
			banner_open("No password provided.", "#login-banner");
		else if (h.language == "french")
			banner_open("Aucun mot de pass fourni.", "#login-banner");
		else if (h.language == "ukrainian")
			banner_open("Пароль не надано.", "#login-banner");
		return ;
	}
	document.querySelector("#login-form").submit();
}

export function	pause()
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
		document.querySelector(".lil-gui").classList.add("d-none");
		if (tournament_array.length == 0)
		{
			tournament_array = [...winners];
			winners = [];
		}
		h.contestant1 = tournament_array[Math.floor(Math.random() * tournament_array.length)];
		tournament_array.splice(tournament_array.indexOf(h.contestant1), 1);
		if (tournament_array.length == 0)
		{
			tournament_array = [...winners];
			winners = [];
		}
		h.contestant2 = tournament_array[Math.floor(Math.random() * tournament_array.length)];
		tournament_array.splice(tournament_array.indexOf(h.contestant2), 1);
		document.querySelector("#next-match").innerHTML = "The next match will be between " + h.contestant1 + " and " + h.contestant2 + ".";
	}
	else
	{
		document.querySelector(".lil-gui").classList.remove("d-none");
		if (h.username != null)
			h.contestant1 = h.username;
		else
		{
			if (h.language == "english")
				h.contestant1 = "Guest";
			else if (h.language == "french")
				h.contestant1 = "Invité";
			else if (h.language == "ukrainian")
				h.contestant1 = "Гість";
		}
		if (h.language == "english")
			h.contestant2 = "Guest";
		else if (h.language == "french")
			h.contestant2 = "Invité";
		else if (h.language == "ukrainian")
			h.contestant2 = "Гість";
		document.querySelector("#next-match").innerHTML = "";
	}
}

export const save_game = async (username, player2, score, date, game_type, result) => {
	const response = await fetch('/save_game', {
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": CSRF_TOKEN,
		},
		method: 'SAVE_GAME',
		credentials: 'include',
		body: JSON.stringify({
			'player1': username,
			'player2': player2,
			'score': score,
			'date': date,
			'game_type': game_type,
			'result': result
		}),
	});
	if (response.status !== SUCCESS) {
		throw new Error('nope, u suck to save game');
	}
	const data = await response.json();
	return data;
};

function	profile_log_add(winner, loser, tournament)
{
	const	date = new Date();
	const	date_json = date.getFullYear() + "-" + String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');
	let		opponent = "";
	let		result;
	let 	result_json;
	let		score = "";
	let		type;
	let 	type_json;

	if (h.is_tracking_disabled == true) {
		return ;
	}

	if (tournament == true)
		type_json = "T";
	else
	{
		type_json = "M"
		if (winner == h.username)
		{
			result_json = "V"
			if (g.playerScore < g.aiScore)
				score = g.aiScore + "-" + g.playerScore;
			else
				score = g.playerScore + "-" + g.aiScore;
			opponent = loser;
		}
		else
		{
			result_json = "D"
			if (g.playerScore < g.aiScore)
				score = g.playerScore + "-" + g.aiScore;
			else
				score = g.aiScore + "-" + g.playerScore;
			opponent = winner;
		}
		if (g.isSinglePlayer == false)
		{
			if (h.language == "english")
				opponent += " Team";
			else if (h.language == "french")
				opponent = "Équipe " + opponent;
			else if (h.language == "ukrainian")
				opponent = "Командний " + opponent;
		}
	}
	let username = document.getElementById("profile-name-inside").textContent;
	save_game(username, opponent, score, date_json, type_json, result_json)
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				render_match_history(data[i].fields);
			};
		})
		.catch(err => {
			console.log('error: ', err.message);
		});
}

function	profile_update(value)
{
	if (value == -1)
		h.losses++;
	else if (value == 1)
		h.wins++;
	if (h.losses + h.wins == 0)
	{
		document.querySelector("#profile-bar").max = 2;
		document.querySelector("#profile-bar").value = 1;
	}
	else
	{
		document.querySelector("#profile-bar").max = h.losses + h.wins;
		document.querySelector("#profile-bar").value = h.wins;
	}
	if (h.language == "english")
	{
		document.querySelector("#profile-losses").innerHTML = h.losses + " Losses";
		document.querySelector("#profile-wins").innerHTML = h.wins + " Wins";
	}
	else if (h.language == "french")
	{
		document.querySelector("#profile-losses").innerHTML = h.losses + " défaites";
		document.querySelector("#profile-wins").innerHTML = h.wins + " victoires";
	}
	else if (h.language == "ukrainian")
	{
		document.querySelector("#profile-losses").innerHTML = h.losses + " втрати";
		document.querySelector("#profile-wins").innerHTML = h.wins + " виграє";
	}
}

export function	register_open()
{
	if (document.querySelector("#avatar-name"))
		document.querySelector("#avatar-name").value = "";
	document.querySelector("#login-name").value = "";
	document.querySelector("#login-pass").value = "";
	if (document.querySelector("#register-name"))
		document.querySelector("#register-name").value = "";
	if (document.querySelector("#register-pass"))
		document.querySelector("#register-pass").value = "";
	if (document.querySelector("#register-pass2"))
		document.querySelector("#register-pass2").value = "";
	new bootstrap.Modal(document.querySelector("#register")).show();
}

export function	register_validate()
{
	if (document.querySelector("#register-name").value == "")
	{
		if (h.language == "english")
			banner_open("No username provided.", "#register-banner");
		else if (h.language == "french")
			banner_open("Aucun nom d’utilisateur fourni.", "#register-banner");
		else if (h.language == "ukrainian")
			banner_open("Ім'я користувача не вказано.", "#register-banner");
		return ;
	}
	else if (document.querySelector("#register-pass").value == "")
	{
		if (h.language == "english")
			banner_open("No password provided.", "#register-banner");
		else if (h.language == "french")
			banner_open("Aucun mot de pass fourni.", "#register-banner");
		else if (h.language == "ukrainian")
			banner_open("Пароль не надано.", "#register-banner");
		return ;
	}
	else if (document.querySelector("#register-pass").value != document.querySelector("#register-pass2").value)
	{
		if (h.language == "english")
			banner_open("Passwords do not match.", "#register-banner");
		else if (h.language == "french")
			banner_open("Vos mots de passes ne correspondent pas.", "#register-banner");
		else if (h.language == "ukrainian")
			banner_open("Паролі не збігаються.", "#register-banner");
		return ;
	}
	document.querySelector("#myForm").submit();
}

export function	result(value)
{
	let	loser;
	let	winner;

	if (value == 1)
	{
		winner = h.contestant1;
		loser = h.contestant2;
	}
	else if (value == 2)
	{
		winner = h.contestant2;
		loser = h.contestant1;
	}
	if (in_tournament == true)
		winners.push(winner);
	if (winner == h.username)
	{
		profile_update(1);
		profile_log_add(winner, loser, false);
	}
	else if (loser == h.username)
	{
		profile_update(-1);
		profile_log_add(winner, loser, false);
	}
	document.querySelector("#result").innerHTML = winner;
	if (g.isSinglePlayer == false)
	{
		if (h.language == "english")
			document.querySelector("#result").innerHTML += " Team";
		else if (h.language == "french")
			document.querySelector("#result").innerHTML = "Équipe " + document.querySelector("#result").innerHTML;
		else if (h.language == "ukrainian")
			document.querySelector("#result").innerHTML = "Командний " + document.querySelector("#result").innerHTML;
	}
	if (in_tournament == true && tournament_array.length == 0 && winners.length == 1)
	{
		in_tournament = false;
		profile_log_add(null, null, true);
		if (h.language == "english")
			document.querySelector("#result").innerHTML +=  " won the tournament!";
		else if (h.language == "french")
			document.querySelector("#result").innerHTML +=  " a gagné le tournoi!";
		else if (h.language == "ukrainian")
			document.querySelector("#result").innerHTML +=  " виграв турнір!";
	}
	else
	{
		if (h.language == "english")
			document.querySelector("#result").innerHTML += " won the match against ";
		else if (h.language == "french")
			document.querySelector("#result").innerHTML += " a gagné le match contre ";
		else if (h.language == "ukrainian")
			document.querySelector("#result").innerHTML += " виграв матч проти ";
		if (g.isSinglePlayer == false)
		{
			if (h.language == "french")
				document.querySelector("#result").innerHTML += "Équipe ";
			else if (h.language == "ukrainian")
				document.querySelector("#result").innerHTML += "Командний ";
		}
		document.querySelector("#result").innerHTML += loser;
		if (g.isSinglePlayer == false && h.language == "english")
			document.querySelector("#result").innerHTML += " Team";
		document.querySelector("#result").innerHTML += "!";
	}
	prepare_next_match();
	new bootstrap.Modal(document.querySelector("#results")).show();
}

export function	sanitize(string)
{
	string = string.replace(/&/g, "&amp;").replace(/</g, "&lt;");
	string = string.replace(/\>/g, "&gt;").replace(/"/g, "&quot;");
	string = string.replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
	string = string.replace(/`/g, "&grave;").replace(/=/g, "&#x3D;");
	return (string);
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
	document.querySelector("#contestant1").innerHTML = h.contestant1;
	if (g.isSinglePlayer == false)
	{
		if (h.language == "english")
			document.querySelector("#contestant1").innerHTML += " Team";
		else if (h.language == "french")
			document.querySelector("#contestant1").innerHTML = "Équipe " + document.querySelector("#contestant1").innerHTML;
		else if (h.language == "ukrainian")
			document.querySelector("#contestant1").innerHTML = "Командний " + document.querySelector("#contestant1").innerHTML;
	}
	if (h.contestant1 == h.username)
		document.querySelector("#contestant1-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant1-avatar").src = "/static/img/22/im-user.svg";
	document.querySelector("#contestant2").innerHTML = h.contestant2;
	if (g.isSinglePlayer == false)
	{
		if (h.language == "english")
			document.querySelector("#contestant2").innerHTML += " Team";
		else if (h.language == "french")
			document.querySelector("#contestant2").innerHTML = "Équipe " + document.querySelector("#contestant2").innerHTML;
		else if (h.language == "ukrainian")
			document.querySelector("#contestant2").innerHTML = "Командний " + document.querySelector("#contestant2").innerHTML;
	}
	if (h.contestant2 == h.username)
		document.querySelector("#contestant2-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant2-avatar").src = "/static/img/22/im-user.svg";
}

export function	tournament_open()
{
	document.querySelector("#tournament-list-item").value = "";
	new bootstrap.Modal(document.querySelector("#tournament")).show();
	if (h.username != null)
		add_item("tournament", unsanitize(h.username));
}

export function	tournament_start()
{
	if (tournament_array.length <= 1)
	{
		if (h.language == "english")
			banner_open("Tournament needs at least two users!", "#tournament-banner");
		else if (h.language == "french")
			banner_open("Le tournoi a besoin d’au moins deux utilisateurs!", "#tournament-banner");
		else if (h.language == "ukrainian")
			banner_open("Турнір потребує мінімум двох учасників!", "#tournament-banner");
		return ;
	}
	h.contestant1 = null;
	h.contestant2 = null;
	in_tournament = true;
	document.querySelector("#tournament-list").innerHTML = "";
	bootstrap.Modal.getInstance(document.getElementById("tournament")).hide();
	winners = [];
	prepare_next_match();
	start_match();
}

export function	unpause()
{
	if (h.paused == false)
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

export function	unsanitize(string)
{
	string = string.replace(/&amp;/g, "&").replace(/&lt;/g, "<");
	string = string.replace(/&gt;/g, ">").replace(/&quot;/g, '"');
	string = string.replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
	string = string.replace(/&grave;/g, "`").replace(/&#x3D;/g, "=");
	return (string);
}

export function	update_score()
{
	document.querySelector("#contestant1-score").innerHTML = ": " + g.playerScore;
	document.querySelector("#contestant2-score").innerHTML = ": " + g.aiScore;
}
