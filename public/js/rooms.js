function goToAddForm() {
	location.assign("/rooms/add")
}

function goToEditForm(itemID) {
	location.assign("/rooms/edit/" + roomID)
}

function goBack() {
	location.assign("/rooms")
}

document.addEventListener("DOMContentLoaded", function (event) {
	// Dropdown menu:  If editing, or when re-rendering the 'add' form after an error, select the correct option
	let form = document.getElementById("formRoom")

	if (form) {
		let selectedLevel = form.querySelector("select[name=level]").getAttribute("value")
		if (!selectedLevel) return

		let levelOptions = form.querySelector("select[name=level]").children
		for (let i = 0; i < levelOptions.length; i++) {
			if (levelOptions[i].getAttribute("value") === selectedLevel) levelOptions[i].setAttribute("selected", "selected")
		}
	}
})
