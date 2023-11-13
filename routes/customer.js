const express = require("express")
const router = express.Router()
const customerController = require("../controllers/customerController")

// Routes
router.get("/", customerController.render)
router.post("/add", customerController.add) // Create new Customer
router.post("/edit", customerController.edit) // Edit Customer
router.get("/delete/:id", customerController.delete) // Delete a Customer

module.exports = router
