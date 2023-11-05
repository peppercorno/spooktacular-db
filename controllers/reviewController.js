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

	// Define error messages
	let error = req.query.error === undefined ? false : { message: "Unknown error. Unable to add review." } // Default error message
	// TODO: Define error messages after setting up validation in model
	// if (error && req.query.error === "add") {
	// 	error.section = "add"
	// 	if (req.query.type === "firstnamemissing") error.message = "First name is missing."
	// }

	// Notification above table
	let reviewAdded = req.query.added
	let reviewDeleted = req.query.removed

	// Render view
	res.render("reviews", { reviews, customers, rooms, error, reviewAdded, reviewDeleted })
}
