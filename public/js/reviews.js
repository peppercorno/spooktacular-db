function goToAddForm() {
	location.assign("/reviews/add")
}

function goToEditForm(reviewID) {
	location.assign("/reviews/edit/" + reviewID)
}

function goBack() {
	location.assign("/reviews")
}

document.addEventListener("DOMContentLoaded", function (event) {
	// Dropdown menus:  If editing, or when re-rendering the 'add' form after an error, select the correct option
	let form = document.getElementById("formReview")
	if (!form) return

	let selectedCustomerID = form.querySelector("select[name=customerID]").getAttribute("value")
	let selectedRoomID = form.querySelector("select[name=roomID]").getAttribute("value")
	let selectedRating = form.querySelector("select[name=rating]").getAttribute("value")

	if (selectedCustomerID) {
		let customerOptions = form.querySelector("select[name=customerID]").children
		for (let i = 0; i < customerOptions.length; i++) {
			if (customerOptions[i].getAttribute("value") === selectedCustomerID) customerOptions[i].setAttribute("selected", "selected")
		}
	}

	if (selectedRoomID) {
		let roomOptions = form.querySelector("select[name=roomID]").children
		for (let i = 0; i < roomOptions.length; i++) {
			if (roomOptions[i].getAttribute("value") === selectedRoomID) roomOptions[i].setAttribute("selected", "selected")
		}
	}

	if (selectedRating) {
		let ratingOptions = form.querySelector("select[name=rating]").children
		for (let i = 0; i < ratingOptions.length; i++) {
			if (ratingOptions[i].getAttribute("value") === selectedRating) ratingOptions[i].setAttribute("selected", "selected")
		}
	}
})
