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
}

module.exports = InventoryItem
