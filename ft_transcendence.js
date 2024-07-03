import
{
	saveParameter
} from './frontend/game/gui.js';

import
{
	g,
	loadSavedParameters
} from './frontend/game/main.js';

import
{
	params
} from './frontend/game/utils.js';

let	in_tournament = false;
let	contestant1;
let	contestant2;
let	losses = 0;
let	paused = false;
let	tournament_array = [];
let	username = null;
let	winners = [];
let	wins = 0;

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

document.querySelector("#list-add").addEventListener("click", function(e)
{
	e.preventDefault();
	add_item(null);
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

function	add_item(value)
{
	let	item;

	if (value == null)
		item = document.querySelector("#list_item").value;
	else
		item = value;
	if (item == "")
	{
		banner_open("Cannot add user: empty input.", "#tournament-banner");
		return ;
	}
	else if (tournament_array.indexOf(item) != -1)
	{
		banner_open("Cannot add user: already in list.", "#tournament-banner");
		return ;
	}
	banner_close("#tournament-banner");
	const	div = document.createElement("div");
	let	divContainer = `
	<div class="d-flex">
		<div class="m-1 p-1 w-100">
			${sanitize(item)}
		</div>
		<button class="border button d-flex delete m-1 rounded shadow-sm">
			<img class="icon m-1" height="22" src="img/22/list-remove.svg">
		</button>
	</div>`;
	div.innerHTML = divContainer;
	div.querySelector(".delete").addEventListener("click", (e) =>
	{
		tournament_array.splice(tournament_array.indexOf(e.currentTarget.closest("div").innerText), 1);
		e.currentTarget.closest("div").remove();
	});
	document.querySelector("#list").appendChild(div);
	tournament_array.push(item);
	document.querySelector("#list_item").value = "";
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
	g.ballSpeed = 0;
	g.orbitSpeed = 0;
	g.player2PaddleSpeed = 0;
	g.starsSpeed = 0;
	params.aiPaddleSpeed = 0;
	params.paddleSpeed = 0;
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
		if (g.isSinglePlayer == true)
			contestant2 = "AI";
		else
			contestant2 = "Guest";
		document.querySelector("#next-match").innerHTML = "";
	}
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

	if (in_tournament == false)
	{
		contestant1 = document.querySelector("#contestant1").innerText;
		contestant2 = document.querySelector("#contestant2").innerText;
	}
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
	const	div = document.createElement("div");
	const	date = new Date();
	if (winner == username)
	{
		profile_update(1);
		div.innerHTML = `
		<div class="d-flex m-1">
			<div class="ms-auto my-auto pe-none text-nowrap">
				${date.getFullYear() + "-" + String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ": Won " + g.playerScore + "-" + g.aiScore + " against"}
			</div>
			<img class="ms-1 my-auto rounded-circle" height="22" src="img/22/im-user.svg">
			<div class="me-auto my-auto pe-none">
				${loser}
			</div>
		</div>`;
	}
	else if (loser == username)
	{
		profile_update(-1);
		div.innerHTML = `
		<div class="d-flex m-1">
			<div class="ms-auto my-auto pe-none text-nowrap">
				${date.getFullYear() + "-" + String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ": Lost " + g.playerScore + "-" + g.aiScore + " against"}
			</div>
			<img class="ms-1 my-auto rounded-circle" height="22" src="img/22/im-user.svg">
			<div class="me-auto my-auto pe-none">
				${winner}
			</div>
		</div>`;
	}
	document.querySelector("#profile-log").appendChild(div);
	if (in_tournament == true && tournament_array.length == 0 && winners.length == 1)
	{
		in_tournament = false;
		document.querySelector("#result").innerHTML = winner + " won the tournament!";
	}
	else
		document.querySelector("#result").innerHTML = winner + " won the match against " + loser + "!";
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

function	start_match()
{
	g.aiPaddleMesh.position.set(0, 1.1 / 2, -8);
	g.aiScore = 0;
	g.bulbLight.position.set(0, 0.2, 0);
	g.paddleMesh.position.set(0, 1.1 / 2, 8);
	g.playerScore = 0;
	update_score();
	document.querySelector("#contestant1").innerHTML = contestant1;
	if (contestant1 == username)
		document.querySelector("#contestant1-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant1-avatar").src = "img/22/im-user.svg";
	document.querySelector("#contestant2").innerHTML = contestant2;
	if (contestant2 == username)
		document.querySelector("#contestant2-avatar").src = document.querySelector("#profile-avatar").src;
	else
		document.querySelector("#contestant2-avatar").src = "img/22/im-user.svg";
}

function	tournament_open()
{
	document.querySelector("#list_item").value = "";
	new bootstrap.Modal(document.querySelector("#tournament")).show();
	if (username != null)
		add_item(username);
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
	document.querySelector("#list").innerHTML = "";
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
		if (g.ballSpeed == 0)
			g.ballSpeed = 0.016;
		if (g.orbitSpeed == 0)
			g.orbitSpeed = 0.002;
		if (g.player2PaddleSpeed == 0)
			g.player2PaddleSpeed = 0.1;
		if (g.starsSpeed == 0)
			g.starsSpeed = 0.2;
		if (params.aiPaddleSpeed == 0)
			params.aiPaddleSpeed = 8;
		if (params.paddleSpeed == 0)
			params.paddleSpeed = 8;
	}
}

export function	update_score()
{
	document.querySelector("#contestant1-score").innerHTML = ": " + g.playerScore;
	document.querySelector("#contestant2-score").innerHTML = ": " + g.aiScore;
}
