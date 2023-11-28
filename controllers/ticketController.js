// Get model
const Ticket = require("../models/Ticket")
const Customer = require("../models/Customer")
const AdmissionPrice = require("../models/AdmissionPrice")

// Show all Tickets
exports.showAll = async (req, res) => {
	try {
		// Get all tickets
		let tickets = await Ticket.findAll()

		// Whether to show success notification
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Ticket #" + req.query.id + " successfully added!"
		if (req.query.success === "deleted") successMessage = "Ticket #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		res.render("tickets/index", { tickets, successMessage, highlight })
	} catch (err) {
		console.log(err)
		res.render("tickets/index", { errorMessage: "Error! Unable to retrieve tickets." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	try {
		// For dropdown menus
		let customers = await Customer.findFullNames()
		let admissionPrices = await AdmissionPrice.findByCurrentYear()

		res.render("tickets/add", { customers, admissionPrices })
	} catch (err) {
		console.log(err)
		res.render("tickets/add", { errorMessage: "Oops, Unable to retrieve data for dropdown menus." })
	}
}

// Add new ticket
exports.add = async (req, res) => {
	try {
		// First and last params: null because we don't want to fill in ticketID or purchaseDate. Let MySQL use default values.
		let ticket = new Ticket(null, req.body.customerID, null, req.body.priceID, null, null, null, req.body.quantity, null)

		let addedID = await ticket.save()

		// If successful
		res.redirect("/tickets/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let customers = await Customer.findFullNames()
		let admissionPrices = await AdmissionPrice.findByCurrentYear()

		// Refill form fields after an error
		let ticketFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add ticket."
		if (!customers || customers === null) errorMessage = "Unable to retrieve customer data."
		if (!admissionPrices || admissionPrices === null) errorMessage = "Unable to retrieve data for admission prices."
		if (err.message === "customerIDMissing") errorMessage = "Please select a customer."
		if (err.message === "priceIDMissing") errorMessage = "Please select an admission price."
		if (err.message === "quantityMissing") errorMessage = "Please select a quantity."
		if (err.message === "invalidQuantity") errorMessage = "Quantity must be a number."

		res.render("tickets/add", { customers, admissionPrices, ticketFields, errorMessage })
	}
}

// Delete existing ticket
exports.delete = async (req, res) => {
	try {
		let ticket = new Ticket(req.params.id, null, null, null, null, null, null, null, null)

		await ticket.delete(req.params.id)

		// If successful
		res.redirect("/tickets/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Ticket not deleted."

		// Get all tickets
		let tickets = await Ticket.findAll()
		if (!tickets || tickets === null) errorMessage = "Error! Unable to retrieve tickets."

		res.render("tickets/index", { tickets, errorMessage })
	}
}
