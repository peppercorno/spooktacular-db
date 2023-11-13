const express = require("express")
const router = express.Router()

const homeController = require("../controllers/homeController")

// Show index page
router.get("/", homeController.render)

// Button to reset database
router.get("/reset-db", homeController.resetDB)

module.exports = router
