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
let dbConnection = require("../db-config")

class Customer {
	constructor(id, firstName, lastName, email) {
		this.customerID = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
	}

	// Read: get all rows
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
					customers.push(new this(row.customerID, row.firstName, row.lastName, row.email))
				}
				resolve(customers)
			})
		})
	}

	// Read: get all rows, customerID and full name only, for dropdown menus
	static findFullNames() {
		return new Promise(resolve => {
			let sqlQuery = "SELECT customerID, firstName, lastName FROM Customers;"

			dbConnection.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No customer rows
					return
				}

				let customers = []
				for (let row of rows) {
					customers.push(new this(row.customerID, row.firstName, row.lastName, ""))
				}
				resolve(customers)
			})
		})
	}

	// Read: get one row by customerID
	static findById(customerID) {
		return new Promise(resolve => {
			dbConnection.query(`SELECT * FROM Customers WHERE customerID = ${customerID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				let customer = []
				customer.push(new this(row.customerID, row.firstName, row.lastName, row.email))

				resolve(customer)
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
