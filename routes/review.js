const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController")

// Routes
router.get("/", reviewController.render)
router.post("/add", reviewController.add) // Create new Review

// router.get("/:id", reviewController.findById
// router.post('/edit/:id', reviewController.update)   // Update Review
// router.delete('/delete/:id', reviewController.delete);   // Delete a Review

module.exports = router
