// Get model
const Room = require("../models/Room")

// Show all Rooms
exports.showAll = async (req, res) => {
	try {
		let rooms = await Room.findAll()

		// Whether to show success notification
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Room #" + req.query.id + " successfully added!"
		if (req.query.success === "edited") successMessage = "Room #" + req.query.id + " successfully edited!"
		if (req.query.success === "deleted") successMessage = "Room #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		res.render("rooms/index", { rooms, successMessage, highlight })
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

		let addedID = await room.save()

		// If successful
		res.redirect("/rooms/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let roomFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to add room."

		res.render("rooms/add-update", { roomFields, errorMessage, formAdd: true })
	}
}

// Edit existing room
exports.edit = async (req, res) => {
	try {
		let room = new Room(req.body.roomID, req.body.name, req.body.theme, req.body.maxCapacity, req.body.level, null)

		await room.save()

		// If successful
		res.redirect("/rooms/?success=edited&id=" + req.body.roomID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let roomFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to edit room."

		res.render("rooms/add-update", { roomFields, errorMessage, formEdit: true })
	}
}

// Delete existing room
exports.delete = async (req, res) => {
	try {
		let room = new Room(req.params.id, null, null, null, null, null)

		await room.delete(req.params.id)

		// If successful
		res.redirect("/rooms/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Room not deleted."

		// Get all rooms
		let rooms = await Room.findAll()
		if (!rooms || rooms === null) errorMessage = "Error! Unable to retrieve rooms."

		res.render("rooms/index", { rooms, errorMessage })
	}
}

let defineErrorMessage = errType => {
	if (errType === "nameMissing") return "Room name is missing."
	if (errType === "invalidMaxCapacity") return "Max capacity must be a number greater than zero."
	if (errType === "maxCapacityTooLarge") return "None of our rooms can hold so many people..."
	if (errType === "levelMissing") return "Level is missing."
	if (errType === "invalidLevel") return "Level must be a number from 1 to 4."
	return
}
