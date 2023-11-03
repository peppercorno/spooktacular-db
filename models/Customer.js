// Get connection
let dbConnection = require('./../db-config')

class Customer {
	constructor(id, firstName, lastName, email) {
		this.customerID = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
	}

	// Read
	static findAll() {
		return new Promise(resolve => {
			dbConnection.query('SELECT * FROM Customers', (err, rows) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				let customers = []
				for (let row of rows) {
					// let startDate = moment(row.startDate)
					customers.push(new this(row.customerID, row.firstName, row.lastName, row.email))
				}
				resolve(customers)
			})
		})
	}

	// Create / Update
	save() {
		return new Promise(resolve => {
			// Validate
			if (this.firstName.length === 0) throw new Error('customer.nofirstname')
			if (this.firstName.length < 2) throw new Error('customer.firstnamelength')
			// TODO: Validate the rest

			// Determine if we should create or update
			if (this.customerID === undefined || this.customerID === null) {
				// Create
				// let startDate = this.startDate.format("YYYY-MM-DD HH:MM:SS")
				dbConnection.query(`INSERT INTO Customers (firstName, lastName, email) VALUES ('${this.firstName}', '${this.lastName}', '${this.email}')`, (err, rows) => {
					if (err) {
						console.error(err)
						throw new Error('customer.sql')
					}

					// TODO: Set this.customerID using the response

					resolve(this)
				})
			} else {
				// Update
				// TODO
			}
		})
	}

	// Delete
	delete() {
		// TODO
	}
}

module.exports = Customer

// Citations
//-------------------
/*	Title: Checking how to use promises in JS
	Date: 3 Nov 2023
	Adapted from URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	Author: MDN Contributors
*/
