const express = require("express")
const router = express.Router()
const customerController = require("../controllers/customerController")

// Routes
router.get("/", customerController.showAll) // Show table
router.get("/add", customerController.showAdd) // Show 'Add' form
router.get("/edit/:id", customerController.showEdit) // Show 'Edit' form

router.post("/add", customerController.add) // Create new Customer
router.post("/edit", customerController.edit) // Edit a Customer

router.get("/delete/:id", customerController.delete) // Delete a Customer

module.exports = router
