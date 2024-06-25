const tournament_array = [];

function add_item()
{
	let list_item = document.querySelector("#list_item");
	if (list_item.value == "" || tournament_array.indexOf(list_item.value) != -1)
	{
		if (list_item.value == "")
			open_banner("Cannot add user: empty input.");
		else if (tournament_array.indexOf(list_item.value) != -1)
			open_banner("Cannot add user: already in list.");
		return false;
	}
	close_banner();
	const div = document.createElement("div");
	let divContainer = `
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

function close_banner()
{
	document.querySelector("#banner").classList.add("p-0", "overflow-hidden");
	document.querySelector("#banner").classList.remove("p-1");
	document.querySelector("#banner").style.maxHeight = "0";
}

function open_banner(value)
{
	document.querySelector("#banner").classList.add("p-1");
	document.querySelector("#banner").classList.remove("overflow-hidden", "p-0");
	document.querySelector("#banner-text").innerHTML = value;
	document.querySelector("#banner").style.maxHeight = "500px";
}
