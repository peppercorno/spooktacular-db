// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonTicketAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionTicketAdd").classList.toggle("display-none")
	document.getElementById("sectionTicketAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Show section with edit form, scroll down to it
		document.getElementById("sectionTicketEdit").classList.remove("display-none")
		document.getElementById("sectionTicketEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formTicketEdit").querySelector("input[name=ticketID]").value =
			this.getAttribute("data-ticketid") // Pass ticketID to hidden input

		// TODO: Populate select based on customer names

		document.getElementById("formTicketEdit").querySelector("input[name=quantity]").value =
			this.getAttribute("data-quantity")
	})
})
