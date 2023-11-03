// Get connection
let dbConnection = require('./../db-config')

// Model
const Customer = require('./../models/Customer')

exports.render = async (req, res) => {
	// dbConnection.query('SELECT * FROM Customers', (err, rows) => {
	// 	if (err) {
	// 		console.log(err)
	// 		let retrievalError = true
	// 		res.render('customers', { retrievalError })
	// 		return
	// 	}

	// 	let customerAdded = req.query.added // If a customer was successfully added
	// 	let customerDeleted = req.query.removed // If a customer was successfully deleted
	// 	res.render('customers', { rows, customerDeleted, customerAdded })
	// })
	let customers = await Customer.findAll()

	let error = req.query.error === undefined ? false : { type: 'Error' }
	if (error && req.query.type === 'nolastname') error.type = 'Last name is missing.'

	/*
	let error = req.query.error ? 
	req.query.added
	*/

	res.render('customers', { data: customers, error: error })
}

exports.add = async (req, res) => {
	try {
		let customer = new Customer(null, req.body.firstName, req.body.lastName, req.body.email)
		await customer.save()

		res.redirect('/customers/?added=' + req.body.firstName + req.body.lastName)
	} catch (err) {
		if (err.message.substring(0, 8) === 'customer') res.redirect('/customers/?error=add&type=' + err.message.substring(9))
		else res.redirect('/customers/?error=add&type=unknown')
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
