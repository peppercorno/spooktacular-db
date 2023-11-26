// Get connection
let db = require("../db-config")

// Represents a row in intersection table, InventoryItem_Employees
// ie. a relationship between one Inventory Item and one Employee
class ItemResponsibility {
	constructor(itemID, employeeID, itemName, employeeFullName) {
		this.itemID = itemID
		this.employeeID = employeeID
		this.itemName = itemName
		this.employeeFullName = employeeFullName
	}

	// Read: get all rows
	static findAll() {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT InventoryItems_Employees.itemID, InventoryItems_Employees.employeeID, "
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
					for (let row of rows) relationships.push(new this(row.itemID, row.employeeID, row.itemName, row.employeeFullName))

					resolve(relationships)
				})
			})
		})
	}

	// Read: get one row by composite PK made up of itemID and employeeID
	static findByCompPK(itemID, employeeID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`SELECT * FROM InventoryItems_Employees WHERE itemID = ${itemID} AND employeeID = ${employeeID}`, (err, res) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([])
						return
					}

					// res is an array. Create new class instance using data from first item in array
					let row = new this(res[0].itemID, res[0].roomID, res[0].itemName, res[0].employeeFullName)

					resolve(row)
				})
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Determine whether we are creating or updating
			if (this.itemID === undefined || this.itemID === null || this.employeeID === undefined || this.employeeID === null) {
				// Create
				// Parse form values as integers
				let newItemID = parseInt(this.newItemID)
				let newEmployeeID = parseInt(this.newEmployeeID)

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(`INSERT INTO InventoryItems_Employees (itemID, employeeID) VALUES (${newItemID}, ${newEmployeeID})`, (err, res) => {
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
				let newItemID = parseInt(this.newItemID)
				let newEmployeeID = parseInt(this.newEmployeeID)

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(
						"UPDATE InventoryItems_Employees SET itemID = ?, employeeID = ? WHERE itemID = ? AND employeeID = ?",
						[newItemID, newEmployeeID, itemID, employeeID],
						(err, res) => {
							connection.release() // When done with the connection, release

							// If there is an SQL error
							if (err) {
								reject(err)
								return
							}

							resolve(this)
						}
					)
				})
			}
		})
	}

	// Delete by composite PK
	delete(itemID, employeeID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`DELETE FROM InventoryItems_Employees WHERE (itemID = ${itemID} AND employeeID = ${employeeID})`, (err, res) => {
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
