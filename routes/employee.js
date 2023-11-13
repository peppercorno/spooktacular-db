const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employeeController")

// Routes
router.get("/", employeeController.render)
router.post("/add", employeeController.add) // Create new Employee
router.post("/edit", employeeController.edit) // Edit Employee
router.get("/delete/:id", employeeController.delete) // Delete a Employee

module.exports = router
