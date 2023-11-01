const mysql = require('mysql')

// Get connection
let dbConnection = require('./../db-config')

// Get all rows
exports.findAll = (req, res) => {
	dbConnection.query('SELECT * FROM InventoryItems', (err, rows) => {
		if (err) {
			console.log(err)
			let retrievalError = true
			res.render('inventory-items', { retrievalError })
			return
		}

		let inventoryItemDeleted = req.query.removed // If an item was successfully deleted
		res.render('inventory-items', { rows, inventoryItemDeleted })
	})
}
