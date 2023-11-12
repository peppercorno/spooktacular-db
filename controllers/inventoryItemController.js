// Get models
const InventoryItem = require("../models/InventoryItem")
const InventoryItemEmployee = require("../models/InventoryItemEmployee")

// Render InventoryItems view
exports.render = async (req, res) => {
	// Get all inventoryItems
	let inventoryItems = await InventoryItem.findAll()

	// Get all rows from InventoryItems_Employees
	let inventoryItemsEmployees = await InventoryItemEmployee.findAll()
	console.log(inventoryItemsEmployees)

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
	res.render("inventory-items", { inventoryItems, inventoryItemsEmployees, error, success, itemBeingEdited })
}
