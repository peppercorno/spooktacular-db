const moment = require("moment")

// Get connection
let dbConnection = require("../db-config")

class Ticket {
	constructor(ticketID, customerID, priceID, quantity) {
		this.ticketID = ticketID
		this.customerID = customerID
		this.priceID = priceID
		this.quantity = quantity
		this.purchaseDate = new Date()
		this.entryDate = new Date()
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
					let purchaseDate = moment(row.purchaseDate)
					let entryDate = moment(row.entryDate)
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
