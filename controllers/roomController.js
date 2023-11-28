// Get model
const Room = require("../models/Room")

// Show all Rooms
exports.showAll = async (req, res) => {
	try {
		let rooms = await Room.findAll()

		// Whether to show success notification
		let success = req.query.success

		res.render("rooms/index", { rooms, success })
	} catch (err) {
		console.log(err)
		res.render("rooms/index", { errorMessage: "Error! Unable to retrieve rooms." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	res.render("rooms/add-update", { formAdd: true })
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for room being edited
		let roomFields = await Room.findByID(req.params.id)

		res.render("rooms/add-update", { roomFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("rooms/add-update", { errorMessage: "Oops, unable to retrieve data for this room.", formEdit: true })
	}
}

// Add new room
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in roomID (it is a PK and auto-increment)
		// Follow params that Room class requires
		let room = new Room(null, req.body.name, req.body.theme, req.body.maxCapacity, req.body.level, null)

		await room.save()

		// If successful
		res.redirect("/rooms/?success=added")
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let roomFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add room."
		if (err.message === "nameMissing") errorMessage = "Room name is missing."
		if (err.message === "invalidMaxCapacity") errorMessage = "Max capacity must be a number greater than zero."
		if (err.message === "maxCapacityTooLarge") errorMessage = "None of our rooms can hold that many people..."
		if (err.message === "levelMissing") errorMessage = "Level is missing."
		if (err.message === "invalidLevel") errorMessage = "Level must be a number ranging from 1 to 4."

		res.render("rooms/add-update", { roomFields, errorMessage, formAdd: true })
	}
}

// Edit existing room
exports.edit = async (req, res) => {
	try {
		let room = new Room(req.body.roomID, req.body.name, req.body.theme, req.body.maxCapacity, req.body.level, null)

		await room.save()

		// If successful
		res.redirect("/rooms/?success=edited")
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let roomFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add room."
		if (err.message === "nameMissing") errorMessage = "Room name is missing."
		if (err.message === "invalidMaxCapacity") errorMessage = "Max capacity must be a number greater than zero."
		if (err.message === "maxCapacityTooLarge") errorMessage = "None of our rooms can hold that many people..."
		if (err.message === "levelMissing") errorMessage = "Level is missing."
		if (err.message === "invalidLevel") errorMessage = "Level must be a number ranging from 1 to 4."

		res.render("rooms/add-update", { roomFields, errorMessage, formEdit: true })
	}
}

// Delete existing room
exports.delete = async (req, res) => {
	try {
		let room = new Room(req.params.id, null, null, null, null, null)

		await room.delete(req.params.id)

		// If successful
		res.redirect("/rooms/?success=deleted")
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Room not deleted."

		// Get all rooms
		let rooms = await Room.findAll()
		if (!rooms || rooms === null) errorMessage = "Error! Unable to retrieve rooms."

		res.render("rooms/index", { rooms, errorMessage })
	}
}
