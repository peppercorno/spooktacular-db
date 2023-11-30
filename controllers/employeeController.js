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

		let addedID = await employee.save()

		// If successful
		res.redirect("/employees/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// Refill form fields after an error
		let employeeFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to add employee."

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

		// Refill form fields after an error
		let employeeFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message) ?? "Unknown error! Unable to edit employee."

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

let defineErrorMessage = errType => {
	if (errType === "firstNameMissing") return "First name is required."
	if (errType === "lastNameMissing") return "Last name is required."
	if (errType === "jobTitleMissing") return "Job title is required."
	if (errType === "startDateMissing") return "Start date is required."
	if (errType === "endDateMissing") return "End date is required."
	if (errType === "invalidDates") return "End date must be later than start date."
	if (errType === "salaryMissing") return "Salary is required."
	if (errType === "salaryNaN") return "Please use a number for the salary."
	if (errType === "firstNameLength" || errType === "lastNameLength")
		return "For first and last names, enter 2 to 60 characters."
	if (errType === "emailMissing") return "Email is required."
	return
}
