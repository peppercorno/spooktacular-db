const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')

// Routes
router.get('/', ticketController.findAll) // Retrieve all Tickets

// router.post('/add', ticketController.create); // Create new Ticket
// router.delete('/delete/:id', ticketController.delete);   // Delete a Ticket

module.exports = router
