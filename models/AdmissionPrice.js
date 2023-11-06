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

	// Create or Update
	save() {
    	return new Promise(resolve => {
        	// Determine whether we are creating or updating
        	if (this.priceID === undefined || this.priceID === null) {
            	// Create
            	if (this.year.length === 0) throw new Error("admission.add.yearmissing");
            	// Add other validation rules as needed

            	if (this.basePrice.length === 0) throw new Error("admission.add.basepricemissing");
            	// Add other validation rules as needed

            	// TODO: Add email validation using regex if needed

            	dbConnection.query(`INSERT INTO AdmissionPrices (year, basePrice) VALUES ('${this.year}', '${this.basePrice}')`, (err, res) => {
                	if (err) {
                    	console.error(err);
                    	throw new Error("admission.sql");
                	}
                	resolve(this);
            	});
        	} else {
            	// Update
            	if (this.year.length === 0) throw new Error("admission.edit.yearmissing");

            	if (this.basePrice.length === 0) throw new Error("admission.edit.basepricemissing");

            	// TODO: Add email validation using regex

            	dbConnection.query("UPDATE AdmissionPrices SET year = ?, basePrice = ? WHERE priceID = ?", [this.year, this.basePrice, this.priceID], (err, res) => {
                	if (err) {
                    	console.error(err);
                    	throw new Error("admission-prices.sql");
               		}
                	resolve(this);
            	});
        	}
    	});
	}

	// Delete
	delete(priceID) {
    	return new Promise(resolve => {
        	// TODO: Handle errors if this row is a parent row

        	dbConnection.query(`DELETE FROM AdmissionPrices WHERE priceID = ${priceID}`, (err, res) => {
            	if (err) {
                	console.error(err);
                	throw new Error("admission.sql");
            	}

            	resolve(this);
        	});
    	});
  	}
}

module.exports = AdmissionPrice
