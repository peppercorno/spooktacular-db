// Get model
const Employee = require("../models/Employee")

// Render Employees view
exports.render = async (req, res) => {
	// Get all employees
	let employees = await Employee.findAll()
	let employeeBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add employee." } // Default error message
	if (error) {
		// Custom error messages
		if (req.query.type === "firstnamemissing") error.message = "First name is required."
		if (req.query.type === "lastnamemissing") error.message = "Last name is required."
		if (req.query.type === "emailmissing") error.message = "Email is required."
		if (req.query.type === "jobtitlemissing") error.message = "Job title is required."
		if (req.query.type === "salarymissing") error.message = "Salary is required."
		if (req.query.type === "salarynan") error.message = "Salary must be a number."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		employeeBeingEdited = await Employee.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show 'not deleted' notification
	if (error && req.query.error === "notdeleted") error.section = "notdeleted"

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("employees", { employees, error, success, employeeBeingEdited })
}

// Add a new employee
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in employeeID (it is a PK and auto-increment)
		let employee = new Employee(null, req.body.firstName, req.body.lastName, req.body.email, req.body.jobTitle, req.body.startDate, req.body.endDate, req.body.salary)

		await employee.save()

		// If successful
		res.redirect("/employees/?success=added")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 12) === "employee.add") {
			res.redirect("/employees/?error=add&type=" + err.message.substring(13))
		} else res.redirect("/employees/?error=add&type=unknown")
	}
}

// Edit existing employee
exports.edit = async (req, res) => {
	try {
		let employee = new Employee(req.body.employeeID, req.body.firstName, req.body.lastName, req.body.email, req.body.jobTitle, req.body.startDate, req.body.endDate, req.body.salary)

		await employee.save()

		// If successful
		res.redirect("/employees/?success=edited")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation errors, check the prefix
		if (err.message.substring(0, 13) === "employee.edit") {
			res.redirect("/employees/?error=edit&type=" + err.message.substring(14) + "&id=" + req.body.employeeID)
		} else res.redirect("/employees/?error=edit&type=unknown" + "&id=" + req.body.employeeID)
	}
}

// Delete existing employee
exports.delete = async (req, res) => {
	try {
		let employee = new Employee(req.params.id, "", "", "")

		await employee.delete(req.params.id)

		// If successful
		res.redirect("/employees/?success=deleted")
	} catch (err) {
		console.log(err)
		res.redirect("/employees/?error=notdeleted")
	}
}
