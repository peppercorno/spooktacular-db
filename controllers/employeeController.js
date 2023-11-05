// Get model
const Employee = require("../models/Employee")

// Render Employees view
exports.render = async (req, res) => {
	// Get all employees
	let employees = await Employee.findAll()
	let employeeBeingEdited = ""

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") {
		employeeBeingEdited = await Employee.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("employees", { employees, error, success, employeeBeingEdited })
}
