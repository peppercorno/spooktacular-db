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
	// Get all customers
	let customers = await Customer.findAll()
	let customerBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// Custom error messages
		if (req.query.type === "firstnamemissing") error.message = "First name is required."
		if (req.query.type === "lastnamemissing") error.message = "Last name is required."
		if (req.query.type === "emailmissing") error.message = "Email is required."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		// Fetch customer data to repopulate fields in 'edit' form
		customerBeingEdited = await Customer.findById(req.query.id)
		error.section = "edit"
	}
	if (error && req.query.error === "notdeleted") error.section = "notdeleted"

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("customers", { customers, error, success, customerBeingEdited })
}

// Add a new customer
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in customerID (it is a PK and auto-increment)
		let customer = new Customer(null, req.body.firstName, req.body.lastName, req.body.email)

		await customer.save()

		// If successful
		res.redirect("/customers/?success=added")
	} catch (err) {
		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 12) === "customer.add") {
			res.redirect("/customers/?error=add&type=" + err.message.substring(13))
		} else res.redirect("/customers/?error=add&type=unknown")
	}
}

// Edit existing customer
exports.edit = async (req, res) => {
	try {
		let customer = new Customer(req.body.customerID, req.body.firstName, req.body.lastName, req.body.email)

		await customer.save()

		// If successful
		res.redirect("/customers/?success=edited")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 13) === "customer.edit") {
			res.redirect("/customers/?error=edit&type=" + err.message.substring(14) + "&id=" + req.body.customerID)
		} else res.redirect("/customers/?error=edit&type=unknown" + "&id=" + req.body.customerID)
	}
}

// Delete existing customer
exports.delete = async (req, res) => {
	try {
		let customer = new Customer(req.params.id, "", "", "")

		await customer.delete(req.params.id)

		// If successful
		res.redirect("/customers/?success=deleted")
	} catch (err) {
		console.log(err)
		res.redirect("/customers/?error=notdeleted")
	}
}
