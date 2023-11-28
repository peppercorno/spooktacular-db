// Get model
const Employee = require("../models/Employee")

// Show all Employees
exports.showAll = async (req, res) => {
	try {
		let employees = await Employee.findAll()

		// Whether to show success notification
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Employee #" + req.query.id + " successfully added!"
		if (req.query.success === "edited") successMessage = "Employee #" + req.query.id + " successfully edited!"
		if (req.query.success === "deleted") successMessage = "Employee #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		res.render("employees/index", { employees, successMessage, highlight })
	} catch (err) {
		console.log(err)
		res.render("employees/index", { errorMessage: "Error! Unable to retrieve employees." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	res.render("employees/add-update", { formAdd: true })
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for employee being edited
		let employeeFields = await Employee.findByID(req.params.id)

		res.render("employees/add-update", { employeeFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("employees/add-update", { errorMessage: "Oops, unable to retrieve data for this employee.", formEdit: true })
	}
}

// Add a new employee
exports.add = async (req, res) => {
	try {
		// First param: null because we don't want to fill in employeeID (it is a PK and auto-increment)
		// Follow params that Employee class requires
		let employee = new Employee(
			null,
			req.body.firstName,
			req.body.lastName,
			req.body.email,
			req.body.jobTitle,
			req.body.startDate,
			req.body.endDate,
			req.body.salary
		)

		let added = await employee.save()

		// If successful
		res.redirect("/employees/?success=added&id=" + added)
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let employeeFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add employee."
		if (err.message === "firstNameMissing") errorMessage = "First name is required."
		if (err.message === "lastNameMissing") errorMessage = "Last name is required."
		if (err.message === "jobTitleMissing") errorMessage = "Job title is required."
		if (err.message === "startDateMissing") errorMessage = "Start date is required."
		if (err.message === "endDateMissing") errorMessage = "End date is required."
		if (err.message === "salaryMissing") errorMessage = "Salary is required."
		if (err.message === "salaryNaN") errorMessage = "Please use a number for the salary."
		if (err.message === "firstNameLength" || err.message === "lastNameLength")
			errorMessage = "For first and last names, enter 2 to 60 characters."
		if (err.message === "emailMissing") errorMessage = "Email is required."

		res.render("employees/add-update", { employeeFields, errorMessage, formAdd: true })
	}
}

// Edit existing employee
exports.edit = async (req, res) => {
	try {
		let employee = new Employee(
			req.body.employeeID,
			req.body.firstName,
			req.body.lastName,
			req.body.email,
			req.body.jobTitle,
			req.body.startDate,
			req.body.endDate,
			req.body.salary
		)

		await employee.save()

		// If successful
		res.redirect("/employees/?success=edited&id=" + req.body.employeeID)
	} catch (err) {
		console.log(err)

		// To repopulate form fields after an error
		let employeeFields = req.body

		// Error messages
		let errorMessage = "Unknown error! Unable to add employee."
		if (err.message === "firstNameMissing") errorMessage = "First name is required."
		if (err.message === "lastNameMissing") errorMessage = "Last name is required."
		if (err.message === "jobTitleMissing") errorMessage = "Job title is required."
		if (err.message === "startDateMissing") errorMessage = "Start date is required."
		if (err.message === "endDateMissing") errorMessage = "End date is required."
		if (err.message === "salaryMissing") errorMessage = "Salary is required."
		if (err.message === "salaryNaN") errorMessage = "Please use a number for the salary."
		if (err.message === "firstNameLength" || err.message === "lastNameLength")
			errorMessage = "For first and last names, enter 2 to 60 characters."
		if (err.message === "emailMissing") errorMessage = "Email is required."

		res.render("employees/add-update", { employeeFields, errorMessage, formEdit: true })
	}
}

// Delete existing employee
exports.delete = async (req, res) => {
	try {
		let employee = new Employee(req.params.id, null, null, null, null, null, null, null)

		await employee.delete(req.params.id)

		// If successful
		res.redirect("/employees/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Employee not deleted."

		// Get all Employees
		let employees = await Employee.findAll()
		if (!employees || employees === null) errorMessage = "Error! Unable to retrieve employees."

		res.render("employees/index", { employees, errorMessage })
	}
}
