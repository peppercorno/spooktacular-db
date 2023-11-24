// When 'add new' button is clicked, show 'add' section
document.getElementById("buttonInventoryItemAdd").addEventListener("click", function (event) {
	// Hide section with edit form
	document.getElementById("sectionInventoryItemEdit").classList.add("display-none")

	// Show section with add form, scroll down to it
	document.getElementById("sectionInventoryItemAdd").classList.toggle("display-none")
	document.getElementById("sectionInventoryItemAdd").scrollIntoView()
})

// When 'edit' button in table is clicked, show 'edit' section
document.querySelectorAll(".table-button.edit").forEach(function (el) {
	el.addEventListener("click", function () {
		// Hide section with add form
		document.getElementById("sectionInventoryItemAdd").classList.add("display-none")

		// Show section with edit form, scroll down to it
		document.getElementById("sectionInventoryItemEdit").classList.remove("display-none")
		document.getElementById("sectionInventoryItemEdit").scrollIntoView()

		// Populate edit form
		document.getElementById("formInventoryItemEdit").querySelector("input[name=itemID]").value = this.getAttribute("data-itemid") // Pass itemID to hidden input

		// Select room
		document.getElementById("formInventoryItemEdit").querySelector("select[name=room]").value = this.getAttribute("data-roomid")

		document.getElementById("formInventoryItemEdit").querySelector("input[name=itemName]").value = this.getAttribute("data-itemname")

		let itemCondition = this.getAttribute("data-itemcondition")
		if (this.getAttribute("data-itemcondition") === "--") itemCondition = ""
		document.getElementById("formInventoryItemEdit").querySelector("input[name=itemCondition]").value = itemCondition
	})
})

// TODO: Filter
