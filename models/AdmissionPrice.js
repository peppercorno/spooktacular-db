// Get connection
let db = require("../db-config")

class AdmissionPrice {
	constructor(id, year, basePrice, hasChildRows) {
		this.priceID = id
		this.year = year
		this.basePrice = basePrice
		this.hasChildRows = hasChildRows
	}

	// Read: get all rows
	static findAll() {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				let sqlQuery = "SELECT priceID, year, basePrice, "
				sqlQuery += "EXISTS(SELECT 1 FROM Tickets t1 WHERE t1.priceID = AdmissionPrices.priceID) AS hasChildRows "
				sqlQuery += "FROM AdmissionPrices ORDER BY year DESC;"

				connection.query(sqlQuery, (err, rows) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([]) // No rows
						return
					}

					let admissionPrices = []
					for (let row of rows) admissionPrices.push(new this(row.priceID, row.year, row.basePrice, row.hasChildRows))

					resolve(admissionPrices)
				})
			})
		})
	}

	// Read: get one row by priceID
	static findById(priceID) {
		return new Promise((resolve, reject) => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`SELECT * FROM AdmissionPrices WHERE priceID = ${priceID}`, (err, res) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([])
						return
					}

					// res is an array. Create new class instance using data from first item in array
					let admissionPrice = new this(res[0].priceID, res[0].year, res[0].basePrice, null)

					resolve(admissionPrice)
				})
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Determine whether we are creating or updating
			if (this.priceID === undefined || this.priceID === null) {
				// Create
				if (!this.year || this.year.length === 0) throw new Error("admission.add.yearmissing")
				if (isNaN(this.year)) throw new Error("admission.add.yearnan")

				if (!this.basePrice || this.basePrice.length === 0) throw new Error("admission.add.basepricemissing")
				if (isNaN(this.basePrice)) throw new Error("admission.add.basepricenan")

				let year = parseInt(this.year)
				let basePrice = parseInt(this.basePrice)

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(`INSERT INTO AdmissionPrices (year, basePrice) VALUES (${year}, ${basePrice})`, (err, res) => {
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
				if (!this.year || this.year.length === 0) throw new Error("admission.edit.yearmissing")
				if (isNaN(this.year)) throw new Error("admission.edit.yearnan")

				if (!this.basePrice || this.basePrice.length === 0) throw new Error("admission.edit.basepricemissing")
				if (isNaN(this.basePrice)) throw new Error("admission.edit.basepricenan")

				let year = parseInt(this.year)
				let basePrice = parseInt(this.basePrice)

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query("UPDATE AdmissionPrices SET year = ?, basePrice = ? WHERE priceID = ?", [year, basePrice, this.priceID], (err, res) => {
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
	delete(priceID) {
		return new Promise((resolve, reject) => {
			// TODO: Handle errors if this row is a parent row

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`DELETE FROM AdmissionPrices WHERE priceID = ${priceID}`, (err, res) => {
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

module.exports = AdmissionPrice
