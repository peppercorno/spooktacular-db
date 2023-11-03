const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

// Routes
router.get('/', customerController.render)
router.post('/add', customerController.add) // Create new Customer

// router.get('/update/:id', customerController.findById)  // Get Customer data for update form
// router.post('/update/:id', customerController.update)   // Update Customer
// router.delete('/delete/:id', customerController.delete);   // Delete a Customer

module.exports = router
