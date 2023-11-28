// Get connection
let db = require("../db-config")

class AdmissionPrice {
	constructor(priceID, year, description, basePrice, hasChildRows) {
		this.priceID = priceID
		this.year = year
		this.description = description
		this.basePrice = basePrice
		this.hasChildRows = hasChildRows
	}

	// Read: get all rows
	static findAll() {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT priceID, year, description, basePrice, "
			sqlQuery += "EXISTS(SELECT 1 FROM Tickets t1 WHERE t1.priceID = AdmissionPrices.priceID) AS hasChildRows "
			sqlQuery += "FROM AdmissionPrices ORDER BY year DESC;"

			db.pool.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let admissionPrices = []
				for (let row of rows) {
					admissionPrices.push(new this(row.priceID, row.year, row.description, row.basePrice, row.hasChildRows))
				}
				resolve(admissionPrices)
			})
		})
	}

	// Read: for dropdown menu when creating a ticket. Limit to current year only.
	static findByCurrentYear() {
		return new Promise((resolve, reject) => {
			db.pool.query(
				"SELECT * FROM AdmissionPrices WHERE year = YEAR(CURDATE()) ORDER BY description ASC;",
				(err, rows) => {
					if (err) {
						console.error(err)
						resolve([]) // No rows
						return
					}

					let admissionPrices = []
					for (let row of rows) {
						admissionPrices.push(new this(row.priceID, row.year, row.description, row.basePrice, null))
					}
					resolve(admissionPrices)
				}
			)
		})
	}

	// Read: get one row by priceID
	static findByID(priceID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`SELECT * FROM AdmissionPrices WHERE priceID = ${priceID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// res is an array. Create new class instance using data from first item in array
				let admissionPrice = new this(res[0].priceID, res[0].year, res[0].description, res[0].basePrice, null)

				resolve(admissionPrice)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Validate
			if (!this.year || this.year.length === 0) throw new Error("yearMissing")
			if (isNaN(this.year)) throw new Error("yearNaN")

			if (!this.description || this.description.length === 0) throw new Error("descriptionMissing")

			if (!this.basePrice || this.basePrice.length === 0) throw new Error("basePriceMissing")
			if (isNaN(this.basePrice)) throw new Error("basePriceNaN")

			// Parse as int
			let year = parseInt(this.year)
			let basePrice = parseInt(this.basePrice)

			// Escape quotes
			let description = this.description.replace(/(?<!')'(?!')/g, "''")

			// Determine whether we are creating or updating
			if (this.priceID === undefined || this.priceID === null) {
				// Create

				db.pool.query(
					`INSERT INTO AdmissionPrices (year, description, basePrice) VALUES (${year}, '${description}', ${basePrice})`,
					(err, res) => {
						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					}
				)
			} else {
				// Update
				let priceID = parseInt(this.priceID)

				db.pool.query(
					"UPDATE AdmissionPrices SET year = ?, description = ?, basePrice = ? WHERE priceID = ?",
					[year, description, basePrice, priceID],
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
	delete(priceID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM AdmissionPrices WHERE priceID = ${priceID}`, (err, res) => {
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

module.exports = AdmissionPrice
