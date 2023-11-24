// Get models
const InventoryItem = require("../models/InventoryItem")
const Room = require("../models/Room")

// Render InventoryItems view
exports.render = async (req, res) => {
	// Get all inventoryItems
	let inventoryItems = await InventoryItem.findAll()

	// For dropdown menu
	let rooms = await Room.findNames()

	let itemBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add inventory item." } // Default error message
	// Custom error message
	if (error) if (req.query.type === "namemissing") error.message = "Inventory name is missing."

	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		itemBeingEdited = await InventoryItem.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show 'not deleted' notification
	if (error && req.query.error === "notdeleted") error.section = "notdeleted"

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("inventory-items", { inventoryItems, rooms, error, success, itemBeingEdited })
}

// Add a new inventory item
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in itemID (it is a PK and auto-increment)
		let item = new InventoryItem(null, req.body.room, "", req.body.itemName, req.body.itemCondition)

		await item.save()

		// If successful
		res.redirect("/inventory-items/?success=added")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 8) === "item.add") {
			res.redirect("/inventory-items/?error=add&type=" + err.message.substring(9))
		} else res.redirect("/inventory-items/?error=add&type=unknown")
	}
}

// Edit existing inventory item
exports.edit = async (req, res) => {
	try {
		let item = new InventoryItem(req.body.itemID, req.body.room, "", req.body.itemName, req.body.itemCondition)

		await item.save()

		// If successful
		res.redirect("/inventory-items/?success=edited")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 9) === "item.edit") {
			res.redirect("/inventory-items/?error=edit&type=" + err.message.substring(10) + "&id=" + req.body.customerID)
		} else res.redirect("/inventory-items/?error=edit&type=unknown" + "&id=" + req.body.customerID)
	}
}

// Delete existing inventory item
exports.delete = async (req, res) => {
	try {
		let item = new InventoryItem(req.params.id, "", "", "")

		await item.delete(req.params.id)

		// If successful
		res.redirect("/inventory-items/?success=deleted")
	} catch (err) {
		console.log(err)
		res.redirect("/inventory-items/?error=notdeleted")
	}
}
