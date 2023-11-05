const moment = require("moment")

// Get connection
let dbConnection = require("../db-config")

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
		return new Promise(resolve => {
			let sqlQuery = "SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, "
			sqlQuery += "CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, "
			sqlQuery += "Rooms.name AS roomName "
			sqlQuery += "FROM Reviews "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Reviews.customerID "
			sqlQuery += "LEFT JOIN Rooms ON Rooms.roomID = Reviews.roomID "
			sqlQuery += "ORDER BY creationDate DESC;"

			dbConnection.query(sqlQuery, (err, rows) => {
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
}

module.exports = Review
