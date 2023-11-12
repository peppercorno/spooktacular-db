// Get connection
let dbConnection = require("../db-config")

class Room {
	constructor(id, name, theme, maxCapacity, level, hasChildRows) {
		this.roomID = id
		this.name = name
		this.theme = theme
		this.maxCapacity = maxCapacity
		this.level = level
		this.hasChildRows = hasChildRows
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			let sqlQuery = "SELECT roomID, name, theme, maxCapacity, level, "
			sqlQuery += "EXISTS(SELECT 1 FROM Reviews r1 WHERE r1.roomID = Rooms.roomID) AS hasChildRows "
			sqlQuery += "FROM Rooms;"

			dbConnection.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let rooms = []
				for (let row of rows) {
					rooms.push(new this(row.roomID, row.name, row.theme, row.maxCapacity, row.level, row.hasChildRows))
				}
				resolve(rooms)
			})
		})
	}

	// Read: get all rows for dropdown menus. Limit to roomID and name only.
	static findNames() {
		return new Promise(resolve => {
			let sqlQuery = "SELECT roomID, name FROM Rooms ORDER BY name ASC;"
			dbConnection.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let rooms = []
				for (let row of rows) {
					rooms.push(new this(row.roomID, row.name, null, null, null, null))
				}
				resolve(rooms)
			})
		})
	}

	// Read: get one row by roomID
	static findById(roomID) {
		return new Promise(resolve => {
			dbConnection.query(`SELECT * FROM Rooms WHERE roomID = ${roomID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// res is an array. Create new class instance using data from first item in array
				let room = new this(
					res[0].roomID,
					res[0].name,
					res[0].theme,
					res[0].maxCapacity,
					res[0].level,
					res[0].hasChildRows
				)

				resolve(room)
			})
		})
	}
}

module.exports = Room
