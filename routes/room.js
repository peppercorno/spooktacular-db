const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')

// Routes
router.get('/', roomController.findAll) // Retrieve all Rooms

// router.post('/addroom', roomController.create); // Create new Room
// router.get('/updateroom/:id', roomController.findById)  // Get Room data for update form
// router.post('/updateroom/:id', roomController.update)   // Update Room
// router.delete('/deleteroom/:id', roomController.delete);   // Delete a room

module.exports = router
