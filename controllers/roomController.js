const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// View Users
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Rooms', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('rooms', { retrievalError })
		}

		let roomDeleted = req.query.removed // If a room was successfully deleted
		res.render('rooms', { rows, roomDeleted })
	})
}
