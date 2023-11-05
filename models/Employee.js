const moment = require("moment")

// Get connection
let dbConnection = require("../db-config")

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
			dbConnection.query("SELECT * FROM Employees", (err, rows) => {
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
	}

	// Read: get one row by priceID
	static findById(employeeID) {
		return new Promise(resolve => {
			dbConnection.query(`SELECT * FROM Employees WHERE employeeID = ${employeeID}`, (err, res) => {
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
	/*save() {
		return new Promise(resolve => {
			// TODO: Validate form data

			// Determine whether we are creating or updating
			if (this.customerID === undefined || this.customerID === null) {
				// Create

				// TODO: Insert query
				let sqlQuery = "INSERT INTO Employees ()"

				// Format dates to fit DB requirements
				// let startDate = this.startDate.format("YYYY-MM-DD HH:MM:SS")
				// let endDate = this.endDate.format("YYYY-MM-DD HH:MM:SS")

				dbConnection.query(sqlQuery, (err, res) => {
					if (err) {
						console.error(err)
						throw new Error("employees.sql")
					}
					resolve(this)
				})
			} else {
				// Update
			}
		})
	}*/
}

module.exports = Employee
