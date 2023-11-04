const express = require("express")
const router = express.Router()

// Routes
router.get("/", (req, res) => {
	// Show index page
	res.render("index")
})

module.exports = router
