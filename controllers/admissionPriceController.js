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

// Add a new admission price
// exports.add = async (req, res) => {
// 	try {
// 		// First param: null because we don't want to fill in customerID (it is a PK and auto-increment)
// 		let customer = new AdmissionPrice(null, req.body.firstName, req.body.lastName, req.body.email)

// 		await customer.save()

// 		// If successful
// 		res.redirect("/customers/?added=" + req.body.firstName + req.body.lastName)
// 	} catch (err) {
// 		// To detect one of our defined validation errors, check the prefix
// 		if (err.message.substring(0, 12) === "customer.add") {
// 			res.redirect("/customers/?error=add&type=" + err.message.substring(13))
// 		} else res.redirect("/customers/?error=add&type=unknown")
// 	}
// }
