// Get connection
let dbConnection = require("../db-config")

class Room {
	constructor(id, name, theme, maxCapacity, level) {
		this.roomID = id
		this.name = name
		this.theme = theme
		this.maxCapacity = maxCapacity
		this.level = level
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			dbConnection.query("SELECT * FROM Rooms", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let rooms = []
				for (let row of rows) {
					rooms.push(new this(row.roomID, row.name, row.theme, row.maxCapacity, row.level))
				}
				resolve(rooms)
			})
		})
	}
}

module.exports = Room
