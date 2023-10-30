const express = require('express')
const router = express.Router()

// Routes
router.get('/', (req, res) => {
	res.render('index')
}) // Show index page

module.exports = router
