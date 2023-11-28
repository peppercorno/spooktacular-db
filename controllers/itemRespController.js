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
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Relationship #" + req.query.id + " successfully added!"
		if (req.query.success === "edited") successMessage = "Relationship #" + req.query.id + " successfully edited!"
		if (req.query.success === "deleted") successMessage = "Relationship #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		// Render view
		res.render("item-resps/index", { relationships, successMessage, highlight })
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
		res.render("item-resps/add-update", {
			errorMessage: "Oops, unable to retrieve data for dropdown menus.",
			formAdd: true
		})
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
		res.render("item-resps/add-update", {
			relationshipFields,
			errorMessage: "Oops, unable to retrieve data for this relationship.",
			formEdit: true
		})
	}
}

// Add a new relationship
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in relationshipID (it is a PK and auto-increment)
		// Follow params that ItemResponsibility class requires
		let relationship = new ItemResponsibility(null, req.body.itemID, req.body.employeeID, null, null)

		// Prevent SQL error: Check whether relationship already exists
		let alreadyExists = await relationship.checkIfExists()
		if (alreadyExists) throw new Error("alreadyExists")

		let addedID = await relationship.save()

		// If successful
		res.redirect("/item-resps/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let items = await InventoryItem.findNames()
		let employees = await Employee.findNames()

		// Refill form fields after an error
		let relationshipFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message, items, employees) ?? "Unknown error! Unable to add relationship."

		res.render("item-resps/add-update", { items, employees, relationshipFields, errorMessage, formAdd: true })
	}
}

// Edit existing relationship
exports.edit = async (req, res) => {
	try {
		let relationship = new ItemResponsibility(req.body.relationshipID, req.body.itemID, req.body.employeeID, null, null)

		// Prevent SQL error: Check whether relationship already exists
		let alreadyExists = await relationship.checkIfExists()
		if (alreadyExists) throw new Error("alreadyExists")

		await relationship.save()

		// If successful
		res.redirect("/item-resps/?success=edited&id=" + req.body.relationshipID)
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let items = await InventoryItem.findNames()
		let employees = await Employee.findNames()

		// Refill form fields after an error
		let relationshipFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message, items, employees) ?? "Unknown error! Unable to edit relationship."

		res.render("item-resps/add-update", { items, employees, relationshipFields, errorMessage, formEdit: true })
	}
}

// Delete existing relationship
exports.delete = async (req, res) => {
	try {
		let relationship = new ItemResponsibility(req.params.id, null, null, null, null)

		await relationship.delete(req.params.id)

		// If successful
		res.redirect("/item-resps/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Relationship not deleted."

		// Get all relationships
		let relationships = await ItemResponsibility.findAll()
		if (!relationships || relationships === null) errorMessage = "Error! Unable to retrieve data on item responsibilities."

		res.render("item-resps/index", { relationships, errorMessage })
	}
}

let defineErrorMessage = (errType, items, employees) => {
	if (errType === "alreadyExists") return "This relationship already exists in the database."
	if (!items || items === null) return "Unable to retrieve data for inventory items."
	if (!employees || employees === null) return "Unable to retrieve data for employees."
	return
}
