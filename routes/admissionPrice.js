const express = require("express")
const router = express.Router()
const admissionPriceController = require("../controllers/admissionPriceController")

// Routes

router.get("/", admissionPriceController.showAll) // Show table
router.get("/add", admissionPriceController.showAdd) // Show 'Add' form
router.get("/edit/:id", admissionPriceController.showEdit) // Show 'Edit' form

router.post("/add", admissionPriceController.add) // Create new Admission Price
router.post("/edit", admissionPriceController.edit) // Edit an Admission Price

router.get("/delete/:id", admissionPriceController.delete) // Delete an Admission Price

module.exports = router
