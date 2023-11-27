/*Citations
------------------------------------------------------------------------
	Title: Partial reference for how to add new data, though we have since modified it to use an MVC structure.
	Date: 30 Oct 2023
	Adapted from URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
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
		let success = req.query.success

		// Render view
		res.render("customers/index", { customers, success })
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

		await customer.save()

		// If successful
		res.redirect("/customers/?success=added")
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let customerFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add customer."
		if (err.message === "firstNameMissing") errorMessage = "First name is required."
		if (err.message === "lastNameMissing") errorMessage = "Last name is required."
		if (err.message === "firstNameLength" || err.message === "lastNameLength") errorMessage = "For first and last names, enter 2 to 60 characters."
		if (err.message === "emailMissing") errorMessage = "Email is required."

		res.render("customers/add-update", { customerFields, errorMessage, formAdd: true })
	}
}

// Edit existing customer
exports.edit = async (req, res) => {
	try {
		let customer = new Customer(req.body.customerID, req.body.firstName, req.body.lastName, req.body.email, null)

		await customer.save()

		// If successful
		res.redirect("/customers/?success=edited")
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let customerFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add customer."
		if (err.message === "firstNameMissing") errorMessage = "First name is required."
		if (err.message === "lastNameMissing") errorMessage = "Last name is required."
		if (err.message === "firstNameLength" || err.message === "lastNameLength") errorMessage = "Please enter a value that is between 2 to 60 characters long."
		if (err.message === "emailMissing") errorMessage = "Email is required."

		res.render("customers/add-update", { customerFields, errorMessage, formEdit: true })
	}
}

// Delete existing customer
exports.delete = async (req, res) => {
	try {
		let customer = new Customer(req.params.id, null, null, null, null)

		await customer.delete(req.params.id)

		// If successful
		res.redirect("/customers/?success=deleted")
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Customer not deleted."

		// Get all customers
		let customers = await Customer.findAll()
		if (!customers || customers === null) errorMessage = "Error! Unable to retrieve customers."

		res.render("customers/index", { customers, errorMessage })
	}
}
