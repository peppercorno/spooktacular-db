// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonEmployeeAdd").addEventListener("click", function (event) {
	// Show section with add form, scroll down to it
	document.getElementById("sectionEmployeeAdd").classList.toggle("display-none")
	document.getElementById("sectionEmployeeAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Show section with edit form, scroll down to it
		document.getElementById("sectionEmployeeEdit").classList.remove("display-none")
		document.getElementById("sectionEmployeeEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formEmployeeEdit").querySelector("input[name=employeeID]").value =
			this.getAttribute("data-employeeID") // Pass employeeID to hidden input
		document.getElementById("formEmployeeEdit").querySelector("input[name=firstName]").value =
			this.getAttribute("data-firstname")
		document.getElementById("formEmployeeEdit").querySelector("input[name=lastName]").value =
			this.getAttribute("data-lastname")
		document.getElementById("formEmployeeEdit").querySelector("input[name=email]").value =
			this.getAttribute("data-email")
		document.getElementById("formEmployeeEdit").querySelector("input[name=jobTitle]").value =
			this.getAttribute("data-jobtitle")
		document.getElementById("formEmployeeEdit").querySelector("input[name=startDate]").value =
			this.getAttribute("data-startdate")
		document.getElementById("formEmployeeEdit").querySelector("input[name=endDate]").value =
			this.getAttribute("data-enddate")
		document.getElementById("formEmployeeEdit").querySelector("input[name=salary]").value =
			this.getAttribute("data-salary")
	})
})
