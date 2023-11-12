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
	constructor(id, firstName, lastName, email, hasChildRows) {
		this.customerID = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.hasChildRows = hasChildRows
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			let sqlQuery = "SELECT customerID, firstName, lastName, email, "
			sqlQuery += "(EXISTS (SELECT 1 FROM Tickets t1 WHERE t1.customerID = Customers.customerID) "
			sqlQuery += "OR EXISTS (SELECT 1 FROM Reviews r1 WHERE r1.customerID = Customers.customerID)) "
			sqlQuery += "AS hasChildRows "
			sqlQuery += "FROM Customers;"

			dbConnection.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No customer rows
					return
				}

				let customers = []
				for (let row of rows) {
					customers.push(new this(row.customerID, row.firstName, row.lastName, row.email, row.hasChildRows))
				}
				resolve(customers)
			})
		})
	}

	// Read: get all rows for dropdown menus. Limit to CustomerID and name details only.
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
					customers.push(new this(row.customerID, row.firstName, row.lastName, null, null))
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

				// res is an array. Create new class instance using data from first item in array
				let customer = new this(res[0].customerID, res[0].firstName, res[0].lastName, res[0].email, res[0].hasChildRows)

				resolve(customer)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise(resolve => {
			// Determine whether we are creating or updating
			if (this.customerID === undefined || this.customerID === null) {
				// Create
				if (this.firstName.length === 0) throw new Error("customer.add.firstnamemissing")
				if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("customer.add.firstnamelength")

				if (this.lastName.length === 0) throw new Error("customer.add.lastnamemissing")
				if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("customer.add.lastNamelength")

				if (this.email.length === 0) throw new Error("customer.add.emailmissing")
				// TODO: Add email validation using regex

				dbConnection.query(
					`INSERT INTO Customers (firstName, lastName, email) VALUES ('${this.firstName}', '${this.lastName}', '${this.email}')`,
					(err, res) => {
						if (err) {
							console.error(err)
							throw new Error("customer.sql.add")
						}
						resolve(this)
					}
				)
			} else {
				// Update
				if (this.firstName.length === 0) throw new Error("customer.edit.firstnamemissing")
				if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("customer.add.firstnamelength")

				if (this.lastName.length === 0) throw new Error("customer.edit.lastnamemissing")
				if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("customer.edit.lastNamelength")

				if (this.email.length === 0) throw new Error("customer.edit.emailmissing")
				// TODO: Add email validation using regex

				dbConnection.query(
					"UPDATE Customers SET firstName = ?, lastName = ?, email = ? WHERE customerID = ?",
					[this.firstName, this.lastName, this.email, this.customerID],
					(err, res) => {
						if (err) {
							console.error(err)
							throw new Error("customer.sql.update")
						}
						resolve(this)
					}
				)
			}
		})
	}

	// Delete
	delete(customerID) {
		return new Promise(resolve => {
			// TODO: Need to handle errors thrown when this row is a parent row

			dbConnection.query(`DELETE FROM Customers WHERE customerID = ${customerID}`, (err, res) => {
				if (err) {
					console.error(err)
					throw new Error("customer.sql.delete")
				}

				resolve(this)
			})
		})
	}
}

module.exports = Customer
