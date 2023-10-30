const express = require('express')
const router = express.Router()
const inventoryItemController = require('../controllers/inventoryItemController')

// Routes
router.get('/', inventoryItemController.findAll) // Retrieve all Inventory Items

// router.post('/add', inventoryItemController.create); // Create new Inventory Item
// router.get('/update/:id', inventoryItemController.findById)  // Get Inventory Item data for update form
// router.post('/update/:id', inventoryItemController.update)   // Update Inventory Item
// router.delete('/delete/:id', inventoryItemController.delete);   // Delete an Inventory Item

module.exports = router
