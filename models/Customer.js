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

	// Create or Update
	save() {
		return new Promise(resolve => {
			// Validate form data
			if (this.firstName.length === 0) throw new Error('customer.firstnamemissing')
			if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error('customer.firstnamelength')

			if (this.lastName.length === 0) throw new Error('customer.lastnamemissing')
			if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error('customer.lastNamelength')

			if (this.email.length === 0) throw new Error('customer.emailmissing')

			// Determine whether we are creating or updating
			if (this.customerID === undefined || this.customerID === null) {
				// Create
				// let startDate = this.startDate.format("YYYY-MM-DD HH:MM:SS")
				dbConnection.query(`INSERT INTO Customers (firstName, lastName, email) VALUES ('${this.firstName}', '${this.lastName}', '${this.email}')`, (err, res) => {
					if (err) {
						console.error(err)
						throw new Error('customer.sql')
					}

					// TODO: Set this.customerID using the response, if you wish

					resolve(this)
				})
			} else {
				// TODO: Update
			}
		})
	}

	// Delete
	delete() {
		// TODO: Delete
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
