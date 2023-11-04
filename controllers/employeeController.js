// Get model
const Employee = require("../models/Employee")

// Render Employees view
exports.render = async (req, res) => {
	// Get all employees
	let employees = await Employee.findAll()

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add employee." } // Default error message
	// TODO: Define error messages after setting up validation in model
	// if (error && req.query.error === "add") {
	// 	error.section = "add"
	// 	if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	// }

	// Notification above table
	let employeeAdded = req.query.added
	let employeeDeleted = req.query.removed

	// Render view
	res.render("employees", { employees, error, employeeAdded, employeeDeleted })
}
