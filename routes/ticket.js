const express = require("express")
const router = express.Router()
const ticketController = require("../controllers/ticketController")

// Routes
router.get("/", ticketController.render)
router.post("/add", ticketController.add) // Create new Ticket

// router.get("/:id", ticketController.findById
// router.delete('/delete/:id', ticketController.delete);   // Delete a Ticket

module.exports = router
