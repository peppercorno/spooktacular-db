const express = require("express")
const router = express.Router()
const roomController = require("../controllers/roomController")

// Routes
router.get("/", roomController.render)

router.post("/add", roomController.add) // Create new Room
router.post("/edit", roomController.edit)
//router.get("/:id", roomController.findById)
// router.post('/edit/:id', roomController.edit)   // Edit Room
router.delete('/delete/:id', roomController.delete);   // Delete a Room

module.exports = router