// Get connection
let dbConnection = require("../db-config")

class AdmissionPrice {
	constructor(id, year, basePrice) {
		this.priceID = id
		this.year = year
		this.basePrice = basePrice
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			dbConnection.query("SELECT * FROM AdmissionPrices", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let admissionPrices = []
				for (let row of rows) admissionPrices.push(new this(row.priceID, row.year, row.basePrice))

				resolve(admissionPrices)
			})
		})
	}

	// Read: get one row by priceID
	static findById(priceID) {
		return new Promise(resolve => {
			dbConnection.query(`SELECT * FROM AdmissionPrices WHERE priceID = ${priceID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				let admissionPrice = []
				admissionPrice.push(new this(row.priceID, row.year, row.basePrice))

				resolve(admissionPrice)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise(resolve => {
			// Validate form data
			if (this.basePrice.length === 0) throw new Error("admissionprice.add.basepricemissing")

			// Determine whether we are creating or updating
			if (this.priceID === undefined || this.priceID === null) {
				// Create
				dbConnection.query(
					`INSERT INTO AdmissionPrices (basePrice) VALUES ('${this.basePrice}')`,
					(err, res) => {
						if (err) {
							console.error(err)
							throw new Error("admissionprice.sql")
						}
						resolve(this)
					}
				)
			} else {
				// Update
			}
		})
	}

	// Delete
	delete() {
		// TODO: Delete
	}
}

module.exports = AdmissionPrice
