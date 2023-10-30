const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

// Routes
router.get('/', reviewController.findAll) // Retrieve all Reviews

// router.post('/addreview', reviewController.create); // Create new Review
// router.get('/updatereview/:id', reviewController.findById)  // Get Review data for update form
// router.post('/updatereview/:id', reviewController.update)   // Update Review
// router.delete('/deletereview/:id', reviewController.delete);   // Delete a review

module.exports = router
