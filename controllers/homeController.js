/*Citations
------------------------------------------------------------------------
	Title: Checking up the use of multipleStatements in mysql.createConnection()
	Date: 12 Nov 2023
	Adapted from URL: https://medium.com/@johnkolo/how-to-run-multiple-sql-queries-directly-from-an-sql-file-in-node-js-part-1-dce1e6dd2def
	Author: John Kolo
------------------------------------------------------------------------*/

const path = require("path")
const fs = require("fs")
const readline = require("readline")
const mysql = require("mysql")
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, ".env") })

// When button to reset database is clicked
exports.resetDB = (req, res) => {
	// Open a connection where multiple statements are allowed
	const dbConnection = mysql.createConnection({
		host: process.env.HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		multipleStatements: true
	})

	dbConnection.connect(function (err) {
		if (err) {
			console.log(err)
			return
		}
	})

	// Read SQL file from db directory
	const sqlQuery = fs.readFileSync(path.join(__dirname, "..", "db", "DDL-minified.sql")).toString()

	dbConnection.query(sqlQuery, (err, result) => {
		if (err) {
			console.log(err)
			return
		}

		console.log("Query ran successfully")
		dbConnection.end()
	})

	res.render("index")
}
