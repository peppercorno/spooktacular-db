// Get model
const Room = require("../models/Room")

// Render Rooms view
exports.showAll = async (req, res) => {
	// Get all rooms
	let rooms = await Room.findAll()
	let roomBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add room." } // Default error message
	if (error) {
		// Add Custom error messages
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
		if (req.query.type === "roomnamemissing") error.message = "Room name is missing."
		if (req.query.type === "thememissing") error.message = "Room theme is missing."
		if (req.query.type === "capacitymissing") error.message = "Max capacity is missing."
		if (req.query.type === "levelmissing") error.message = "Room level is missing."
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

// Add new room
exports.add = async (req, res) => {
	try {
		// Log the request body
		// console.log("Request Body:", req.body);

		// First param: null because we don't want to fill in roomID (it is a PK and auto-increment)
		let room = new Room(null, req.body.roomName, req.body.theme, req.body.maxCapacity, req.body.level, null)

		await room.save()

		// If successful
		res.redirect("/rooms/?success=added")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 10) === "room.add") {
			res.redirect("/rooms/?error=add&type=" + err.message.substring(11))
		} else res.redirect("/rooms/?error=add&type=unknown")
	}
}

// Edit existing room
exports.edit = async (req, res) => {
	try {
		let room = new Room(req.body.roomID, req.body.roomName, req.body.theme, req.body.maxCapacity, req.body.level)

		await room.save()

		// If successful
		res.redirect("/rooms/?success=edited")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 10) === "room.edit") {
			res.redirect("/rooms/?error=edit&type=" + err.message.substring(11) + "&id=" + req.body.roomID)
		} else {
			res.redirect("/rooms/?error=edit&type=unknown" + "&id=" + req.body.roomID)
		}
	}
}

// Delete existing room
exports.delete = async (req, res) => {
	try {
		let room = new Room(req.params.id, "", "", "", "")

		await room.delete(req.params.id)

		// If successful
		res.redirect("/rooms/?success=deleted")
	} catch (err) {
		console.log(err)
		res.redirect("/rooms/?error=notdeleted")
	}
}
