function goToAddForm() {
	location.assign("/customers/add")
}

function goToEditForm(customerID) {
	location.assign("/customers/edit/" + customerID)
}

function goBack() {
	location.assign("/customers")
}
