const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeeController')

// Routes
router.get('/', employeeController.findAll) // Retrieve all Employees

// router.post('/add', employeeController.create); // Create new Employee
// router.get('/update/:id', employeeController.findById)  // Get Employee data for update form
// router.post('/update/:id', employeeController.update)   // Update Employee
// router.delete('/delete/:id', employeeController.delete);   // Delete an Employee

module.exports = router
