const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// Get all rows
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Customers', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('customers', { retrievalError })
			return
		}

		let customerAdded = req.query.added // If a customer was successfully added
		let customerDeleted = req.query.removed // If a customer was successfully deleted
		res.render('customers', { rows, customerDeleted, customerAdded })
	})
}

// Add new row
/*	Title: Reference for how to add new data
	Date: 30 Oct 2023
	Adapted from URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
	Author: CS 340 Instruction Team
*/
exports.create = (req, res) => {
	try {
		// Validate incoming data
		let firstName = req.body.firstName
		if (firstName.length < 1) throw new Error('firstNameMissing')
		if (firstName.length < 2 || firstName.length > 60) throw new Error('firstNameLength')

		let lastName = req.body.lastName
		if (lastName.length < 1) throw new Error('lastNameMissing')
		if (lastName.length < 2 || lastName.length > 60) throw new Error('lastNameLength')

		let email = req.body.email
		if (email.length < 1) throw new Error('emailMissing')

		// Perform SQL query
		dbConnection.query(`INSERT INTO Customers (firstName, lastName, email) VALUES ('${firstName}', '${lastName}', '${email}')`, (err, rows) => {
			if (err) {
				console.log(err)
				throw new Error('SQLError')
			}

			// Show success notification
			// let customerAdded = true
			res.redirect('/customers' + '/?added=' + firstName + lastName)
		})
	} catch (err) {
		console.log(err.message)
		let addCustomerError = true
		let addCustomerErrorMessage = 'Error! Customer was not added for an unknown reason.' // Default error message

		// Tailored error messages
		if (err.message === 'firstNameMissing') addCustomerErrorMessage = 'First name is missing.'
		if (err.message === 'firstNameLength') addCustomerErrorMessage = 'First name must be between 2 and 60 characters.'
		if (err.message === 'lastNameMissing') addCustomerErrorMessage = 'Last name is missing.'
		if (err.message === 'lastNameLength') addCustomerErrorMessage = 'Last name must be between 2 and 60 characters.'
		if (err.message === 'emailMissing') addCustomerErrorMessage = 'Email is missing.'
		if (err.message === 'SQLError') addCustomerErrorMessage = 'Unable to add customer due to SQL error.'

		// Show error notification
		res.render('customers', { addCustomerError, addCustomerErrorMessage })
	}
}
