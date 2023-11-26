const moment = require("moment")

// Get connection
let db = require("../db-config")

class Review {
	constructor(reviewID, customerID, customerFullName, roomID, roomName, rating, text, creationDate) {
		this.reviewID = reviewID
		this.customerID = customerID
		this.customerFullName = customerFullName
		this.roomID = roomID
		this.roomName = roomName
		this.rating = rating
		this.text = text
		this.creationDate = creationDate
	}

	// Read: get all rows and associated data for Customers and Rooms. Include rows where roomID is null.
	static findAll() {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, "
			sqlQuery += "CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, "
			sqlQuery += "Rooms.name AS roomName "
			sqlQuery += "FROM Reviews "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Reviews.customerID "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = Reviews.roomID "
			sqlQuery += "ORDER BY creationDate DESC;"

			db.pool.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let reviews = []
				for (let row of rows) {
					// If roomID is null, set roomName to "--"
					if (row.roomID === undefined || row.roomID === null) row.roomName = "--"

					// Format date
					let creationDate = moment(row.creationDate).format("MMM D YYYY, h:mm A")

					reviews.push(new this(row.reviewID, row.customerID, row.customerFullName, row.roomID, row.roomName, row.rating, row.text, creationDate))
				}
				resolve(reviews)
			})
		})
	}

	// Read: get one row by reviewID, along with associated Customer and Room info
	static findById(reviewID) {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, "
			sqlQuery += "CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, "
			sqlQuery += "Rooms.name AS roomName "
			sqlQuery += "FROM Reviews "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Reviews.customerID "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = Reviews.roomID "
			sqlQuery += "WHERE Reviews.reviewID = " + reviewID + ";"

			db.pool.query(sqlQuery, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// If roomID is null, set roomName to "--"
				if (res[0].roomID === undefined || res[0].roomID === null) res[0].roomName = "--"

				// Format date
				let creationDate = moment(res[0].creationDate).format("MMM D YYYY, h:mm A")

				// res is an array. Create new class instance using data from first item in array
				let review = new this(res[0].reviewID, res[0].customerID, res[0].customerFullName, res[0].roomID, res[0].roomName, res[0].rating, res[0].text, creationDate)

				resolve(review)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Determine whether we are creating or updating
			if (this.reviewID === undefined || this.reviewID === null) {
				// Create
				if (!this.customerID) throw new Error("review.add.customerIDmissing")
				//if (!this.customerFullName || this.customerFullName.length === 0) throw new Error("review.add.customermissing");
				if (this.rating === undefined || this.rating === null) throw new Error("review.add.ratingmissing")
				//if (isNaN(this.rating) || this.rating < 0 || this.rating > 5) throw new Error("review.add.invalidRating");
				if (typeof this.text !== "string" || this.text.length === 0) throw new Error("review.add.invalidText")

				// Convert rating to integer
				let rating = parseInt(this.rating)

				// Format creationDate for DB
				let creationDate = moment(this.creationDate).format("YYYY-MM-DD HH:mm:ss")

				let sqlQuery = "INSERT INTO Reviews (customerID, roomID, rating, text, creationDate) "
				sqlQuery += "VALUES (?, ?, ?, ?, ?)"

				let values = [this.customerID, this.roomID, rating, this.text, creationDate]

				db.pool.query(sqlQuery, (err, res) => {
					// If there is an SQL error
					if (err) {
						reject(err)
						return
					}

					resolve(this)
				})
			} else {
				// Update
				if (!this.customerID) throw new Error("review.edit.customerIDmissing")
				//if (!this.customerFullName || this.customerFullName.length === 0) throw new Error("review.edit.customermissing");
				if (this.rating === undefined || this.rating === null) throw new Error("review.edit.ratingmissing")
				//if (isNaN(this.rating) || this.rating < 0 || this.rating > 5) throw new Error("review.edit.invalidRating");
				if (typeof this.text !== "string" || this.text.length === 0) throw new Error("review.edit.invalidText")

				// Convert rating to integer
				let rating = parseInt(this.rating)

				// Format creationDate for DB
				let creationDate = moment(this.creationDate).format("YYYY-MM-DD HH:mm:ss")

				let sqlQuery = `
					UPDATE Reviews
					SET customerID = ?, roomID = ?, rating = ?, text = ?
					WHERE reviewID = ?
				`

				let values = [this.customerID, this.roomID, rating, this.text, this.reviewID]

				db.pool.query(sqlQuery, values, (err, res) => {
					// If there is an SQL error
					if (err) {
						reject(err)
						return
					}

					resolve(this)
				})
			}
		})
	}
}

module.exports = Review
