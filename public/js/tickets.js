// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonTicketAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionTicketAdd").classList.toggle("display-none")
	document.getElementById("sectionTicketAdd").scrollIntoView()
})
