const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// Get all rows
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Rooms', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('rooms', { retrievalError })
			return
		}

		let roomDeleted = req.query.removed // If a room was successfully deleted
		res.render('rooms', { rows, roomDeleted })
	})
}
