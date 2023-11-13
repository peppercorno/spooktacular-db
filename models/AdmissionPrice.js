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
		return new Promise(resolve => {
			let sqlQuery = "SELECT priceID, year, basePrice, "
			sqlQuery += "EXISTS(SELECT 1 FROM Tickets t1 WHERE t1.priceID = AdmissionPrices.priceID) AS hasChildRows "
			sqlQuery += "FROM AdmissionPrices;"

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

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
		return new Promise(resolve => {
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
					let admissionPrice = new this(res[0].priceID, res[0].year, res[0].basePrice, res[0].hasChildRows)

					resolve(admissionPrice)
				})
			})
		})
	}
}

module.exports = AdmissionPrice
