/*Citations
------------------------------------------------------------------------
	Title: Checking how to get the ID of a newly-inserted row, so we know which row to highlight in a table.
	Date: 28 Nov 2023
	Copied from: https://www.npmjs.com/package/mysql#getting-the-id-of-an-inserted-row
	Degree of originality: We followed the documentation exactly to use res.insertId.
	Author: mysql npm creators
------------------------------------------------------------------------*/

// Get connection
let db = require("../db-config")

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
		return new Promise((resolve, reject) => {
			let sqlQuery =
				"SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, "
			sqlQuery += "Rooms.name AS roomName FROM InventoryItems "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID "
			sqlQuery += "ORDER BY itemID desc;"

			db.pool.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let inventoryItems = []
				for (let row of rows) {
					// If roomID is null, display roomName as "--"
					if (row.roomID === undefined || row.roomID === null) row.roomName = "--"

					// If item condition is an empty string or null, display it as "--"
					if (row.itemCondition === "" || row.itemCondition === null) row.itemCondition = "--"

					inventoryItems.push(new this(row.itemID, row.roomID, row.roomName, row.name, row.itemCondition))
				}
				resolve(inventoryItems)
			})
		})
	}

	// Read: get all rows for dropdown menus. Limit to itemID and name details.
	static findNames() {
		return new Promise((resolve, reject) => {
			db.pool.query("SELECT itemID, name FROM InventoryItems;", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let inventoryItems = []
				for (let row of rows) inventoryItems.push(new this(row.itemID, null, null, row.name, null))

				resolve(inventoryItems)
			})
		})
	}

	// Read: get one row by itemID
	static findByID(itemID) {
		return new Promise((resolve, reject) => {
			let sqlQuery =
				"SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, "
			sqlQuery += "Rooms.name AS roomName FROM InventoryItems "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID "
			sqlQuery += "WHERE InventoryItems.itemID = :itemID;"

			db.pool.query(`SELECT * FROM InventoryItems WHERE itemID = ${itemID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// If roomID is null, display roomName as "--"
				let roomName = res[0].roomID === undefined || res[0].roomID === null ? "--" : res[0].roomName

				// res is an array. Create new class instance using data from first item in array
				let inventoryItem = new this(res[0].itemID, res[0].roomID, roomName, res[0].name, res[0].itemCondition)

				resolve(inventoryItem)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Validate
			if (this.name.length === 0) throw new Error("nameMissing")

			// Escape quotes
			let name = this.name.replace(/(?<!')'(?!')/g, "''")

			// If no room was selected, or 'blank' option was selected, set as null. Otherwise, parse it as an int
			let roomID = this.roomID == 0 || !this.roomID ? null : parseInt(this.roomID)

			// If no item condition was entered, pass an empty string
			if (!this.itemCondition || this.itemCondition.length === 0 || this.itemCondition === "--") this.itemCondition = ""
			let itemCondition = this.itemCondition.replace(/(?<!')'(?!')/g, "''")

			// Determine whether we are creating or updating
			if (this.itemID === undefined || this.itemID === null) {
				// Create
				db.pool.query(
					`INSERT INTO InventoryItems (name, roomID, itemCondition) VALUES ('${name}', ${roomID}, '${itemCondition}')`,
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
				let itemID = parseInt(this.itemID)

				db.pool.query(
					"UPDATE InventoryItems SET name = ?, roomID = ?, itemCondition = ? WHERE itemID = ?",
					[name, roomID, itemCondition, itemID],
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
	delete(itemID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM InventoryItems WHERE itemID = ${itemID}`, (err, res) => {
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

module.exports = InventoryItem
