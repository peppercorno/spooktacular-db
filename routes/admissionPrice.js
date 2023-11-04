const express = require("express")
const router = express.Router()
const admissionPriceController = require("../controllers/admissionPriceController")

// Routes
router.get("/", admissionPriceController.render)

// router.post("/add", admissionPriceController.add) // Create new Admission Price

// router.get('/update/:id', admissionPriceController.findById)  // Get Admission Price data for update form
// router.post('/update/:id', admissionPriceController.update)   // Update Admission Price
// router.delete('/delete/:id', admissionPriceController.delete);   // Delete an Admission Price

module.exports = router
