const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// View Users
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM Reviews', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('reviews', { retrievalError })
		}

		let reviewDeleted = req.query.removed // If a review was successfully deleted
		res.render('reviews', { rows, reviewDeleted })
	})
}
