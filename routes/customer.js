const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

// Routes
router.get('/', customerController.findAll) // Retrieve all Customers

// router.post('/addcustomer', customerController.create); // Create new Customer
// router.get('/updatecustomer/:id', customerController.findById)  // Get Customer data for update form
// router.post('/updatecustomer/:id', customerController.update)   // Update Customer
// router.delete('/deletecustomer/:id', customerController.delete);   // Delete a Customer

module.exports = router
