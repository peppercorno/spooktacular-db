// Get connection
let db = require("../db-config")

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
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT roomID,name, theme, maxCapacity, level, "
			sqlQuery += "EXISTS(SELECT 1 FROM Reviews r1 WHERE r1.roomID = Rooms.roomID) AS hasChildRows "
			sqlQuery += "FROM Rooms;"

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(sqlQuery, (err, rows) => {
					connection.release() // When done with the connection, release

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
		})
	}

	// Read: get all rows for dropdown menus. Limit to roomID and name only.
	static findNames() {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query("SELECT roomID, name FROM Rooms ORDER BY name ASC;", (err, rows) => {
					connection.release() // When done with the connection, release

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
		})
	}

	// Read: get one row by roomID
	static findById(roomID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`SELECT * FROM Rooms WHERE roomID = ${roomID}`, (err, res) => {
					connection.release() // When done with the connection, release

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
		})
	}

	// Create or Update 
	save() {
		return new Promise((resolve, reject) => {
			// Determine whether we are creating or updating
			if (this.roomID === undefined || this.roomID === null) {
				// Create
				if (!this.name || this.name.length === 0) throw new Error("room.add.roomnamemissing");
        		if (!this.theme || this.theme.length === 0) throw new Error("room.add.thememissing");
        		if (isNaN(this.maxCapacity)) throw new Error("room.add.maxCapacitynan");
        		if (isNaN(this.level)) throw new Error("room.add.levelnan");


				// Convert maxCapacity and level to integers
				let maxCapacity = parseInt(this.maxCapacity);
				let level = parseInt(this.level);

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(`INSERT INTO Rooms (name, theme, maxCapacity, level) VALUES ('${this.name}', '${this.theme}', ${this.maxCapacity}, ${this.level})`, (err, res) => {
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
				if (!this.name || this.name.length === 0) throw new Error("room.edit.roomnamemissing");
        		if (!this.theme || this.theme.length === 0) throw new Error("room.edit.thememissing");
        		if (isNaN(this.maxCapacity)) throw new Error("room.edit.maxCapacitynan");
        		if (isNaN(this.level)) throw new Error("room.edit.levelnan");

				// Convert maxCapacity and level to integers
				let maxCapacity = parseInt(this.maxCapacity);
				let level = parseInt(this.level);


				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(
						"UPDATE Rooms SET name = ?, theme = ?, maxCapacity = ?, level = ? WHERE roomID = ?", 
						[this.name, this.theme, this.maxCapacity, this.level, this.roomID], 
						(err, res) => {
						connection.release() // When done with the connection, release

						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					})
				})
			}
		})
	}

	// Delete
	delete(roomID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`DELETE FROM Rooms WHERE roomID = ${roomID}`, (err, res) => {
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

module.exports = Room
