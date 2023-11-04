// Get model
const AdmissionPrice = require("../models/AdmissionPrice")

// Render AdmissionPrices view
exports.render = async (req, res) => {
	// Get all admission prices
	let admissionPrices = await AdmissionPrice.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add admission price." } // Default error message
	// Add
	if (error && req.query.error === "add") {
		error.section = "add"
		if (req.query.type === "basepricemissing") error.message = "Base price is missing."
	}

	// Notification above table
	let admissionPriceAdded = req.query.added
	let admissionPriceDeleted = req.query.removed

	// Render view
	res.render("admission-prices", { admissionPrices, error, admissionPriceAdded, admissionPriceDeleted })
}
