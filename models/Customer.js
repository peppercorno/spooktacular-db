/*Citations
------------------------------------------------------------------------
	Title: Reference for MVC structure, though our model is not an object. We use a class and promises instead.
	Date: 3 Nov 2023
	Adapted from URL: https://github.com/rahulguptafullstack/node-mysql-crud-app/blob/master/src/models/employee.model.js
	Author: Rahul Gupta

	Title: Checking how to use promises in JS
	Date: 3 Nov 2023
	Adapted from URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	Author: MDN Contributors
------------------------------------------------------------------------*/

// Get connection
let dbConnection = require("./../db-config")

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
			dbConnection.query("SELECT * FROM Customers", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No customer rows
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
			if (this.firstName.length === 0) throw new Error("customer.add.firstnamemissing")
			if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("customer.add.firstnamelength")

			if (this.lastName.length === 0) throw new Error("customer.add.lastnamemissing")
			if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("customer.add.lastNamelength")

			if (this.email.length === 0) throw new Error("customer.add.emailmissing")
			// TODO: Add email validation

			// Determine whether we are creating or updating
			if (this.customerID === undefined || this.customerID === null) {
				// Create
				// let startDate = this.startDate.format("YYYY-MM-DD HH:MM:SS")
				dbConnection.query(
					`INSERT INTO Customers (firstName, lastName, email) VALUES ('${this.firstName}', '${this.lastName}', '${this.email}')`,
					(err, res) => {
						if (err) {
							console.error(err)
							throw new Error("customer.sql")
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

module.exports = Customer
