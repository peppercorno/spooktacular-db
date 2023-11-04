const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employeeController")

// Routes
router.get("/", employeeController.render)
router.post("/add", employeeController.add) // Create new Employee

// router.get("/:id", employeeController.findById
// router.post('/edit/:id', employeeController.update)   // Update Employee
// router.delete('/delete/:id', employeeController.delete);   // Delete a Employee

module.exports = router
