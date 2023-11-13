const moment = require("moment")

// Get connection
let db = require("../db-config")

class Ticket {
	constructor(ticketID, customerID, customerFullName, priceID, unitPrice, totalPrice, quantity, purchaseDate) {
		this.ticketID = ticketID
		this.customerID = customerID
		this.customerFullName = customerFullName
		this.priceID = priceID
		this.unitPrice = unitPrice
		this.totalPrice = totalPrice
		this.quantity = quantity
		this.purchaseDate = purchaseDate
	}

	// Read: get all rows
	static findAll() {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT Tickets.ticketID, Tickets.customerID, Tickets.priceID, Tickets.quantity, Tickets.purchaseDate, "
			sqlQuery += "CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, "
			sqlQuery += "AdmissionPrices.basePrice AS unitPrice, "
			sqlQuery += "(AdmissionPrices.basePrice * Tickets.quantity) AS totalPrice "
			sqlQuery += "FROM Tickets "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Tickets.customerID "
			sqlQuery += "INNER JOIN AdmissionPrices ON AdmissionPrices.priceID = Tickets.priceID "
			sqlQuery += "ORDER BY purchaseDate DESC;"

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(sqlQuery, (err, rows) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([]) // No rows
						return
					}

					let tickets = []
					for (let row of rows) {
						// Format date
						let purchaseDate = moment(row.purchaseDate).format("MMM D YYYY, h:mm A")

						tickets.push(new this(row.ticketID, row.customerID, row.customerFullName, row.priceID, row.unitPrice, row.totalPrice, row.quantity, purchaseDate))
					}
					resolve(tickets)
				})
			})
		})
	}

	// Read: get one row by ticketID
	static findById(ticketID) {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT Tickets.ticketID, Tickets.customerID, Tickets.priceID, Tickets.quantity, Tickets.purchaseDate, "
			sqlQuery += "CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, "
			sqlQuery += "AdmissionPrices.basePrice AS unitPrice, "
			sqlQuery += "(AdmissionPrices.basePrice * Tickets.quantity) AS totalPrice "
			sqlQuery += "FROM Tickets "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Tickets.customerID "
			sqlQuery += "INNER JOIN AdmissionPrices ON AdmissionPrices.priceID = Tickets.priceID "
			sqlQuery += "WHERE Tickets.ticketID = " + ticketID + ";"

			db.pool.getConnection((err, connection) => {
				if (err) console.error(err) // Not connected

				connection.query(sqlQuery, (err, res) => {
					connection.release() // When done with the connection, release

					if (err) {
						console.error(err)
						resolve([])
						return
					}

					// Format date
					let purchaseDate = moment(res[0].purchaseDate).format("MMM D YYYY, h:mm A")

					// res is an array. Create new class instance using data from first item in array
					let ticket = new this(res[0].ticketID, res[0].customerID, res[0].customerFullName, res[0].priceID, res[0].unitPrice, res[0].totalPrice, res[0].quantity, purchaseDate)

					resolve(ticket)
				})
			})
		})
	}
}

module.exports = Ticket
