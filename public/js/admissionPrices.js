// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonPriceAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionPriceAdd").classList.toggle("display-none")
	document.getElementById("sectionPriceAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Show section with edit form, scroll down to it
		document.getElementById("sectionPriceEdit").classList.remove("display-none")
		document.getElementById("sectionPriceEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formAdmissionPriceEdit").querySelector("input[name=priceID]").value =
			this.getAttribute("data-priceid") // Pass priceID to hidden input
		document.getElementById("formAdmissionPriceEdit").querySelector("input[name=basePrice]").value =
			this.getAttribute("data-baseprice")

		// Fill in year in subtitle
		document.getElementById("admissionPriceYear").innerHTML = this.getAttribute("data-year")
	})
})
