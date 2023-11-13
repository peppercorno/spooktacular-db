// Get model
const Ticket = require("../models/Ticket")
const Customer = require("../models/Customer")
const AdmissionPrice = require("../models/AdmissionPrice")

// Render Tickets view
exports.render = async (req, res) => {
	// Get all tickets
	let tickets = await Ticket.findAll()

	// For dropdown menus
	let customers = await Customer.findFullNames()
	let admissionPrices = await AdmissionPrice.findAll()

	let ticketBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
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
