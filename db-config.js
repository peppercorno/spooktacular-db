const mysql = require("mysql")
const path = require("path")
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, ".env") })

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
})

module.exports.pool = pool
