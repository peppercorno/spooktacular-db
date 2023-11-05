// Get model
const Room = require("../models/Room")

// Render Rooms view
exports.render = async (req, res) => {
	// Get all rooms
	let rooms = await Room.findAll()
	let roomBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		roomBeingEdited = await Room.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("rooms", { rooms, error, success, roomBeingEdited })
}
