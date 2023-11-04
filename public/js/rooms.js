// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonRoomAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionRoomAdd").classList.toggle("display-none")
	document.getElementById("sectionRoomAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Show section with edit form, scroll down to it
		document.getElementById("sectionRoomEdit").classList.remove("display-none")
		document.getElementById("sectionRoomEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formRoomEdit").querySelector("input[name=roomID]").value =
			this.getAttribute("data-roomID") // Pass roomID to hidden input
		document.getElementById("formRoomEdit").querySelector("input[name=roomName]").value =
			this.getAttribute("data-roomName")
		document.getElementById("formRoomEdit").querySelector("input[name=theme]").value =
			this.getAttribute("data-theme")
		document.getElementById("formRoomEdit").querySelector("input[name=capacity]").value =
			this.getAttribute("data-capacity")

		// TODO: Select the correct option
	})
})
