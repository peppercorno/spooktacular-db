// Get models
const Review = require("../models/Review")
const Customer = require("../models/Customer")
const Room = require("../models/Room")

// Render Reviews view
exports.showAll = async (req, res) => {
	// Get all reviews
	let reviews = await Review.findAll()
	let reviewBeingEdited = ""

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
	if (error && req.query.error === "edit") {
		reviewBeingEdited = await Review.findById(req.query.id)
		error.section = "edit"
	}

	// Whether to show notification above table
	let success = req.query.success

	// Render view
	res.render("reviews", { reviews, customers, rooms, error, success, reviewBeingEdited })
}

// Add a new review
exports.add = async (req, res) => {
	try {
		console.log("Request Body:", req.body) // Log the request body

		// Fetch customer full name based on customerID
		// const customer = await Customer.findById(req.body.customerID);
		// const customerFullName = `${customer.firstName} ${customer.lastName}`;

		let review = new Review(null, req.body.customerID, req.body.roomID, null, req.body.rating, req.body.text, null)

		await review.save()

		// If successful
		res.redirect("/reviews/?success=added")
	} catch (err) {
		console.log(err)

		// To detect one of our defined validation eerrors, check the prefix
		if (err.message.substring(0, 12) === "review.add") {
			res.redirect("reviews/?error=add&type=" + err.message.substring(13))
		} else res.redirect("reviews/?error=add&type=unknown")
	}
}
