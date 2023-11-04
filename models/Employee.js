const moment = require("moment")

// Get connection
let dbConnection = require("../db-config")

class Employee {
	constructor(id, firstName, lastName, email, jobTitle, salary) {
		this.employeeID = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.jobTitle = jobTitle
		this.startDate = new Date()
		this.endDate = new Date()
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
					let startDate = moment(row.startDate)
					let endDate = moment(row.endDate)
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
}

module.exports = Employee
