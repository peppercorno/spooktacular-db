const express = require("express")
const router = express.Router()
const inventoryItemController = require("../controllers/inventoryItemController")

// Routes
router.get("/", inventoryItemController.showAll) // Show table
router.get("/add", inventoryItemController.showAdd) // Show 'Add' form
router.get("/edit/:id", inventoryItemController.showEdit) // Show 'Edit' form

router.post("/add", inventoryItemController.add) // Create new Inventory Item
router.post("/edit", inventoryItemController.edit) // Edit an Inventory Item

router.get("/delete/:id", inventoryItemController.delete) // Delete an Inventory Item

module.exports = router
