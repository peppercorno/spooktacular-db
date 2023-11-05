// Get connection
let dbConnection = require("../db-config")

class InventoryItem {
	constructor(itemID, roomID, name, itemCondition) {
		this.itemID = itemID
		this.roomID = roomID
		this.name = name
		this.itemCondition = itemCondition
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			dbConnection.query("SELECT * FROM InventoryItems", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let inventoryItems = []
				for (let row of rows) {
					inventoryItems.push(new this(row.itemID, row.roomID, row.name, row.itemCondition))
				}
				resolve(inventoryItems)
			})
		})
	}

	// Read: get one row by itemID
	static findById(itemID) {
		return new Promise(resolve => {
			dbConnection.query(`SELECT * FROM InventoryItems WHERE itemID = ${itemID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// res is an array. Create new class instance using data from first item in array
				let inventoryItem = new this(res[0].itemID, res[0].roomID, res[0].name, res[0].itemCondition)

				resolve(inventoryItem)
			})
		})
	}
}

module.exports = InventoryItem
