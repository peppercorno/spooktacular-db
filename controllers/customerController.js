/*Citations
------------------------------------------------------------------------
	Title: Reference for how to proceed with opening a connection and implementing CRUD, though we have modified it significantly to use an MVC structure.
	Date: 30 Oct 2023
	Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
	Degree of originality: Our code is much the same for setting up the connection, but deviates from the class guide significantly thereafter.
	Author: CS 340 Instruction Team
------------------------------------------------------------------------*/

// Get model
const Customer = require("../models/Customer")

// Render Customers view
exports.showAll = async (req, res) => {
	try {
		// Get all customers
		let customers = await Customer.findAll()

		// Whether to show success notification
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Customer #" + req.query.id + " successfully added!"
		if (req.query.success === "edited") successMessage = "Customer #" + req.query.id + " successfully edited!"
		if (req.query.success === "deleted") successMessage = "Customer #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		// Render view
		res.render("customers/index", { customers, successMessage, highlight })
	} catch (err) {
		console.log(err)
		res.render("customers/index", { errorMessage: "Error! Unable to retrieve customers." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	res.render("customers/add-update", { formAdd: true })
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for customer being edited
		let customerFields = await Customer.findByID(req.params.id)

		res.render("customers/add-update", { customerFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("customers/add-update", { errorMessage: "Oops, unable to retrieve data for this customer.", formEdit: true })
	}
}

// Add a new customer
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in customerID (it is a PK and auto-increment)
		// Follow params that Customer class requires
		let customer = new Customer(null, req.body.firstName, req.body.lastName, req.body.email, null)

		let addedID = await customer.save()

		// If successful
		res.redirect("/customers/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let customerFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to add customer."

		res.render("customers/add-update", { customerFields, errorMessage, formAdd: true })
	}
}

// Edit existing customer
exports.edit = async (req, res) => {
	try {
		let customer = new Customer(req.body.customerID, req.body.firstName, req.body.lastName, req.body.email, null)

		await customer.save()

		// If successful
		res.redirect("/customers/?success=edited&id=" + req.body.customerID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let customerFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to edit customer."

		res.render("customers/add-update", { customerFields, errorMessage, formEdit: true })
	}
}

// Delete existing customer
exports.delete = async (req, res) => {
	try {
		let customer = new Customer(req.params.id, null, null, null, null)

		await customer.delete(req.params.id)

		// If successful
		res.redirect("/customers/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Customer not deleted."

		// Get all customers
		let customers = await Customer.findAll()
		if (!customers || customers === null) errorMessage = "Error! Unable to retrieve customers."

		res.render("customers/index", { customers, errorMessage })
	}
}

let defineErrorMessage = errType => {
	if (errType === "firstNameMissing") return "First name is missing."
	if (errType === "lastNameMissing") return "Last name is missing."
	if (errType === "firstNameLength" || errType === "lastNameLength")
		return "For first and last names, use values between 2 to 60 characters."
	if (errType === "emailMissing") return "Email is missing."
	return
}
