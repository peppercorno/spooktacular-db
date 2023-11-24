function goToAddForm() {
	location.assign("/inventory-items/add")
}

function goToEditForm(itemID) {
	location.assign("/inventory-items/edit/" + itemID)
}

function goBack() {
	location.assign("/inventory-items")
}

document.addEventListener("DOMContentLoaded", function (event) {
	// If editing, or when re-rendering the 'add' form after an error, select the correct option
	let selectedID = document.getElementById("formInventoryItem").querySelector("select[name=roomID]").getAttribute("value")

	let selectOptions = document.getElementById("formInventoryItem").querySelector("select[name=roomID]").children
	for (var i = 0; i < selectOptions.length; i++) {
		if (selectOptions[i].getAttribute("value") === selectedID) selectOptions[i].setAttribute("selected", "selected")
	}
})

// TODO: Filter
