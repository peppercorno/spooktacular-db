const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

// Routes
router.get('/', reviewController.findAll) // Retrieve all Reviews

// router.post('/add', reviewController.create); // Create new Review
// router.get('/update/:id', reviewController.findById)  // Get Review data for update form
// router.post('/update/:id', reviewController.update)   // Update Review
// router.delete('/delete/:id', reviewController.delete);   // Delete a review

module.exports = router
