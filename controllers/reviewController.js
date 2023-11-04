// Get model
const Review = require("../models/Review")

// Render Reviews view
exports.render = async (req, res) => {
	// Get all reviews
	let reviews = await Review.findAll()

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
	res.render("reviews", { reviews, error, reviewAdded, reviewDeleted })
}
