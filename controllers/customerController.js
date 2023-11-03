// Get connection
let dbConnection = require('./../db-config')

// Model
const Customer = require('./../models/Customer')

// Render Customers view
exports.render = async (req, res) => {
	// Get all customers
	let customers = await Customer.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { type: 'Error' }
	if (error && req.query.type === 'firstnamemissing') error.type = 'First name is missing.'
	if (error && req.query.type === 'lastnamemissing') error.type = 'Last name is missing.'
	if (error && req.query.type === 'emailmissing') error.type = 'Email is missing.'

	// Notifications
	let customerAdded = req.query.added // If a customer was successfully added
	let customerDeleted = req.query.removed // If a customer was successfully deleted

	// Render view
	res.render('customers', { customers, error, customerAdded, customerDeleted })
}

exports.add = async (req, res) => {
	try {
		// null because we don't want to fill in customerID (it is a PK and auto-incremrent)
		let customer = new Customer(null, req.body.firstName, req.body.lastName, req.body.email)

		await customer.save()

		res.redirect('/customers/?added=' + req.body.firstName + req.body.lastName)
	} catch (err) {
		// Detect whether the prefix is 'customer'-- if so, it's one of our defined validation errors
		if (err.message.substring(0, 8) === 'customer') {
			res.redirect('/customers/?error=add&type=' + err.message.substring(9))
		} else res.redirect('/customers/?error=add&type=unknown')
	}
}

// Citations
//-------------------
// Add new row
/*	Title: Reference for how to add new data
	Date: 30 Oct 2023
	Adapted from URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
	Author: CS 340 Instruction Team
*/
