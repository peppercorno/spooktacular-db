// Get model
const ItemResponsibility = require("../models/ItemResponsibility")

// Render Item Responsibilities view
exports.render = async (req, res) => {
	// Get all relationships between Inventory Items and Employees
	let relationships = await ItemResponsibility.findAll()
	let relBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add relationship." } // Default error message
	if (error) {
		// Custom error messages
		// if (req.query.type === "firstnamemissing") error.message = "First name is required."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		// Fetch relationship data to repopulate fields in 'edit' form
		relBeingEdited = await ItemResponsibility.findById(req.query.id)
		error.section = "edit"
	}
	if (error && req.query.error === "notdeleted") error.section = "notdeleted"

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("item-responsibilities", { relationships, error, success, relBeingEdited })
}

// Add a new relationship
// exports.add = async (req, res) => {
// 	try {
// 		// First param: null because we don't want to fill in customerID (it is a PK and auto-increment)
// 		let relationship = new ItemResponsibility(null, req.body.firstName, req.body.lastName, req.body.email)

// 		await relationship.save()

// 		// If successful
// 		res.redirect("/item-resps/?success=added")
// 	} catch (err) {
// 		// To detect one of our defined validation errors, check the prefix
// 		if (err.message.substring(0, 12) === "relationship.add") {
// 			res.redirect("/item-resps/?error=add&type=" + err.message.substring(13))
// 		} else res.redirect("/item-resps/?error=add&type=unknown")
// 	}
// }

// Edit existing relationship
// exports.edit = async (req, res) => {
// 	try {
// 		let relationship = new ItemResponsibility(req.body.customerID, req.body.firstName, req.body.lastName, req.body.email)

// 		await relationship.save()

// 		// If successful
// 		res.redirect("/item-resps/?success=edited")
// 	} catch (err) {
// 		console.log(err)

// 		// To detect one of our defined validation errors, check the prefix
// 		if (err.message.substring(0, 13) === "relationship.edit") {
// 			res.redirect("/item-resps/?error=edit&type=" + err.message.substring(14) + "&id=" + req.body.customerID)
// 		} else res.redirect("/item-resps/?error=edit&type=unknown" + "&id=" + req.body.customerID)
// 	}
// }

// Delete existing relationship
// exports.delete = async (req, res) => {
// 	try {
// 		let relationship = new ItemResponsibility(req.params.id, "", "", "")

// 		await relationship.delete(req.params.id)

// 		// If successful
// 		res.redirect("/item-resps/?success=deleted")
// 	} catch (err) {
// 		console.log(err)
// 		res.redirect("/item-resps/?error=notdeleted")
// 	}
// }
