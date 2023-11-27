// Get models
const InventoryItem = require("../models/InventoryItem")
const Room = require("../models/Room")

// Show all InventoryItems
exports.showAll = async (req, res) => {
	try {
		let inventoryItems = await InventoryItem.findAll()

		// Whether to show success notification
		let success = req.query.success

		res.render("inventory-items/index", { inventoryItems, success })
	} catch (err) {
		console.log(err)
		res.render("inventory-items/index", { errorMessage: "Error! Unable to retrieve inventory items." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	try {
		// For dropdown menu
		let rooms = await Room.findNames()

		res.render("inventory-items/add-update", { rooms, formAdd: true })
	} catch (err) {
		console.log(err)
		res.render("inventory-items/add-update", { errorMessage: "Oops, Unable to retrieve data on rooms.", formAdd: true })
	}
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for item being edited
		let itemFields = await InventoryItem.findByID(req.params.id)

		// For dropdown menu
		let rooms = await Room.findNames()

		res.render("inventory-items/add-update", { rooms, itemFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("inventory-items/add-update", { errorMessage: "Oops, unable to retrieve data for this item.", formEdit: true })
	}
}

// Add a new inventory item
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in itemID (it is a PK and auto-increment)
		// Follow params that InventoryItem class requires
		let item = new InventoryItem(null, req.body.roomID, null, req.body.name, req.body.itemCondition)

		await item.save()

		// If successful
		res.redirect("/inventory-items/?success=added")
	} catch (err) {
		console.log(err)

		// For dropdown menu
		let rooms = await Room.findNames()

		// To repopulate form fields after an error
		let itemFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add inventory item."
		if (!rooms || rooms === null) errorMessage = "Unable to retrieve data on rooms."
		if (err.message === "nameMissing") errorMessage = "Item name is missing."

		res.render("inventory-items/add-update", { rooms, itemFields, errorMessage, formAdd: true })
	}
}

// Edit existing inventory item
exports.edit = async (req, res) => {
	try {
		let item = new InventoryItem(req.body.itemID, req.body.roomID, null, req.body.name, req.body.itemCondition)

		await item.save()

		// If successful
		res.redirect("/inventory-items/?success=edited")
	} catch (err) {
		console.log(err)

		// For dropdown menu
		let rooms = await Room.findNames()

		// To repopulate form fields after an error
		let itemFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to edit inventory item."
		if (!rooms || rooms === null) errorMessage = "Unable to retrieve data on rooms."
		if (err.message === "nameMissing") errorMessage = "Item name is missing."

		res.render("inventory-items/add-update", { rooms, itemFields, errorMessage, formEdit: true })
	}
}

// Delete existing inventory item
exports.delete = async (req, res) => {
	try {
		let item = new InventoryItem(req.params.id, null, null, null, null)

		await item.delete(req.params.id)

		// If successful
		res.redirect("/inventory-items/?success=deleted")
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Item not deleted."

		// Get all inventoryItems
		let inventoryItems = await InventoryItem.findAll()
		if (!inventoryItems || inventoryItems === null) errorMessage = "Error! Unable to retrieve inventory items."

		res.render("inventory-items/index", { inventoryItems, errorMessage })
	}
}
