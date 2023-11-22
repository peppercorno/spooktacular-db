// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonItemRespAdd").addEventListener("click", function (event) {
	// Hide section with edit form
	// document.getElementById("sectionItemRespEdit").classList.add("display-none")
	// // Show section with add form, scroll down to it
	// document.getElementById("sectionItemRespAdd").classList.toggle("display-none")
	// document.getElementById("sectionItemRespAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// // Hide section with add form
		// document.getElementById("sectionItemRespAdd").classList.add("display-none")
		// // Show section with edit form, scroll down to it
		// document.getElementById("sectionItemRespEdit").classList.remove("display-none")
		// document.getElementById("sectionItemRespEdit").scrollIntoView()
		// // Populate edit form
		// document.getElementById("formItemRespEdit").querySelector("input[name=ItemRespID]").value =
		// 	this.getAttribute("data-ItemRespid") // Pass ItemRespID to hidden input
		// document.getElementById("formItemRespEdit").querySelector("input[name=firstName]").value =
		// 	this.getAttribute("data-firstname")
		// document.getElementById("formItemRespEdit").querySelector("input[name=lastName]").value =
		// 	this.getAttribute("data-lastname")
		// document.getElementById("formItemRespEdit").querySelector("input[name=email]").value =
		// 	this.getAttribute("data-email")
	})
})
