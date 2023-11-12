// Get connection
let dbConnection = require("../db-config")

class InventoryItem {
	constructor(itemID, roomID, roomName, name, itemCondition) {
		this.itemID = itemID
		this.roomID = roomID
		this.roomName = roomName
		this.name = name
		this.itemCondition = itemCondition
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			let sqlQuery =
				"SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, "
			sqlQuery += "Rooms.name AS roomName FROM InventoryItems "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID;"

			dbConnection.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let inventoryItems = []
				for (let row of rows) {
					// If roomID is null, set roomName to "--"
					if (row.roomID === undefined || row.roomID === null) row.roomName = "--"

					inventoryItems.push(new this(row.itemID, row.roomID, row.roomName, row.name, row.itemCondition))
				}
				resolve(inventoryItems)
			})
		})
	}

	// Read: get one row by itemID
	static findById(itemID) {
		return new Promise(resolve => {
			let sqlQuery =
				"SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, "
			sqlQuery += "Rooms.name AS roomName FROM InventoryItems "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID "
			sqlQuery += "WHERE InventoryItems.itemID = :itemID;"

			dbConnection.query(`SELECT * FROM InventoryItems WHERE itemID = ${itemID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// res is an array. Create new class instance using data from first item in array
				let inventoryItem = new this(res[0].itemID, res[0].roomID, res[0].roomName, res[0].name, res[0].itemCondition)

				resolve(inventoryItem)
			})
		})
	}
}

module.exports = InventoryItem
