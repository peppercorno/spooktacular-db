/*Citations
------------------------------------------------------------------------
	Title: Partial reference for how to add new data, though we have since modified it to use an MVC structure.
	Date: 30 Oct 2023
	Adapted from URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
	Author: CS 340 Instruction Team
------------------------------------------------------------------------*/

// Get model
const Customer = require("./../models/Customer")

// Render Customers view
exports.render = async (req, res) => {
	// Get all customers
	let customers = await Customer.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	// Add
	if (error && req.query.error === "add") {
		error.section = "add"
		if (req.query.type === "firstnamemissing") error.message = "First name is missing."
		if (req.query.type === "lastnamemissing") error.message = "Last name is missing."
		if (req.query.type === "emailmissing") error.message = "Email is missing."
	}

	// Notification above table
	let customerAdded = req.query.added
	let customerDeleted = req.query.removed

	// Render view
	res.render("customers", { customers, error, customerAdded, customerDeleted })
}

// Add a new customer
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in customerID (it is a PK and auto-incremrent)
		let customer = new Customer(null, req.body.firstName, req.body.lastName, req.body.email)

		await customer.save()

		// If successful
		res.redirect("/customers/?added=" + req.body.firstName + req.body.lastName)
	} catch (err) {
		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 12) === "customer.add") {
			res.redirect("/customers/?error=add&type=" + err.message.substring(13))
		} else res.redirect("/customers/?error=add&type=unknown")
	}
}

// Update existing customer
exports.update = async (req, res) => {
	try {
		// First param: null because we don't want to fill in customerID (it is a PK and auto-incremrent)
		let customer = new Customer(null, req.body.firstName, req.body.lastName, req.body.email)

		await customer.save()

		// If successful
		res.redirect("/customers/?added=" + req.body.firstName + req.body.lastName)
	} catch (err) {
		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 12) === "customer.add") {
			res.redirect("/customers/?error=add&type=" + err.message.substring(13))
		} else res.redirect("/customers/?error=add&type=unknown")
	}
}
