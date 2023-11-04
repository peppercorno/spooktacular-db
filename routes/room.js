const express = require("express")
const router = express.Router()
const roomController = require("../controllers/roomController")

// Routes
router.get("/", roomController.render)
router.post("/add", roomController.add) // Create new Room

// router.get("/:id", roomController.findById
// router.post('/edit/:id', roomController.update)   // Update Room
// router.delete('/delete/:id', roomController.delete);   // Delete a Room

module.exports = router
