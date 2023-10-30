const express = require('express')
const router = express.Router()
const admissionPriceController = require('../controllers/admissionPriceController')

// Routes
router.get('/', admissionPriceController.findAll) // Retrieve all Admission Prices

// router.post('/addprice', admissionPriceController.create); // Create new Admission Price
// router.get('/updateprice/:id', admissionPriceController.findById)  // Get Admission Price data for update form
// router.post('/updateprice/:id', admissionPriceController.update)   // Update Admission Price
// router.delete('/deleteprice/:id', admissionPriceController.delete);   // Delete an Admission Price

module.exports = router
