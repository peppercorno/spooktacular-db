const express = require("express")
const router = express.Router()
const admissionPriceController = require("../controllers/admissionPriceController")

// Routes
router.get("/", admissionPriceController.render)
router.post("/add", admissionPriceController.add) // Create new Admission Price
router.post("/edit", admissionPriceController.edit) // Edit Admission Price
router.get("/delete/:id", admissionPriceController.delete) // Delete an Admission Price

module.exports = router
