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

document.querySelector("#profile-list-add").addEventListener("click", function(e)
{
	e.preventDefault();
	add_item("profile", null);
	document.querySelector("#profile-friends-count").innerHTML = "Friends: " + friends_array.length;
});

document.querySelector("#profile-logout").addEventListener("click", function(e)
{
	e.preventDefault();
	profile_logout();
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
		banner_open("Cannot add self to friends list.", "#profile-banner");
		return ;
	}
	else if (item == "")
	{
		banner_open("Cannot add user: empty input.", "#" + prefix + "-banner");
		return ;
	}
	else if (array.indexOf(item) != -1)
	{
		banner_open("Cannot add user: already in list.", "#" + prefix + "-banner");
		return ;
	}
	banner_close("#" + prefix + "-banner");
	const	div = document.createElement("div");
	let	divContainer = `
	<div class="d-flex" style="min-width: min-content;">
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
		document.querySelector("#profile-friends-count").innerHTML = "Friends: " + friends_array.length;
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
		banner_open("No username provided.", "#login-banner");
		return ;
	}
	else if (document.querySelector("#login-pass").value == "")
	{
		banner_open("No password provided.", "#login-banner");
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
			contestant1 = "Guest";
		contestant2 = "Guest";
		document.querySelector("#next-match").innerHTML = "";
	}
}

function	profile_log_add(winner, loser, tournament)
{
	const	date = new Date();
	const	div = document.createElement("div");
	let		string = date.getFullYear() + "-" + String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ": ";
	let		string2;

	if (tournament == true)
	{
		string += "Won a tournament!"
		div.innerHTML = `
		<div class="d-flex m-1">
			<div class="my-auto pe-none text-nowrap">
				${string}
			</div>
		</div>`;
	}
	else
	{
		if (winner == username)
		{
			string += "Won ";
			if (g.playerScore < g.aiScore)
				string += g.aiScore + "-" + g.playerScore + " against";
			else
				string += g.playerScore + "-" + g.aiScore + " against";
			string2 = loser;
		}
		else
		{
			string += "Lost ";
			if (g.playerScore < g.aiScore)
				string += g.playerScore + "-" + g.aiScore + " against";
			else
				string += g.aiScore + "-" + g.playerScore + " against";
			string2 = winner;
		}
		if (g.isSinglePlayer == false)
			string2 += " Team";
		div.innerHTML = `
		<div class="d-flex m-1">
			<div class="my-auto pe-none text-nowrap">
				${string}
			</div>
			<img class="ms-1 my-auto rounded-circle" height="22" src="img/22/im-user.svg">
			<div class="me-auto my-auto pe-none text-nowrap">
				${string2}
			</div>
		</div>`;
	}
	document.querySelector("#profile-log").appendChild(div);
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
	document.querySelector("#profile-losses").innerHTML = losses + " Losses";
	document.querySelector("#profile-wins").innerHTML = wins + " Wins";

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
		banner_open("No username provided.", "#register-banner");
		return ;
	}
	else if (document.querySelector("#register-pass").value == "")
	{
		banner_open("No password provided.", "#register-banner");
		return ;
	}
	else if (document.querySelector("#register-pass").value != document.querySelector("#register-pass2").value)
	{
		banner_open("Passwords do not match.", "#register-banner");
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
		document.querySelector("#result").innerHTML += " Team";
	if (in_tournament == true && tournament_array.length == 0 && winners.length == 1)
	{
		in_tournament = false;
		profile_log_add(null, null, true);
		document.querySelector("#result").innerHTML +=  " won the tournament!";
	}
	else
	{
		document.querySelector("#result").innerHTML += " won the match against " + loser;
		if (g.isSinglePlayer == false)
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
		document.querySelector("#contestant1").innerHTML += " Team";
	if (contestant1 == username)
		document.querySelector("#contestant1-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant1-avatar").src = "img/22/im-user.svg";
	document.querySelector("#contestant2").innerHTML = contestant2;
	if (g.isSinglePlayer == false)
		document.querySelector("#contestant2").innerHTML += " Team";
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
		banner_open("Tournament needs at least two users!", "#tournament-banner");
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
