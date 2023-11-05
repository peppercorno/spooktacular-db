const moment = require("moment")

// Get connection
let dbConnection = require("../db-config")

class Ticket {
	constructor(ticketID, customerID, priceID, quantity, purchaseDate, entryDate) {
		this.ticketID = ticketID
		this.customerID = customerID
		this.priceID = priceID
		this.quantity = quantity
		this.purchaseDate = purchaseDate
		this.entryDate = entryDate
	}

	// Read: get all rows
	static findAll() {
		return new Promise(resolve => {
			dbConnection.query("SELECT * FROM Tickets", (err, rows) => {
				if (err) {
					console.error(err)
					resolve([]) // No rows
					return
				}

				let tickets = []
				for (let row of rows) {
					// Format date
					let purchaseDate = moment(row.purchaseDate).format("MMM D YYYY, h:mm A")
					let entryDate = moment(row.entryDate).format("MMM D YYYY, h:mm A")

					tickets.push(new this(row.ticketID, row.customerID, row.priceID, row.quantity, purchaseDate, entryDate))
				}
				resolve(tickets)
			})
		})
	}

	// Read: get one row by roomID
	static findById(ticketID) {
		return new Promise(resolve => {
			dbConnection.query(`SELECT * FROM Tickets WHERE ticketID = ${ticketID}`, (err, res) => {
				if (err) {
					console.error(err)
					resolve([])
					return
				}

				// Format date
				let purchaseDate = moment(res[0].purchaseDate).format("MMM D YYYY, h:mm A")
				let entryDate = moment(res[0].entryDate).format("MMM D YYYY, h:mm A")

				// res is an array. Create new class instance using data from first item in array
				let ticket = new this(res[0].ticketID, res[0].customerID, res[0].priceID, res[0].quantity, purchaseDate, entryDate)

				resolve(ticket)
			})
		})
	}
}

module.exports = Ticket
