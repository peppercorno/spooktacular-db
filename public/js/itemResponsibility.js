function goToAddForm() {
	location.assign("/item-resps/add")
}

function goToEditForm(itemID, employeeID) {
	location.assign("/item-resps/edit/" + itemID + "_" + employeeID)
}

function goBack() {
	location.assign("/item-resps")
}

document.addEventListener("DOMContentLoaded", function (event) {
	// Dropdown menus: If editing, or when re-rendering the 'add' form after an error, select the correct options
	let selectedItemID = document.getElementById("formItemResponsibility").querySelector("select[name=itemID]").getAttribute("value")
	let selectedEmployeeID = document.getElementById("formItemResponsibility").querySelector("select[name=employeeID]").getAttribute("value")

	let itemOptions = document.getElementById("formItemResponsibility").querySelector("select[name=itemID]").children
	for (var i = 0; i < itemOptions.length; i++) {
		if (itemOptions[i].getAttribute("value") === selectedItemID) itemOptions[i].setAttribute("selected", "selected")
	}

	let employeeOptions = document.getElementById("formItemResponsibility").querySelector("select[name=employeeID]").children
	for (var i = 0; i < itemOptions.length; i++) {
		if (employeeOptions[i].getAttribute("value") === selectedEmployeeID) employeeOptions[i].setAttribute("selected", "selected")
	}
})
