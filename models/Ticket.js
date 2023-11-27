const moment = require("moment")

// Get connection
let db = require("../db-config")

class Ticket {
	constructor(ticketID, customerID, customerFullName, priceID, ticketType, unitPrice, totalPrice, quantity, purchaseDate) {
		this.ticketID = ticketID
		this.customerID = customerID
		this.customerFullName = customerFullName
		this.priceID = priceID
		this.ticketType = ticketType
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
			sqlQuery += "AdmissionPrices.description AS ticketType, "
			sqlQuery += "AdmissionPrices.basePrice AS unitPrice, "
			sqlQuery += "(AdmissionPrices.basePrice * Tickets.quantity) AS totalPrice "
			sqlQuery += "FROM Tickets "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Tickets.customerID "
			sqlQuery += "INNER JOIN AdmissionPrices ON AdmissionPrices.priceID = Tickets.priceID "
			sqlQuery += "ORDER BY purchaseDate DESC;"

			db.pool.query(sqlQuery, (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let tickets = []
				for (let row of rows) {
					// Format date
					let purchaseDate = moment(row.purchaseDate).format("MMM D YYYY, h:mm A")

					tickets.push(new this(row.ticketID, row.customerID, row.customerFullName, row.priceID, row.ticketType, row.unitPrice, row.totalPrice, row.quantity, purchaseDate))
				}
				resolve(tickets)
			})
		})
	}

	// Read: get one row by ticketID
	static findByID(ticketID) {
		return new Promise((resolve, reject) => {
			let sqlQuery = "SELECT Tickets.ticketID, Tickets.customerID, Tickets.priceID, Tickets.quantity, Tickets.purchaseDate, "
			sqlQuery += "CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, "
			sqlQuery += "AdmissionPrices.description AS ticketType, "
			sqlQuery += "AdmissionPrices.basePrice AS unitPrice, "
			sqlQuery += "(AdmissionPrices.basePrice * Tickets.quantity) AS totalPrice "
			sqlQuery += "FROM Tickets "
			sqlQuery += "INNER JOIN Customers ON Customers.CustomerID = Tickets.customerID "
			sqlQuery += "INNER JOIN AdmissionPrices ON AdmissionPrices.priceID = Tickets.priceID "
			sqlQuery += "WHERE Tickets.ticketID = " + ticketID + ";"

			db.pool.query(sqlQuery, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// Format date
				let purchaseDate = moment(res[0].purchaseDate).format("MMM D YYYY, h:mm A")

				// res is an array. Create new class instance using data from first item in array
				let ticket = new this(
					res[0].ticketID,
					res[0].customerID,
					res[0].customerFullName,
					res[0].priceID,
					res[0].ticketType,
					res[0].unitPrice,
					res[0].totalPrice,
					res[0].quantity,
					purchaseDate
				)

				resolve(ticket)
			})
		})
	}

	// Create
	save() {
		return new Promise((resolve, reject) => {
			// Validate and parse
			if (!this.customerID || this.customerID.length === 0) throw new Error("customerIDMissing")
			if (!this.priceID || this.priceID.length === 0) throw new Error("priceIDMissing")
			if (this.quantity === undefined || this.quantity === null || this.quantity == 0) throw new Error("quantityMissing")
			if (isNaN(this.quantity)) throw new Error("quantityNaN")

			let customerID = parseInt(this.customerID)
			let priceID = parseInt(this.priceID)
			let quantity = parseInt(this.quantity)

			// Create
			db.pool.query(`INSERT INTO Tickets (customerID, priceID, quantity) VALUES (${customerID}, ${priceID}, ${quantity})`, (err, res) => {
				if (err) {
					reject(err)
					return
				}

				resolve(this)
			})
		})
	}

	// Delete
	delete(ticketID) {
		return new Promise((resolve, reject) => {
			db.pool.query(`DELETE FROM Tickets WHERE ticketID = ${ticketID}`, (err, res) => {
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

module.exports = Ticket
