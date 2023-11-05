// Get model
const InventoryItem = require("../models/InventoryItem")

// Render InventoryItems view
exports.render = async (req, res) => {
	// Get all inventoryItems
	let inventoryItems = await InventoryItem.findAll()
	let itemBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		itemBeingEdited = await InventoryItem.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("inventory-items", { inventoryItems, error, success, itemBeingEdited })
}
