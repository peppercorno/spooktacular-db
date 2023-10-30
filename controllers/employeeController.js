const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// View Users
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Employees', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('employees', { retrievalError })
		}

		let employeeDeleted = req.query.removed // If an employee was successfully deleted
		res.render('employees', { rows, employeeDeleted })
	})
}
