// Get model
const InventoryItem = require("../models/InventoryItem")

// Render InventoryItems view
exports.render = async (req, res) => {
	// Get all inventoryItems
	let inventoryItems = await InventoryItem.findAll()

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") error.section = "edit"

	// Whether to show notification above table
	let inventoryItemAdded = req.query.added
	let inventoryItemDeleted = req.query.removed

	// Render view
	res.render("inventory-items", { inventoryItems, error, inventoryItemAdded, inventoryItemDeleted })
}
