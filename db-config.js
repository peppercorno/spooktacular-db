const mysql = require("mysql")
const path = require("path")
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, ".env") })

const dbConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
})

dbConnection.connect(function (err) {
	if (err) {
		if (err.code === "ER_ACCESS_DENIED_ERROR" || err.code === "ECONNREFUSED") {
			console.error("Access denied. Please check that the server is running, and that the .env file exists.")
			return
		} else throw err
	}

	console.log("Connected to database.")
})

module.exports = dbConnection
