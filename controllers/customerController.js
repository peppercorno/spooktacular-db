const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// View Users
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Customers', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('customers', { retrievalError })
		}

		let customerDeleted = req.query.removed // If a customer was successfully deleted
		res.render('customers', { rows, customerDeleted })
	})
}
