const express = require("express")
const router = express.Router()
const customerController = require("../controllers/customerController")

// Routes
router.get("/", customerController.render)
router.post("/add", customerController.add) // Create new Customer

// router.get("/:id", customerController.findById
// router.post('/edit/:id', customerController.update)   // Update Customer
// router.delete('/delete/:id', customerController.delete);   // Delete a Customer

module.exports = router
