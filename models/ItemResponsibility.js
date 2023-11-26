// Get connection
let db = require("../db-config")

// Represents a row in intersection table, InventoryItem_Employees
// ie. a relationship between one Inventory Item and one Employee
class ItemResponsibility {
	constructor(relationshipID, itemID, employeeID, itemName, employeeFullName) {
		this.relationshipID = relationshipID
		this.itemID = itemID
		this.employeeID = employeeID
		this.itemName = itemName
		this.employeeFullName = employeeFullName
	}

	// Read: get all rows
	static findAll() {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT InventoryItems_Employees.relationshipID, InventoryItems_Employees.itemID, InventoryItems_Employees.employeeID, "
			sqlQuery += "InventoryItems.name AS itemName, "
			sqlQuery += "CONCAT(Employees.firstName, ' ', Employees.lastName) as employeeFullName  "
			sqlQuery += "FROM InventoryItems_Employees "
			sqlQuery += "INNER JOIN InventoryItems ON InventoryItems.itemID = InventoryItems_Employees.itemID "
			sqlQuery += "INNER JOIN Employees ON Employees.employeeID = InventoryItems_Employees.employeeID;"

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(sqlQuery, (err, rows) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([]) // No rows
						return
					}

					let relationships = []
					for (let row of rows) relationships.push(new this(row.relationshipID, row.itemID, row.employeeID, row.itemName, row.employeeFullName))

					resolve(relationships)
				})
			})
		})
	}

	// Read: get one row by relationshipID
	static findByID(relationshipID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`SELECT * FROM InventoryItems_Employees WHERE relationshipID = ${relationshipID}`, (err, res) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([])
						return
					}

					// res is an array. Create new class instance using data from first item in array
					let row = new this(res[0].relationshipID, res[0].itemID, res[0].employeeID, null, null)

					resolve(row)
				})
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Determine whether we are creating or updating
			if (this.relationshipID === undefined || this.relationshipID === null) {
				// Create

				// Parse form values as integers
				let itemID = parseInt(this.itemID)
				let employeeID = parseInt(this.employeeID)

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(`INSERT INTO InventoryItems_Employees (itemID, employeeID) VALUES (${itemID}, ${employeeID})`, (err, res) => {
						connection.release() // When done with the connection, release

						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					})
				})
			} else {
				// Update

				// Parse form values as integers
				let relationshipID = parseInt(this.relationshipID)
				let itemID = parseInt(this.itemID)
				let employeeID = parseInt(this.employeeID)

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query("UPDATE InventoryItems_Employees SET itemID = ?, employeeID = ? WHERE relationshipID = ?;", [itemID, employeeID, relationshipID], (err, res) => {
						connection.release() // When done with the connection, release

						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					})
				})
			}
		})
	}

	// Delete
	delete(relationshipID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`DELETE FROM InventoryItems_Employees WHERE relationshipID = ${relationshipID}`, (err, res) => {
					connection.release() // When done with the connection, release

					// If there is an SQL error
					if (err) {
						reject(err)
						return
					}

					resolve(this)
				})
			})
		})
	}
}

module.exports = ItemResponsibility
