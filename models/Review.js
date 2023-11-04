const moment = require("moment")

// Get connection
let dbConnection = require("../db-config")

class Review {
	constructor(reviewID, customerID, roomID, rating, text, creationDate) {
		this.reviewID = reviewID
		this.customerID = customerID
		this.roomID = roomID
		this.rating = rating
		this.text = text
		this.creationDate = creationDate
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			dbConnection.query("SELECT * FROM Reviews", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let reviews = []
				for (let row of rows) {
					let creationDate = moment(row.creationDate)
					reviews.push(new this(row.reviewID, row.customerID, row.roomID, row.rating, row.text, creationDate))
				}
				resolve(reviews)
			})
		})
	}
}

module.exports = Review
