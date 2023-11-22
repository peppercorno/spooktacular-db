const express = require("express")
const router = express.Router()
const itemRespController = require("../controllers/itemRespController")

// Routes
router.get("/", itemRespController.render)
// router.post("/add", itemRespController.add) // Create new relationship between Inventory Item and Employee
// router.post("/edit", itemRespController.edit) // Edit a relationship between Inventory Item and Employee
// router.get("/delete/:id", itemRespController.delete) // Delete a relationship between Inventory Item and Employee

module.exports = router
