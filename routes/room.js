const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')

// Routes
router.get('/', roomController.findAll) // Retrieve all Rooms

// router.post('/add', roomController.create); // Create new Room
// router.get('/update/:id', roomController.findById)  // Get Room data for update form
// router.post('/update/:id', roomController.update)   // Update Room
// router.delete('/delete/:id', roomController.delete);   // Delete a room

module.exports = router
