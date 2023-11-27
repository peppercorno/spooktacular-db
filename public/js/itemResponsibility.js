function goToAddForm() {
	location.assign("/item-resps/add")
}

function goToEditForm(relationshipID) {
	location.assign("/item-resps/edit/" + relationshipID)
}

function goBack() {
	location.assign("/item-resps")
}

document.addEventListener("DOMContentLoaded", function (event) {
	// Dropdown menus: If editing, or when re-rendering the 'add' form after an error, select the correct options
	let selectedItemID = document.getElementById("formItemResponsibility").querySelector("select[name=itemID]").getAttribute("value")
	let selectedEmployeeID = document.getElementById("formItemResponsibility").querySelector("select[name=employeeID]").getAttribute("value")

	if (selectedItemID) {
		let itemOptions = document.getElementById("formItemResponsibility").querySelector("select[name=itemID]").children
		for (let i = 0; i < itemOptions.length; i++) {
			if (itemOptions[i].getAttribute("value") === selectedItemID) itemOptions[i].setAttribute("selected", "selected")
		}
	}

	if (selectedEmployeeID) {
		let employeeOptions = document.getElementById("formItemResponsibility").querySelector("select[name=employeeID]").children
		for (let i = 0; i < employeeOptions.length; i++) {
			if (employeeOptions[i].getAttribute("value") === selectedEmployeeID) employeeOptions[i].setAttribute("selected", "selected")
		}
	}
})
