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

				// res is an array. Create new class instance using data from first item in array
				let admissionPrice = new this(res[0].priceID, res[0].year, res[0].basePrice)

				resolve(admissionPrice)
			})
		})
	}
}

module.exports = AdmissionPrice
