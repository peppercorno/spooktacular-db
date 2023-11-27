const express = require("express")
const router = express.Router()
const ticketController = require("../controllers/ticketController")

// Routes
router.get("/", ticketController.showAll) // Show table
// router.get("/add", ticketController.showAdd) // Show 'Add' form

// router.post("/add", ticketController.add) // Create new Ticket
// router.get("/delete/:id", ticketController.delete) // Delete a Ticket

module.exports = router
