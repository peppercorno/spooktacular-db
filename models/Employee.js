const moment = require("moment")

// Get connection
let db = require("../db-config")

class Employee {
	constructor(employeeID, firstName, lastName, email, jobTitle, startDate, endDate, salary) {
		this.employeeID = employeeID
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

					employees.push(
						new this(
							row.employeeID,
							row.firstName,
							row.lastName,
							row.email,
							row.jobTitle,
							startDate,
							endDate,
							row.salary
						)
					)
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
	static findByID(employeeID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`SELECT * FROM Employees WHERE employeeID = ${employeeID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// Format dates
				let startDate = moment(res[0].startDate).format("YYYY-MM-DD")
				let endDate = moment(res[0].endDate).format("YYYY-MM-DD")

				// res is an array. Create new class instance using data from first item in array
				let employee = new this(
					res[0].employeeID,
					res[0].firstName,
					res[0].lastName,
					res[0].email,
					res[0].jobTitle,
					startDate,
					endDate,
					res[0].salary
				)

				resolve(employee)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Validate
			if (this.firstName.length === 0) throw new Error("firstNameMissing")
			if (this.firstName.length < 2 || this.firstName.length > 60) throw new Error("firstNameLength")
			if (this.lastName.length === 0) throw new Error("lastNameMissing")
			if (this.lastName.length < 2 || this.lastName.length > 60) throw new Error("lastNameLength")
			if (this.email.length === 0) throw new Error("emailMissing")
			// TODO: Add email validation using regex
			if (this.jobTitle.length === 0) throw new Error("jobTitleMissing")
			if (this.salary.length === 0) throw new Error("salaryMissing")
			if (isNaN(this.salary)) throw new Error("salaryNaN")
			if (this.startDate === "" || this.startDate === null) throw new Error("startDateMissing")
			if (this.endDate === "" || this.endDate === null) throw new Error("endDateMissing")

			// Escape quotes
			let firstName = this.firstName.replaceAll("'", "''")
			let lastName = this.lastName.replaceAll("'", "''")
			let jobTitle = this.jobTitle.replaceAll("'", "''")

			// Parse as int
			let salary = parseInt(this.salary)

			// Use expected date format
			let startDate = moment(this.startDate).format("YYYY-MM-DD hh:mm:ss")
			let endDate = moment(this.endDate).format("YYYY-MM-DD hh:mm:ss")

			// Determine whether we are creating or updating
			if (this.employeeID === undefined || this.employeeID === null) {
				// Create
				db.pool.query(
					`INSERT INTO Employees (firstName, lastName, email, jobTitle, startDate, endDate, salary) VALUES ('${firstName}', '${lastName}', '${this.email}', '${jobTitle}', '${startDate}', '${endDate}', ${salary})`,
					(err, res) => {
						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					}
				)
			} else {
				// Update
				let employeeID = parseInt(this.employeeID)

				db.pool.query(
					"UPDATE Employees SET firstName = ?, lastName = ?, email = ?, jobTitle = ?, startDate = ?, endDate = ?, salary = ? WHERE employeeID = ?",
					[firstName, lastName, this.email, jobTitle, startDate, endDate, salary, employeeID],
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
