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
					tickets.push(
						new this(row.ticketID, row.customerID, row.priceID, row.quantity, purchaseDate, entryDate)
					)
				}
				resolve(tickets)
			})
		})
	}
}

module.exports = Ticket
