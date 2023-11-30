// Get model
const AdmissionPrice = require("../models/AdmissionPrice")

// Show all Admission Prices
exports.showAll = async (req, res) => {
	try {
		let admissionPrices = await AdmissionPrice.findAll()

		// Whether to show success notification
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Admission Price #" + req.query.id + " successfully added!"
		if (req.query.success === "edited") successMessage = "Admission Price #" + req.query.id + " successfully edited!"
		if (req.query.success === "deleted") successMessage = "Admission Price #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		// Render view
		res.render("admission-prices/index", { admissionPrices, successMessage, highlight })
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
		res.render("admission-prices/add-update", {
			errorMessage: "Oops, unable to retrieve data for this admission price.",
			formEdit: true
		})
	}
}

// Add a new admission price
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in priceID (it is a PK and auto-increment)
		// Follow params that AdmissionPrice class requires
		let admissionPrice = new AdmissionPrice(null, req.body.year, req.body.description, req.body.basePrice, null)

		let addedID = await admissionPrice.save()

		// If successful
		res.redirect("/admission-prices/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let priceFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to add relationship."

		res.render("admission-prices/add-update", { priceFields, errorMessage, formAdd: true })
	}
}

// Edit existing admission price
exports.edit = async (req, res) => {
	try {
		let admissionPrice = new AdmissionPrice(req.body.priceID, req.body.year, req.body.description, req.body.basePrice, null)

		await admissionPrice.save()

		// If successful
		res.redirect("/admission-prices/?success=edited&id=" + req.body.priceID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let priceFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to edit relationship."

		res.render("admission-prices/add-update", { priceFields, errorMessage, formEdit: true })
	}
}

// Delete existing admission price
exports.delete = async (req, res) => {
	try {
		let admissionPrice = new AdmissionPrice(req.params.id, null, null, null, null)

		await admissionPrice.delete(req.params.id)

		// If successful
		res.redirect("/admission-prices/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Item not deleted."

		// Get all Admission Prices
		let admissionPrices = await AdmissionPrice.findAll()
		if (!admissionPrices || admissionPrices === null) errorMessage = "Error! Unable to retrieve admission prices."

		res.render("admission-prices/index", { admissionPrices, errorMessage })
	}
}

let defineErrorMessage = errType => {
	if (errType === "yearMissing") return "Year is missing."
	if (errType === "invalidYear") return "Year must be a valid number, eg. 2025."
	if (errType === "descriptionMissing") return "Description is missing."
	if (errType === "basePriceMissing") return "Base price is missing."
	if (errType === "invalidBasePrice") return "Base price must be a number and non-negative."
	return
}
