// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonReviewAdd").addEventListener("click", function (event) {
	// Hide section with edit form
	document.getElementById("sectionReviewEdit").classList.add("display-none")

	// Show section with add form, scroll down to it
	document.getElementById("sectionReviewAdd").classList.toggle("display-none")
	document.getElementById("sectionReviewAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Hide section with add form
		document.getElementById("sectionReviewAdd").classList.add("display-none")

		// Show section with edit form, scroll down to it
		document.getElementById("sectionReviewEdit").classList.remove("display-none")
		document.getElementById("sectionReviewEdit").scrollIntoView()

		// Display creation date
		document.getElementById("reviewCreationDate").innerHTML = this.getAttribute("data-creationdate")

		// Populate edit form
		document.getElementById("formReviewEdit").querySelector("input[name=reviewID]").value = this.getAttribute("data-reviewid") // Pass reviewID to hidden input

		// Select correct option for customer, room and rating
		document.getElementById("formReviewEdit").querySelector("select[name=customer]").value = this.getAttribute("data-customerid")
		// If null, select 'unselected' option
		if (!this.getAttribute("data-roomid")) document.getElementById("formReviewEdit").querySelector("select[name=room]").value = "0"
		else document.getElementById("formReviewEdit").querySelector("select[name=room]").value = this.getAttribute("data-roomid")
		document.getElementById("formReviewEdit").querySelector("select[name=rating]").value = this.getAttribute("data-rating")

		document.getElementById("formReviewEdit").querySelector("textarea[name=text]").value = this.getAttribute("data-text")
	})
})
