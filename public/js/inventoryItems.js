/* Citations
------------------------------------------------------------------------
	Title: Checking syntax for querySelectorAll() to apply click event listeners to buttons in all table rows.
	Date: 4 Nov 2023
	Adapted from: https://stackoverflow.com/a/50229330
	Degree of originality: Largely original. Just needed to check the name of the built-in method.
	Author: Mamun
------------------------------------------------------------------------*/

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
	// Dropdown menu:  If editing, or when re-rendering the 'add' form after an error, select the correct option
	let form = document.getElementById("formInventoryItem")

	if (form) {
		let selectedID = form.querySelector("select[name=roomID]").getAttribute("value")
		if (!selectedID) return

		let selectOptions = form.querySelector("select[name=roomID]").children
		for (let i = 0; i < selectOptions.length; i++) {
			if (selectOptions[i].getAttribute("value") === selectedID) selectOptions[i].setAttribute("selected", "selected")
		}
	}
})
