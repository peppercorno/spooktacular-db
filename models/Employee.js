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
		return new Promise((resolve, reject) => {
			db.pool.query("SELECT * FROM Employees", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let employees = []
				for (let row of rows) {
					// Format dates
					let startDate = moment(row.startDate).format("YYYY-MM-DD")
					let endDate = moment(row.endDate).format("YYYY-MM-DD")
					employees.push(new this(row.employeeID, row.firstName, row.lastName, row.email, row.jobTitle, startDate, endDate, row.salary))
				}
				resolve(employees)
			})
		})
	}

	// Read: get all rows for dropdown menus. Limit to employeeID and name details.
	static findNames() {
		return new Promise((resolve, reject) => {
			db.pool.query("SELECT employeeID, firstName, lastName FROM Employees ORDER BY employeeID ASC;", (err, rows) => {
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
	}

	// Read: get one row by priceID
	static findById(employeeID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`SELECT * FROM Employees WHERE employeeID = ${employeeID}`, (err, res) => {
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
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Determine whether we are creating or updating
			if (this.employeeID === undefined || this.employeeID === null) {
				// Create
				if (this.firstName.length === 0) throw new Error("employee.add.firstnamemissing")
				if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("employee.add.firstnamelength")

				if (this.lastName.length === 0) throw new Error("employee.add.lastnamemissing")
				if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("employee.add.lastNamelength")

				if (this.email.length === 0) throw new Error("employee.add.emailmissing")
				// TODO: Add email validation using regex

				if (this.jobTitle.length === 0) throw new Error("employee.add.jobtitlemissing")
				if (this.salary.length === 0) throw new Error("employee.add.salarymissing")
				if (isNaN(this.salary)) throw new Error("admission.add.salarynan")

				let salary = parseInt(this.salary)

				// Format startDate and endDate for DB
				let startDate = moment(this.startDate).format("YYYY-MM-DD hh:mm:ss")
				let endDate = moment(this.endDate).format("YYYY-MM-DD hh:mm:ss")

				let sqlQuery = "INSERT INTO Employees (firstName, lastName, email, jobTitle, startDate, endDate, salary) "
				sqlQuery += " VALUES ('" + this.firstName + "', '" + this.lastName + "', '" + this.email
				sqlQuery += "', '" + this.jobTitle + "', '" + startDate + "', '" + endDate + "', " + salary + ");"

				db.pool.query(sqlQuery, (err, res) => {
					// If there is an SQL error
					if (err) {
						reject(err)
						return
					}

					resolve(this)
				})
			} else {
				// Update
				if (this.firstName.length === 0) throw new Error("employee.edit.firstnamemissing")
				if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("employee.edit.firstnamelength")

				if (this.lastName.length === 0) throw new Error("employee.edit.lastnamemissing")
				if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("employee.edit.lastNamelength")

				if (this.email.length === 0) throw new Error("employee.edit.emailmissing")
				// TODO: Add email validation using regex

				if (this.jobTitle.length === 0) throw new Error("employee.edit.jobtitlemissing")
				if (this.salary.length === 0) throw new Error("employee.edit.salarymissing")
				if (isNaN(this.salary)) throw new Error("admission.edit.salarynan")

				let salary = parseInt(this.salary)

				// Format startDate and endDate for DB
				let startDate = moment(this.startDate).format("YYYY-MM-DD hh:mm:ss")
				let endDate = moment(this.endDate).format("YYYY-MM-DD hh:mm:ss")

				db.pool.query(
					"UPDATE Employees SET firstName = ?, lastName = ?, email = ?, jobTitle = ?, startDate = ?, endDate = ?, salary = ? WHERE employeeID = ?",
					[this.firstName, this.lastName, this.email, this.jobTitle, startDate, endDate, salary, this.employeeID],
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
	delete(employeeID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM Employees WHERE employeeID = ${employeeID}`, (err, res) => {
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

module.exports = Employee
