// Get connection
let db = require("../db-config")

class Room {
	constructor(roomID, name, theme, maxCapacity, level, hasChildRows) {
		this.roomID = roomID
		this.name = name
		this.theme = theme
		this.maxCapacity = maxCapacity
		this.level = level
		this.hasChildRows = hasChildRows
	}

	// Read: get all rows
	static findAll() {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT roomID,name, theme, maxCapacity, level, "
			sqlQuery += "EXISTS(SELECT 1 FROM Reviews r1 WHERE r1.roomID = Rooms.roomID) AS hasChildRows "
			sqlQuery += "FROM Rooms;"

			db.pool.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let rooms = []
				for (let row of rows) {
					// If theme is an empty string or null, display it as "--"
					if (row.theme === "" || row.theme === null) row.theme = "--"

					// If maxCapacity is an empty string or null, display it as "--"
					if (row.maxCapacity === "" || row.maxCapacity === null) row.maxCapacity = "--"

					rooms.push(new this(row.roomID, row.name, row.theme, row.maxCapacity, row.level, row.hasChildRows))
				}
				resolve(rooms)
			})
		})
	}

	// Read: get all rows for dropdown menus. Limit to roomID and name only.
	static findNames() {
		return new Promise((resolve, reject) => {
			db.pool.query("SELECT roomID, name FROM Rooms ORDER BY name ASC;", (err, rows) => {
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
	static findByID(roomID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`SELECT * FROM Rooms WHERE roomID = ${roomID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// res is an array. Create new class instance using data from first item in array
				let room = new this(res[0].roomID, res[0].name, res[0].theme, res[0].maxCapacity, res[0].level, res[0].hasChildRows)

				resolve(room)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Validate and escape quotes
			if (!this.name || this.name.length === 0) throw new Error("nameMissing")
			if (this.maxCapacity) {
				if (isNaN(this.maxCapacity) || this.maxCapacity <= 0) throw new Error("invalidMaxCapacity")
				if (this.maxCapacity >= 100000) throw new Error("maxCapacityTooLarge")
			}
			if (!this.level) throw new Error("levelMissing")
			if (isNaN(this.level) || this.level < 1 || this.level > 4) throw new Error("invalidLevel")

			let name = this.name.replaceAll("'", "\\'")
			let theme = this.theme.replaceAll("'", "\\'")
			let maxCapacity = this.maxCapacity ? parseInt(this.maxCapacity) : null // maxCapacity is optional, so only parse it if it exists
			let level = parseInt(this.level)

			// Determine whether we are creating or updating
			if (this.roomID === undefined || this.roomID === null) {
				// Create
				db.pool.query(`INSERT INTO Rooms (name, theme, maxCapacity, level) VALUES ('${name}', '${theme}', ${maxCapacity}, ${level})`, (err, res) => {
					// If there is an SQL error
					if (err) {
						reject(err)
						return
					}

					resolve(this)
				})
			} else {
				// Update
				let roomID = parseInt(this.roomID)

				db.pool.query("UPDATE Rooms SET name = ?, theme = ?, maxCapacity = ?, level = ? WHERE roomID = ?", [name, theme, maxCapacity, level, roomID], (err, res) => {
					// If there is an SQL error
					if (err) {
						reject(err)
						return
					}

					resolve(this)
				})
			}
		})
	}

	// Delete
	delete(roomID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM Rooms WHERE roomID = ${roomID}`, (err, res) => {
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

module.exports = Room
