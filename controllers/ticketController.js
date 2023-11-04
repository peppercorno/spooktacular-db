// Get model
const Ticket = require("../models/Ticket")

// Render Tickets view
exports.render = async (req, res) => {
	// Get all tickets
	let tickets = await Ticket.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add ticket." } // Default error message
	// TODO: Define error messages after setting up validation in model
	// if (error && req.query.error === "add") {
	// 	error.section = "add"
	// 	if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	// }

	// Notification above table
	let ticketAdded = req.query.added
	let ticketDeleted = req.query.removed

	// Render view
	res.render("tickets", { tickets, error, ticketAdded, ticketDeleted })
}
