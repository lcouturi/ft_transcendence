let	i = 0;
let	in_tournament = false;
let	contestant1;
let	contestant2;
let	tournament_array = [];
let	winners = [];

document.getElementById('avatar').onchange = function ()
{
	document.querySelector("#avatar-name").value = this.files[0].name;
};

function	add_item()
{
	let	list_item = document.querySelector("#list_item");
	if (list_item.value == "" || tournament_array.indexOf(list_item.value) != -1)
	{
		if (list_item.value == "")
			open_banner("Cannot add user: empty input.");
		else if (tournament_array.indexOf(list_item.value) != -1)
			open_banner("Cannot add user: already in list.");
		return (false);
	}
	close_banner();
	const	div = document.createElement("div");
	let	divContainer = `
	<div class="d-flex">
		<div class="m-1 p-1 w-100">
			${list_item.value}
		</div>
		<button class="border button d-flex delete m-1 rounded shadow-sm" id="list_add">
			<img class="icon m-1" height="22" src="icons/list-remove.svg">
		</button>
	</div>`;
	div.innerHTML = divContainer;
	div.querySelector(".delete").addEventListener("click", (e) =>
	{
		tournament_array.splice(tournament_array.indexOf(e.currentTarget.closest("div").innerText), 1);
		e.currentTarget.closest("div").remove();
	});
	document.querySelector("#list").appendChild(div);
	tournament_array.push(list_item.value);
	list_item.value = "";
}

function	close_banner()
{
	document.querySelector("#banner").classList.add("p-0", "overflow-hidden");
	document.querySelector("#banner").classList.remove("p-1");
	document.querySelector("#banner").style.maxHeight = "0";
}

function	open_banner(value)
{
	document.querySelector("#banner").classList.add("p-1");
	document.querySelector("#banner").classList.remove("overflow-hidden", "p-0");
	document.querySelector("#banner-text").innerHTML = value;
	document.querySelector("#banner").style.maxHeight = "500px";
}

function	prepare_next_match()
{
	if (in_tournament == true)
	{
		i++;
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
		contestant1 = "Guest 1";
		contestant2 = "Guest 2";
		i = 0;
		document.querySelector("#next-match").innerHTML = "";
	}
}

function	result(value)
{
	if (in_tournament == false)
	{
		contestant1 = document.querySelector("#contestant1").innerText;
		contestant2 = document.querySelector("#contestant2").innerText;
	}
	else if (value == 1)
		winners.push(contestant1);
	else if (value == 2)
		winners.push(contestant2);
	if (tournament_array.length == 0 && winners.length == 1 && in_tournament == true)
	{
		in_tournament = false;
		if (value == 1)
			document.querySelector("#result").innerHTML = contestant1 + " won the tournament!";
		else
			document.querySelector("#result").innerHTML = contestant2 + " won the tournament!";
		prepare_next_match();
	}
	else if (value == 1)
	{
		document.querySelector("#result").innerHTML = contestant1 + " won the match against " + contestant2 + "!";
		if (in_tournament == true)
			prepare_next_match();
		console.log("%s won the match against %s!", contestant1, contestant2);
	}
	else if (value == 2)
	{
		document.querySelector("#result").innerHTML = contestant2 + " won the match against " + contestant1 + "!";
		if (in_tournament == true)
			prepare_next_match();
		console.log("%s won the match against %s!", contestant2, contestant1);
	}
	new bootstrap.Modal(document.querySelector("#results")).show();
}

function start_match()
{
	document.querySelector("#contestant1").innerHTML = contestant1;
	document.querySelector("#contestant2").innerHTML = contestant2;
	console.log("match %i: %s vs %s", i, contestant1, contestant2);
}

function	start_tournament()
{
	contestant1 = null;
	contestant2 = null;
	in_tournament = true;
	if (tournament_array.length <= 1)
	{
		open_banner("Tournament needs at least two users!");
		return (false);
	}
	document.querySelector("#list").innerHTML = "";
	document.querySelector("#close").click();
	winners = [];
	i = 0;
	prepare_next_match();
	start_match();
}
