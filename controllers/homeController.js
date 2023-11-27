/*Citations
------------------------------------------------------------------------
	Title: Checking up the use of multipleStatements in mysql.createConnection()
	Date: 13 Nov 2023
	Adapted from URL: https://anonystick.com/blog-developer/nodejs-mysql-multiple-statement-queries-2020040188043017
	Author: Anonystick
------------------------------------------------------------------------*/

const path = require("path")
const fs = require("fs")
const mysql = require("mysql")
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, ".env") })

// When button to reset database is clicked
exports.render = (req, res) => {
	let error = req.query.error
	let success = req.query.success

	res.render("index", { error, success })
}

exports.resetDB = (req, res) => {
	// Open a connection where multiple statements are allowed
	const dbConnection = mysql.createConnection({
		host: process.env.HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		multipleStatements: true
	})

	dbConnection.connect()

	// Read minified SQL file from db directory
	const sqlQuery = fs.readFileSync(path.join(__dirname, "..", "db", "DDL-minified.sql")).toString()

	dbConnection.query(sqlQuery, (err, result) => {
		if (err) {
			console.log(err)
			res.redirect("/?error=reset")
		}

		console.log("Database reset successfully!")
		res.redirect("/?success=reset")
	})

	// Close connection
	dbConnection.end()
}
