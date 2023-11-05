// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonRoomAdd").addEventListener("click", function (event) {
	// Hide section with edit form
	document.getElementById("sectionRoomEdit").classList.add("display-none")

	// Show section with add form, scroll down to it
	document.getElementById("sectionRoomAdd").classList.toggle("display-none")
	document.getElementById("sectionRoomAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Hide section with add form
		document.getElementById("sectionRoomAdd").classList.add("display-none")

		// Show section with edit form, scroll down to it
		document.getElementById("sectionRoomEdit").classList.remove("display-none")
		document.getElementById("sectionRoomEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formRoomEdit").querySelector("input[name=roomID]").value =
			this.getAttribute("data-roomid") // Pass roomID to hidden input
		document.getElementById("formRoomEdit").querySelector("input[name=roomName]").value =
			this.getAttribute("data-roomname")
		document.getElementById("formRoomEdit").querySelector("input[name=theme]").value =
			this.getAttribute("data-theme")
		document.getElementById("formRoomEdit").querySelector("input[name=capacity]").value =
			this.getAttribute("data-maxcapacity")
		// Select the correct option for level
		document.getElementById("formRoomEdit").querySelector("select[name=level]").value =
			this.getAttribute("data-level")
	})
})
