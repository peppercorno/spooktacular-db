const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// View Users
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Tickets', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('tickets', { retrievalError })
		}

		let ticketDeleted = req.query.removed // If a ticket was successfully deleted
		res.render('tickets', { rows, ticketDeleted })
	})
}
