document.querySelector("#list_add").addEventListener("click", () =>
{
	let list_item = document.querySelector("#list_item");
	if (list_item.value == "")
		return false;
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
		e.currentTarget.closest("div").remove();
	});
	document.querySelector("#list").appendChild(div);
	list_item.value = "";
});
