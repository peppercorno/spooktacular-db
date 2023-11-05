// Get models
const Review = require("../models/Review")
const Customer = require("../models/Customer")
const Room = require("../models/Room")

// Render Reviews view
exports.render = async (req, res) => {
	// Get all reviews
	let reviews = await Review.findAll()

	// For dropdown menus: Get names for Customers and Rooms
	let customers = await Customer.findFullNames()
	let rooms = await Room.findNames()

	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add customer." } // Default error message
	if (error) {
		// TODO: Add Custom error messages based on validation
		// if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	}
	// Errors from 'add' form
	if (error && req.query.error === "add") error.section = "add"
	// Errors from 'edit' form
	if (error && req.query.error === "edit") error.section = "edit"

	// Whether to show notification above table
	let reviewAdded = req.query.added
	let reviewDeleted = req.query.removed

	// Render view
	res.render("reviews", { reviews, customers, rooms, error, reviewAdded, reviewDeleted })
}
