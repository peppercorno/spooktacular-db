const mysql = require('mysql')

const dbConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
})

dbConnection.connect(function (err) {
	if (err) throw err
	console.log('Connected to database.')
})

module.exports = dbConnection
