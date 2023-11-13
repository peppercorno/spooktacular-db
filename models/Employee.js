const moment = require("moment")

// Get connection
let db = require("../db-config")

class Employee {
	constructor(id, firstName, lastName, email, jobTitle, startDate, endDate, salary) {
		this.employeeID = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.jobTitle = jobTitle
		this.startDate = startDate
		this.endDate = endDate
		this.salary = salary
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query("SELECT * FROM Employees", (err, rows) => {
					if (err) {
						console.error(err)
						resolve([]) // No rows
						return
					}

					let employees = []
					for (let row of rows) {
						// Format dates
						let startDate = moment(row.startDate).format("MMM D YYYY")
						let endDate = moment(row.endDate).format("MMM D YYYY")
						employees.push(new this(row.employeeID, row.firstName, row.lastName, row.email, row.jobTitle, startDate, endDate, row.salary))
					}
					resolve(employees)
				})
			})
		})
	}

	// Read: get all rows for dropdown menus. Limit to employeeID and name details.
	static findNames() {
		return new Promise(resolve => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query("SELECT employeeID, firstName, lastName FROM Employees ORDER BY employeeID ASC;", (err, rows) => {
					if (err) {
						console.error(err)
						resolve([]) // No rows
						return
					}

					let employees = []
					for (let row of rows) {
						employees.push(new this(row.employeeID, row.firstName, row.lastName, null, null, null, null, null))
					}
					resolve(employees)
				})
			})
		})
	}

	// Read: get one row by priceID
	static findById(employeeID) {
		return new Promise(resolve => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`SELECT * FROM Employees WHERE employeeID = ${employeeID}`, (err, res) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([])
						return
					}

					// res is an array. Create new class instance using data from first item in array
					let employee = new this(res[0].employeeID, res[0].firstName, res[0].lastName, res[0].email, res[0].jobTitle, res[0].startDate, res[0].endDate, res[0].salary)

					resolve(employee)
				})
			})
		})
	}

	// Create or Update
	save() {
		return new Promise(resolve => {
			// Determine whether we are creating or updating
			if (this.employeeID === undefined || this.employeeID === null) {
				// Create
				if (this.firstName.length === 0) throw new Error("employee.add.firstnamemissing")
				if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("employee.add.firstnamelength")

				if (this.lastName.length === 0) throw new Error("employee.add.lastnamemissing")
				if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("employee.add.lastNamelength")

				if (this.email.length === 0) throw new Error("employee.add.emailmissing")
				// TODO: Add email validation using regex

				// TODO: Parse startDate and endDate
				let startDate = this.startDate
				let endDate = this.endDate

				let sqlQuery = "INSERT INTO Employees (firstName, lastName, email, jobTitle, startDate, endDate, salary) "
				sqlQuery += " VALUES ('" + this.firstName + "', '" + this.lastName + "', '" + this.email
				sqlQuery += "', '" + this.jobTitle + "', '" + startDate + "', '" + endDate + "', " + this.salary + "');"

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query(sqlQuery, (err, res) => {
						connection.release() // When done with the connection, release

						if (err) {
							console.error(err)
							throw new Error("employee.sql.add")
						}
						resolve(this)
					})
				})
			} else {
				// Update
				if (this.firstName.length === 0) throw new Error("employee.edit.firstnamemissing")
				if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("employee.add.firstnamelength")

				if (this.lastName.length === 0) throw new Error("employee.edit.lastnamemissing")
				if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("employee.edit.lastNamelength")

				if (this.email.length === 0) throw new Error("employee.edit.emailmissing")
				// TODO: Add email validation using regex

				db.pool.getConnection((err, connection) => {
					if (err) console.error(err) // Not connected

					connection.query("UPDATE Employees SET firstName = ?, lastName = ?, email = ? WHERE employeeID = ?", [this.firstName, this.lastName, this.email, this.employeeID], (err, res) => {
						connection.release() // When done with the connection, release

						if (err) {
							console.error(err)
							throw new Error("employee.sql.update")
						}
						resolve(this)
					})
				})
			}
		})
	}

	// Delete
	delete(employeeID) {
		return new Promise(resolve => {
			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(`DELETE FROM Customers WHERE employeeID = ${employeeID}`, (err, res) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						throw new Error("employee.sql.delete")
					}

					resolve(this)
				})
			})
		})
	}
}

module.exports = Employee
