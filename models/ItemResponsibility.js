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
			let sqlQuery =
				"SELECT InventoryItems_Employees.relationshipID, InventoryItems_Employees.itemID, InventoryItems_Employees.employeeID, "
			sqlQuery += "InventoryItems.name AS itemName, "
			sqlQuery += "CONCAT(Employees.firstName, ' ', Employees.lastName) as employeeFullName  "
			sqlQuery += "FROM InventoryItems_Employees "
			sqlQuery += "INNER JOIN InventoryItems ON InventoryItems.itemID = InventoryItems_Employees.itemID "
			sqlQuery += "INNER JOIN Employees ON Employees.employeeID = InventoryItems_Employees.employeeID "
			sqlQuery += "ORDER BY InventoryItems_Employees.relationshipID DESC;"

			db.pool.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let relationships = []
				for (let row of rows)
					relationships.push(
						new this(row.relationshipID, row.itemID, row.employeeID, row.itemName, row.employeeFullName)
					)

				resolve(relationships)
			})
		})
	}

	// Read: get one row by relationshipID
	static findByID(relationshipID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`SELECT * FROM InventoryItems_Employees WHERE relationshipID = ${relationshipID}`, (err, res) => {
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
	}

	// Check whether this itemID employeeID combination already exists
	checkIfExists() {
		return new Promise((resolve, reject) => {
			db.pool.query(
				`SELECT COUNT(1) AS count FROM InventoryItems_Employees WHERE itemID = ${this.itemID} AND employeeID = ${this.employeeID}`,
				(err, res) => {
					if (err) {
						reject(err)
						return
					}

					// res[0].count is either zero or one. Resolve with true or false
					resolve(res[0].count === 1)
				}
			)
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Parse as int
			let itemID = parseInt(this.itemID)
			let employeeID = parseInt(this.employeeID)

			// Determine whether we are creating or updating
			if (this.relationshipID === undefined || this.relationshipID === null) {
				// Create
				db.pool.query(
					`INSERT INTO InventoryItems_Employees (itemID, employeeID) VALUES (${itemID}, ${employeeID})`,
					(err, res) => {
						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						// Resolve with newly-inserted ID
						resolve(res.insertId)
					}
				)
			} else {
				// Update
				let relationshipID = parseInt(this.relationshipID)

				db.pool.query(
					"UPDATE InventoryItems_Employees SET itemID = ?, employeeID = ? WHERE relationshipID = ?;",
					[itemID, employeeID, relationshipID],
					(err, res) => {
						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					}
				)
			}
		})
	}

	// Delete
	delete(relationshipID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM InventoryItems_Employees WHERE relationshipID = ${relationshipID}`, (err, res) => {
				// If there is an SQL error
				if (err) {
					reject(err)
					return
				}

				resolve(this)
			})
		})
	}
}

module.exports = ItemResponsibility
