// Get model
const Ticket = require("../models/Ticket")
const Customer = require("../models/Customer")
const AdmissionPrice = require("../models/AdmissionPrice")

// Render Tickets view
exports.showAll = async (req, res) => {
	// Get all tickets
	let tickets = await Ticket.findAll()

	// For dropdown menus
	let customers = await Customer.findFullNames()
	let admissionPrices = await AdmissionPrice.findAll()

	let ticketBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add ticket." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		if (req.query.type === "customerIDmissing") error.message = "Customer is missing."
		if (req.query.type === "priceIDmissing") error.message = "Unit price is missing."
		if (req.query.type === "quantitymissing") error.message = "Quantity is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		ticketBeingEdited = await Ticket.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("tickets", { tickets, customers, admissionPrices, error, success, ticketBeingEdited })
}

// Add new ticket
exports.add = async (req, res) => {
	try {
		// Log the request body
		console.log("Request Body:", req.body)

		// First param: null because we don't want to fill in ticketID (it is a PK and auto-increment)
		let ticket = new Ticket(null, req.body.customer, req.body.priceID, req.body.quantity, req.body.purchaseDate)

		await ticket.save()

		// If successful
		res.redirect("/tickets/?success=added")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 10) === "ticket.add") {
			res.redirect("/tickets/?error=add&type=" + err.message.substring(11))
		} else res.redirect("/tickets/?error=add&type=unknown")
	}
}
