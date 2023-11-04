const express = require("express")
const router = express.Router()
const inventoryItemController = require("../controllers/inventoryItemController")

// Routes
router.get("/", inventoryItemController.render)

// router.post("/add", inventoryItemController.add) // Create new Inventory Item

// router.get("/:id", inventoryItemController.findById
// router.post('/edit/:id', inventoryItemController.update)   // Update Inventory Item
// router.delete('/delete/:id', inventoryItemController.delete);   // Delete a Inventory Item

module.exports = router
