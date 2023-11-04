// Get model
const Room = require("../models/Room")

// Render Rooms view
exports.render = async (req, res) => {
	// Get all rooms
	let rooms = await Room.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add room." } // Default error message
	// TODO: Define error messages after setting up validation in model
	// if (error && req.query.error === "add") {
	// 	error.section = "add"
	// 	if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	// }

	// Notification above table
	let roomAdded = req.query.added
	let roomDeleted = req.query.removed

	// Render view
	res.render("rooms", { rooms, error, roomAdded, roomDeleted })
}
