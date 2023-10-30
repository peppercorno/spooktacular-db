const express = require('express')
const router = express.Router()
const inventoryItemController = require('../controllers/inventoryItemController')

// Routes
router.get('/', inventoryItemController.findAll) // Retrieve all Inventory Items

// router.post('/additem', inventoryItemController.create); // Create new Inventory Item
// router.get('/updateitem/:id', inventoryItemController.findById)  // Get Inventory Item data for update form
// router.post('/updateitem/:id', inventoryItemController.update)   // Update Inventory Item
// router.delete('/deleteitem/:id', inventoryItemController.delete);   // Delete an Inventory Item

module.exports = router
