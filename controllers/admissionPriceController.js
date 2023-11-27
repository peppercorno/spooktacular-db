// Get model
const AdmissionPrice = require("../models/AdmissionPrice")

// Show all Admission Prices
exports.showAll = async (req, res) => {
	try {
		let admissionPrices = await AdmissionPrice.findAll()

		// Whether to show success notification
		let success = req.query.success

		// Render view
		res.render("admission-prices/index", { admissionPrices, success })
	} catch (err) {
		console.log(err)
		res.render("admission-prices/index", { errorMessage: "Error! Unable to retrieve admission prices." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	res.render("admission-prices/add-update", { formAdd: true })
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for Admission Price being edited
		let priceFields = await AdmissionPrice.findByID(req.params.id)

		res.render("admission-prices/add-update", { priceFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("admission-prices/add-update", { errorMessage: "Oops, unable to retrieve data for this admission price.", formEdit: true })
	}
}

// Add a new admission price
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in priceID (it is a PK and auto-increment)
		// Follow params that AdmissionPrice class requires
		let admissionPrice = new AdmissionPrice(null, req.body.year, req.body.description, req.body.basePrice, null)

		await admissionPrice.save()

		// If successful
		res.redirect("/admission-prices/?success=added")
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let priceFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add admission price."
		if (err.message === "yearMissing") errorMessage = "Year is missing."
		if (err.message === "yearNaN") errorMessage = "Year must be a number."
		if (err.message === "descriptionMissing") errorMessage = "Description is missing."
		if (err.message === "basePriceMissing") errorMessage = "Base price is missing."
		if (err.message === "basePriceNaN") errorMessage = "Base price must be a number."

		res.render("admission-prices/add-update", { priceFields, errorMessage, formAdd: true })
	}
}

// Edit existing admission price
exports.edit = async (req, res) => {
	try {
		let admissionPrice = new AdmissionPrice(req.body.priceID, req.body.year, req.body.description, req.body.basePrice, null)

		await admissionPrice.save()

		// If successful
		res.redirect("/admission-prices/?success=edited")
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let priceFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add admission price."
		if (err.message === "yearMissing") errorMessage = "Year is missing."
		if (err.message === "yearNaN") errorMessage = "Year must be a number."
		if (err.message === "descriptionMissing") errorMessage = "Description is missing."
		if (err.message === "basePriceMissing") errorMessage = "Base price is missing."
		if (err.message === "basePriceNaN") errorMessage = "Base price must be a number."

		res.render("admission-prices/add-update", { priceFields, errorMessage, formEdit: true })
	}
}

// Delete existing admission price
exports.delete = async (req, res) => {
	try {
		let admissionPrice = new AdmissionPrice(req.params.id, null, null, null, null)

		await admissionPrice.delete(req.params.id)

		// If successful
		res.redirect("/admission-prices/?success=deleted")
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Item not deleted."

		// Get all Admission Prices
		let admissionPrices = await AdmissionPrice.findAll()
		if (!admissionPrices || admissionPrices === null) errorMessage = "Error! Unable to retrieve admission prices."

		res.render("admission-prices/index", { admissionPrices, errorMessage })
	}
}
