// Get models
const Review = require("../models/Review")
const Customer = require("../models/Customer")
const Room = require("../models/Room")

// Show all reviews
exports.showAll = async (req, res) => {
	try {
		let reviews = await Review.findAll()

		// Whether to show success notification
		let successMessage = ""
		if (req.query.success === "added") successMessage = "Review #" + req.query.id + " successfully added!"
		if (req.query.success === "edited") successMessage = "Review #" + req.query.id + " successfully edited!"
		if (req.query.success === "deleted") successMessage = "Review #" + req.query.id + " deleted."

		// If successful, highlight newly added or edited table row
		let highlight = req.query.success && req.query.success !== "deleted" ? req.query.id : null

		res.render("reviews/index", { reviews, successMessage, highlight })
	} catch (err) {
		console.log(err)
		res.render("reviews/index", { errorMessage: "Error! Unable to retrieve reviews." })
	}
}

// Show add form
exports.showAdd = async (req, res) => {
	try {
		// For dropdown menus
		let customers = await Customer.findFullNames()
		let rooms = await Room.findNames()

		res.render("reviews/add-update", { customers, rooms, formAdd: true })
	} catch (err) {
		console.log(err)
		res.render("reviews/add-update", { errorMessage: "Oops, Unable to retrieve data for dropdown menus.", formAdd: true })
	}
}

// Show edit form
exports.showEdit = async (req, res) => {
	try {
		// Get data for review being edited
		let reviewFields = await Review.findByID(req.params.id)

		// For dropdown menus
		let customers = await Customer.findFullNames()
		let rooms = await Room.findNames()

		res.render("reviews/add-update", { customers, rooms, reviewFields, formEdit: true })
	} catch (err) {
		console.log(err)
		res.render("reviews/add-update", { errorMessage: "Oops, unable to retrieve data for this review.", formEdit: true })
	}
}

// Add a new review
exports.add = async (req, res) => {
	try {
		// First and last param: null because we don't want to fill in reviewID and creationDate. Let MySQL use default values.
		// Follow params that Review class requires
		let review = new Review(null, req.body.customerID, null, req.body.roomID, null, req.body.rating, req.body.text, null)

		let addedID = await review.save()

		// If successful
		res.redirect("/reviews/?success=added&id=" + addedID)
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let customers = await Customer.findFullNames()
		let rooms = await Room.findNames()

		// Refill form fields after an error
		let reviewFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message, customers, rooms) ?? "Unknown error! Unable to add review."

		res.render("reviews/add-update", { customers, rooms, reviewFields, errorMessage, formAdd: true })
	}
}

// Edit existing review
exports.edit = async (req, res) => {
	try {
		let review = new Review(
			req.body.reviewID,
			req.body.customerID,
			null,
			req.body.roomID,
			null,
			req.body.rating,
			req.body.text,
			null
		)

		await review.save()

		// If successful
		res.redirect("/reviews/?success=edited&id=" + req.body.reviewID)
	} catch (err) {
		console.log(err)

		// For dropdown menus
		let customers = await Customer.findFullNames()
		let rooms = await Room.findNames()

		// Refill form fields after an error
		let reviewFields = req.body

		// Determine error message
		let errorMessage = defineErrorMessage(err.message, customers, rooms) ?? "Unknown error! Unable to edit review."

		res.render("reviews/add-update", { customers, rooms, reviewFields, errorMessage, formEdit: true })
	}
}

// Delete existing review
exports.delete = async (req, res) => {
	try {
		let review = new Review(req.params.id, null, null, null, null, null, null, null)

		await review.delete(req.params.id)

		// If successful
		res.redirect("/reviews/?success=deleted&id=" + req.params.id)
	} catch (err) {
		console.log(err)

		let errorMessage = "Error! Review not deleted."

		// Get all Reviews
		let reviews = await Review.findAll()
		if (!reviews || reviews === null) errorMessage = "Error! Unable to retrieve reviews."

		res.render("reviews/index", { reviews, errorMessage })
	}
}

let defineErrorMessage = (errType, customers, rooms) => {
	if (!customers || customers === null) return "Unable to retrieve data for customers."
	if (!rooms || rooms === null) return "Unable to retrieve data for rooms."
	if (errType === "customerIDMissing") return "A review must be written by a customer."
	if (errType === "invalidRating") return "Rating must be a number ranging from 0 to 5."
	if (errType === "emptyReview") return "Please select a rating, write some text, or do both!"
	return
}
