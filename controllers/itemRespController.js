// Get models
const ItemResponsibility = require("../models/ItemResponsibility")
const InventoryItem = require("../models/InventoryItem")
const Employee = require("../models/Employee")

// Show all rows representing relationships between Inventory Items and Employees
exports.showAll = async (req, res) => {
	try {
		// Get all rows from intersection table InventoryItems_Employees
		let relationships = await ItemResponsibility.findAll()

		// Whether to show success notification
		let success = req.query.success

		// Render view
		res.render("item-resps/index", { relationships, success })
	} catch (err) {
		console.log(err)
		res.render("item-resps/index", { errorMessage: "Error! Unable to retrieve data on item responsibilities." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	try {
		// For dropdown menus
		let items = await InventoryItem.findNames()
		let employees = await Employee.findNames()

		res.render("item-resps/add-update", { items, employees, formAdd: true })
	} catch (err) {
		console.log(err)
		res.render("item-resps/add-update", { errorMessage: "Oops, unable to retrieve data for dropdown menus.", formAdd: true })
	}
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for relationship being edited
		let relationshipFields = await ItemResponsibility.findByID(req.params.id)

		// For dropdown menus
		let items = await InventoryItem.findNames()
		let employees = await Employee.findNames()

		res.render("item-resps/add-update", { items, employees, relationshipFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("item-resps/add-update", { errorMessage: "Oops, unable to retrieve data for this relationship.", formEdit: true })
	}
}

// Add a new relationship
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in relationshipID (it is a PK and auto-increment)
		// Follow params that ItemResponsibility class requires
		let relationship = new ItemResponsibility(null, req.body.itemID, req.body.employeeID, null, null)

		await relationship.save()

		// If successful
		res.redirect("/item-resps/?success=added")
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let items = await InventoryItem.findNames()
		let employees = await Employee.findNames()

		// To repopulate form fields after an error
		let relationshipFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add new relationship."
		if (!items || items === null) errorMessage = "Unable to retrieve data on inventory items."
		if (!employees || employees === null) errorMessage = "Unable to retrieve data on employees."
		// If user tries to add a relationship that already exists
		if (err.code && err.code === "ER_DUP_ENTRY") errorMessage = "This relationship already exists in the database."

		res.render("item-resps/add-update", { items, employees, relationshipFields, errorMessage, formAdd: true })
	}
}

// Edit existing relationship
exports.edit = async (req, res) => {
	try {
		let relationship = new ItemResponsibility(req.body.relationshipID, req.body.itemID, req.body.employeeID, null, null)

		await relationship.save()

		// If successful
		res.redirect("/item-resps/?success=edited")
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let items = await InventoryItem.findNames()
		let employees = await Employee.findNames()

		// To repopulate form fields after an error
		let relationshipFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to edit relationship."
		if (!items || items === null) errorMessage = "Unable to retrieve data on inventory items."
		if (!employees || employees === null) errorMessage = "Unable to retrieve data on employees."
		// If user tries to add a relationship that already exists
		if (err.code && err.code === "ER_DUP_ENTRY") errorMessage = "This relationship already exists in the database."

		res.render("item-resps/add-update", { errorMessage, items, employees, relationshipFields, formEdit: true })
	}
}

// Delete existing relationship
exports.delete = async (req, res) => {
	try {
		let relationship = new ItemResponsibility(req.params.id, null, null, null, null)

		await relationship.delete(req.params.id)

		// If successful
		res.redirect("/item-resps/?success=deleted")
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Relationship not deleted."

		// Get all relationships
		let relationships = await ItemResponsibility.findAll()
		if (!relationships || relationships === null) errorMessage = "Error! Unable to retrieve data on item responsibilities."

		res.render("item-resps/index", { relationships, errorMessage })
	}
}
