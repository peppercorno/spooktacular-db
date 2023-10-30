const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeeController')

// Routes
router.get('/', employeeController.findAll) // Retrieve all Employees

// router.post('/addemployee', employeeController.create); // Create new Employee
// router.get('/updateemployee/:id', employeeController.findById)  // Get Employee data for update form
// router.post('/updateemployee/:id', employeeController.update)   // Update Employee
// router.delete('/deleteemployee/:id', employeeController.delete);   // Delete an Employee

module.exports = router
