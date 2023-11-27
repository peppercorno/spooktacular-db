const express = require("express")
const router = express.Router()
const roomController = require("../controllers/roomController")

// Routes
router.get("/", roomController.showAll) // Show table
// router.get("/add", roomController.showAdd) // Show 'Add' form
// router.get("/edit/:id", roomController.showEdit) // Show 'Edit' form

// router.post("/add", roomController.add) // Create new Room
// router.post("/edit", roomController.edit) // Edit an Room

// router.get("/delete/:id", roomController.delete) // Delete an Room

module.exports = router
