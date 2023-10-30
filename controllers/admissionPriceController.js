const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// View Users
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM AdmissionPrices', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('admission-prices', { retrievalError })
		}

		let admissionPriceDeleted = req.query.removed // If an Admission Price was successfully deleted
		res.render('admission-prices', { rows, admissionPriceDeleted })
	})
}
