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

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(sqlQuery, (err, rows) => {
					connection.release() // When done with the connection, release

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

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(sqlQuery, (err, res) => {
					connection.release() // When done with the connection, release

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
		})
	}
}

module.exports = Review
