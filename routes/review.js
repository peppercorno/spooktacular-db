const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController")

// Routes
router.get("/", reviewController.showAll) // Show table
// router.get("/add", reviewController.showAdd) // Show 'Add' form
// router.get("/edit/:id", reviewController.showEdit) // Show 'Edit' form

// router.post("/add", reviewController.add) // Create new Review
// router.post("/edit", reviewController.edit) // Edit a Review

// router.get("/delete/:id", reviewController.delete) // Delete a Review

module.exports = router
