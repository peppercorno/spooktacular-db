// Get connection
let dbConnection = require("../db-config")

// Represents a row in intersection table, InventoryItem_Employees
// ie. a relationship between one Inventory Item and one Employee
class InventoryItemEmployee {
	constructor(itemID, employeeID, itemName, employeeFullName) {
		this.itemID = itemID
		this.employeeID = employeeID
		this.itemName = itemName
		this.employeeFullName = employeeFullName
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			let sqlQuery = "SELECT InventoryItems_Employees.itemID, InventoryItems_Employees.employeeID, "
			sqlQuery += "InventoryItems.name AS itemName, "
			sqlQuery += "CONCAT(Employees.firstName, ' ', Employees.lastName) as employeeFullName  "
			sqlQuery += "FROM InventoryItems_Employees "
			sqlQuery += "INNER JOIN InventoryItems ON InventoryItems.itemID = InventoryItems_Employees.itemID "
			sqlQuery += "INNER JOIN Employees ON Employees.employeeID = InventoryItems_Employees.employeeID;"

			dbConnection.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let inventoryItems = []
				for (let row of rows)
					inventoryItems.push(new this(row.itemID, row.employeeID, row.itemName, row.employeeFullName))

				resolve(inventoryItems)
			})
		})
	}

	// Read: get one row by composite PK
	static findByIDs(itemID, employeeID) {
		return new Promise(resolve => {
			dbConnection.query(
				`SELECT * FROM InventoryItems WHERE (itemID = ${itemID} AND employeeID = ${employeeID}`,
				(err, res) => {
					if (err) {
						console.error(err)
						resolve([])
						return
					}

					// res is an array. Create new class instance using data from first item in array
					let row = new this(res[0].itemID, res[0].roomID, res[0].itemName, res[0].employeeFullName)

					resolve(row)
				}
			)
		})
	}
}

module.exports = InventoryItemEmployee
