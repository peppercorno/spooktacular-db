const express = require('express')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv').config()

const app = express() // Create Express app
const PORT = process.env.PORT || 5000 // Define port

// Database
// let db = require('./db-config')

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(express.json())

// Static Files
app.use(express.static('public'))

// Templating Engine
/*	Title: Registering ifCond helper for Handlebars
	Date: 30 Oct 2023
	Adapted from URL: https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/16315366#16315366
	Author: Jim
*/
const handlebars = exphbs.create({
	extname: '.hbs',
	helpers: {
		ifCond(v1, operator, v2, options) {
			switch (operator) {
				case '==':
					return v1 == v2 ? options.fn(this) : options.inverse(this)
				case '===':
					return v1 === v2 ? options.fn(this) : options.inverse(this)
				case '!==':
					return v1 !== v2 ? options.fn(this) : options.inverse(this)
				case '<':
					return v1 < v2 ? options.fn(this) : options.inverse(this)
				case '<=':
					return v1 <= v2 ? options.fn(this) : options.inverse(this)
				case '>':
					return v1 > v2 ? options.fn(this) : options.inverse(this)
				case '>=':
					return v1 >= v2 ? options.fn(this) : options.inverse(this)
				case '&&':
					return v1 && v2 ? options.fn(this) : options.inverse(this)
				case '||':
					return v1 || v2 ? options.fn(this) : options.inverse(this)
				default:
					return options.inverse(this)
			}
		},
	},
})
app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

// Use routes
const routes = require('./routes/customer')
app.use('/', routes)

// Listener
app.listen(PORT, function () {
	console.log('Express started on ' + process.env.HOST + ': ' + PORT + '. Press Ctrl-C to terminate.')
})
