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
			let sqlQuery =
				"SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, "
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
					// If roomID is null, display roomName as "--"
					if (row.roomID === undefined || row.roomID === null) row.roomName = "--"

					// If rating is null, display it as "--"
					if (row.rating === null) row.rating = "--"

					// If text is an empty string or null, display it as "--"
					if (row.text === "" || row.text === null) row.text = "--"

					// Format creation date
					let creationDate = moment(row.creationDate).format("MMM D YYYY, h:mm A")

					reviews.push(
						new this(
							row.reviewID,
							row.customerID,
							row.customerFullName,
							row.roomID,
							row.roomName,
							row.rating,
							row.text,
							creationDate
						)
					)
				}
				resolve(reviews)
			})
		})
	}

	// Read: get one row by reviewID, along with associated Customer and Room info
	static findByID(reviewID) {
		return new Promise((resolve, reject) => {
			let sqlQuery =
				"SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, "
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
				let roomName = res[0].roomID === undefined || res[0].roomID === null ? "--" : res[0].roomName

				// Format creation date
				let creationDate = moment(res[0].creationDate).format("MMM D YYYY, h:mm A")

				// res is an array. Create new class instance using data from first item in array
				let review = new this(
					res[0].reviewID,
					res[0].customerID,
					res[0].customerFullName,
					res[0].roomID,
					roomName,
					res[0].rating,
					res[0].text,
					creationDate
				)

				resolve(review)
			})
		})
	}

	// Create or Update
	save() {
		return new Promise((resolve, reject) => {
			// Validate
			if (!this.customerID) throw new Error("customerIDMissing")
			if (this.rating !== "norating") {
				if (isNaN(this.rating) || this.rating < 0 || this.rating > 5) throw new Error("invalidRating")
			}

			// Parse as int
			let customerID = parseInt(this.customerID)
			let roomID = this.roomID == 0 ? null : parseInt(this.roomID) // Selecting a room is optional, set as null if unselected
			let rating = this.rating === "norating" ? null : parseInt(this.rating) // Selecting a rating is optional, set as null if unselected

			// Escape quotes
			let text = this.text.replace(/(?<!')'(?!')/g, "''")

			// Determine whether we are creating or updating
			if (this.reviewID === undefined || this.reviewID === null) {
				// Create
				db.pool.query(
					`INSERT INTO Reviews (customerID, roomID, rating, text) VALUES (${customerID}, ${roomID}, ${rating}, '${text}')`,
					(err, res) => {
						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						// Resolve with newly-inserted ID
						resolve(res.insertId)
					}
				)
			} else {
				// Update
				let reviewID = parseInt(this.reviewID)

				db.pool.query(
					"UPDATE Reviews SET customerID = ?, roomID = ?, rating = ?, text = ? WHERE reviewID = ?",
					[customerID, roomID, rating, text, reviewID],
					(err, res) => {
						// If there is an SQL error
						if (err) {
							reject(err)
							return
						}

						resolve(this)
					}
				)
			}
		})
	}

	// Delete
	delete(reviewID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM Reviews WHERE reviewID = ${reviewID}`, (err, res) => {
				// If there is an SQL error
				if (err) {
					reject(err)
					return
				}

				resolve(this)
			})
		})
	}
}

module.exports = Review
