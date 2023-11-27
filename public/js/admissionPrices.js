function goToAddForm() {
	location.assign("/admission-prices/add")
}

function goToEditForm(priceID) {
	location.assign("/admission-prices/edit/" + priceID)
}

function goBack() {
	location.assign("/admission-prices")
}
