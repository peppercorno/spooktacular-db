const express = require("express")
const router = express.Router()
const itemRespController = require("../controllers/itemRespController")

// Routes
router.get("/", itemRespController.showAll) // Show table
router.get("/add", itemRespController.showAdd) // Show 'Add' form
router.get("/edit/:itemID_:employeeID", itemRespController.showEdit) // Show 'Edit' form

router.post("/add", itemRespController.add) // Create new relationship between Inventory Item and Employee
router.post("/edit", itemRespController.edit) // Edit a relationship between Inventory Item and Employee

router.get("/delete/:itemID_:employeeID", itemRespController.delete) // Delete a relationship between Inventory Item and Employee

module.exports = router
