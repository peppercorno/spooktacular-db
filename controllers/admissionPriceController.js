// Get model
const AdmissionPrice = require("../models/AdmissionPrice")

// Render AdmissionPrices view
exports.render = async (req, res) => {
	// Get all admission prices
	let admissionPrices = await AdmissionPrice.findAll()
	let priceBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		priceBeingEdited = await AdmissionPrice.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("admission-prices", { admissionPrices, error, success, priceBeingEdited })
}
