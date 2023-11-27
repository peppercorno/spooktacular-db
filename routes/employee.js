const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employeeController")

// Routes
router.get("/", employeeController.showAll) // Show table
// router.get("/add", employeeController.showAdd) // Show 'Add' form
// router.get("/edit/:id", employeeController.showEdit) // Show 'Edit' form

router.post("/add", employeeController.add) // Create new Employee
router.post("/edit", employeeController.edit) // Edit an Employee

router.get("/delete/:id", employeeController.delete) // Delete an Employee

module.exports = router
