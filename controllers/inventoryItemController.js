// Get model
const InventoryItem = require("../models/InventoryItem")

// Render InventoryItems view
exports.render = async (req, res) => {
	// Get all inventoryItems
	let inventoryItems = await InventoryItem.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add inventory item." } // Default error message
	// TODO: Define error messages after setting up validation in model
	// if (error && req.query.error === "add") {
	// 	error.section = "add"
	// 	if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	// }

	// Notification above table
	let inventoryItemAdded = req.query.added
	let inventoryItemDeleted = req.query.removed

	// Render view
	res.render("inventory-items", { inventoryItems, error, inventoryItemAdded, inventoryItemDeleted })
}
