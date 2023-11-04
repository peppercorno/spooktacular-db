// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonReviewAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionReviewAdd").classList.toggle("display-none")
	document.getElementById("sectionReviewAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Show section with edit form, scroll down to it
		document.getElementById("sectionReviewEdit").classList.remove("display-none")
		document.getElementById("sectionReviewEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formReviewEdit").querySelector("input[name=reviewID]").value =
			this.getAttribute("data-reviewid") // Pass reviewID to hidden input

		//  TODO: Populate customer and room selects?

		document.getElementById("formReviewEdit").querySelector("input[name=rating]").value =
			this.getAttribute("data-rating")
		document.getElementById("formReviewEdit").querySelector("input[name=text]").value =
			this.getAttribute("data-text")
	})
})
