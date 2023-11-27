function goToAddForm() {
	location.assign("/employees/add")
}

function goToEditForm(employeeID) {
	location.assign("/employees/edit/" + employeeID)
}

function goBack() {
	location.assign("/employees")
}
