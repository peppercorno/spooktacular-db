/*Citations
------------------------------------------------------------------------
	Title: Checking syntax for querySelectorAll() to apply click event listeners to buttons in all table rows.
	Date: 4 Nov 2023
	Adapted from URL: https://stackoverflow.com/a/50229330
	Author: Mamun
------------------------------------------------------------------------*/

// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonCustomerAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionCustomerAdd").classList.toggle("display-none")
	document.getElementById("sectionCustomerAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Show section with edit form, scroll down to it
		document.getElementById("sectionCustomerEdit").classList.remove("display-none")
		document.getElementById("sectionCustomerEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formCustomerEdit").querySelector("input[name=customerID]").value =
			this.getAttribute("data-customerid") // Pass customerID to hidden input
		document.getElementById("formCustomerEdit").querySelector("input[name=firstName]").value =
			this.getAttribute("data-firstname")
		document.getElementById("formCustomerEdit").querySelector("input[name=lastName]").value =
			this.getAttribute("data-lastname")
		document.getElementById("formCustomerEdit").querySelector("input[name=email]").value =
			this.getAttribute("data-email")
	})
})
