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

export const h =
{
	contestant1: "Guest",
	contestant2: "Guest",
	in_tournament: false,
	language: "english",
	losses: 0,
	tournament_array: [],
	username: null,
	winners: [],
	wins: 0
};

export function	prepare_next_match()
{
	if (h.in_tournament == true)
	{
		if (h.tournament_array.length == 0)
		{
			h.tournament_array = [...h.winners];
			h.winners = [];
		}
		h.contestant1 = h.tournament_array[Math.floor(Math.random() * h.tournament_array.length)];
		h.tournament_array.splice(h.tournament_array.indexOf(h.contestant1), 1);
		if (h.tournament_array.length == 0)
		{
			h.tournament_array = [...h.winners];
			h.winners = [];
		}
		h.contestant2 = h.tournament_array[Math.floor(Math.random() * h.tournament_array.length)];
		h.tournament_array.splice(h.tournament_array.indexOf(h.contestant2), 1);
		document.querySelector("#next-match").innerHTML = "The next match will be between " + h.contestant1 + " and " + h.contestant2 + ".";
	}
	else
	{
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
		if (h.language == "english")
		{
			result = "Victory";
			type = "Tournament";
		}
		else if (h.language == "french")
		{
			result = "Victoire";
			type = "Tournoi";
		}
		else if (h.language == "ukrainian")
		{
			result = "Перемога";
			type = "Турнір";
		}
	}
	else
	{
		if (h.language == "english" || h.language == "french")
			type = "Match";
		else if (h.language == "ukrainian")
			type = "Матч";
		if (winner == h.username)
		{
			if (h.language == "english")
				result = "Victory";
			else if (h.language == "french")
				result = "Victoire";
			else if (h.language == "ukrainian")
				result = "Перемога";
			if (g.playerScore < g.aiScore)
				score = g.aiScore + "-" + g.playerScore;
			else
				score = g.playerScore + "-" + g.aiScore;
			opponent = loser;
		}
		else
		{
			if (h.language == "english")
				result = "Defeat";
			else if (h.language == "french")
				result = "Défaite";
			else if (h.language == "ukrainian")
				result = "Поразка";
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

export function	profile_update(value)
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
	if (h.in_tournament == true)
		h.winners.push(winner);
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
	if (h.in_tournament == true && h.tournament_array.length == 0 && h.winners.length == 1)
	{
		h.in_tournament = false;
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

export function	update_score()
{
	document.querySelector("#contestant1-score").innerHTML = ": " + g.playerScore;
	document.querySelector("#contestant2-score").innerHTML = ": " + g.aiScore;
}
