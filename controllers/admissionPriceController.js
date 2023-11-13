// Get model
const AdmissionPrice = require("../models/AdmissionPrice")

// Render AdmissionPrices view
exports.render = async (req, res) => {
	// Get all admission prices
	let admissionPrices = await AdmissionPrice.findAll()
	let priceBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add admission price." }
	if (error) {
		// Custom error messages
		if (req.query.type === "yearmissing") error.message = "Year is required."
		if (req.query.type === "basepricemissing") error.message = "Base Price is required."
		if (req.query.type === "yearnan") error.message = "Year must be a number."
		if (req.query.type === "basepricenan") error.message = "Base Price must be a number."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") {
		error.section = "add"

		if (req.query.type == "dup_entry") error.message = "This year already exists in the database."
	}
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		priceBeingEdited = await AdmissionPrice.findById(req.query.id)
		error.section = "edit"
		if (req.query.type == "dup_entry") error.message = "The value for 'Year' is already in use."
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("admission-prices", { admissionPrices, error, success, priceBeingEdited })
}

// Add a new admission price
exports.add = async (req, res) => {
	try {
		// Create a new AdmissionPrice instance
		let admissionPrice = new AdmissionPrice(null, req.body.year, req.body.basePrice)

		// Save the new admission price
		await admissionPrice.save()

		// If successful, redirect with a success message
		res.redirect("/admission-prices/?success=added")
	} catch (err) {
		if (err.message.substring(0, 13) === "admission.add") {
			res.redirect("/admission-prices/?error=add&type=" + err.message.substring(14))
		} else if (err.message.substring(0, 12) === "ER_DUP_ENTRY") {
			res.redirect("/admission-prices/?error=edit&type=" + "dup_entry")
		} else res.redirect("/admission-prices/?error=add&type=unknown")
	}
}

// Edit existing admission price
exports.edit = async (req, res) => {
	try {
		// Create a new AdmissionPrice instance with the provided data
		let admissionPrice = new AdmissionPrice(req.body.priceID, req.body.year, req.body.basePrice)

		// Save the updated admission price
		await admissionPrice.save()

		// If successful, redirect with a success message
		res.redirect("/admission-prices/?success=edited")
	} catch (err) {
		if (err.message.substring(0, 14) === "admission.edit") {
			res.redirect("/admission-prices/?error=edit&type=" + err.message.substring(15) + "&id=" + req.body.priceID)
		} else if (err.message.substring(0, 12) === "ER_DUP_ENTRY") {
			res.redirect("/admission-prices/?error=edit&type=" + "dup_entry" + "&id=" + req.body.priceID)
		} else res.redirect("/admission-prices/?error=edit&type=unknown" + "&id=" + req.body.priceID)
	}
}

// Delete existing admission price
exports.delete = async (req, res) => {
	try {
		// Create a new AdmissionPrice instance with the provided priceID
		let admissionPrice = new AdmissionPrice(req.params.id, "", "")

		// Delete the admission price
		await admissionPrice.delete(req.params.id)

		// If successful, redirect with a success message
		res.redirect("/admission-prices/?success=deleted")
	} catch (err) {
		console.log(err)
		res.redirect("/admission-prices/?error=notdeleted")
	}
}
