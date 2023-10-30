const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

// Routes
router.get('/', customerController.findAll) // Retrieve all Customers
// router.post('/', customerController.find)
// router.get('/addcustomer', customerController.form)
// router.post('/addcustomer', customerController.create)
// router.get('/updatecustomer/:id', customerController.edit)
// router.post('/updatecustomer/:id', customerController.update)
// router.get('/:id', customerController.delete)

module.exports = router
