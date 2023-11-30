/*Citations
------------------------------------------------------------------------
	Title: Registering ifCond helper for Handlebars.
	Date: 30 Oct 2023
	Copied from: https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/16315366#16315366
	Degree of originality: Copied the comparison function over, no changes by us.
	Author: Jim
------------------------------------------------------------------------*/

const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, ".env") })

// Import routes
const homeRoutes = require("./routes/home")
const admissionPriceRoutes = require("./routes/admissionPrice")
const customerRoutes = require("./routes/customer")
const employeeRoutes = require("./routes/employee")
const inventoryItemRoutes = require("./routes/inventoryItem")
const reviewRoutes = require("./routes/review")
const roomRoutes = require("./routes/room")
const ticketRoutes = require("./routes/ticket")
const itemResponsibilityRoutes = require("./routes/itemResponsibility")

const app = express() // Create Express app
const PORT = process.env.PORT || 5003 // Define port

// Parse requests
app.use(express.urlencoded({ extended: true })) // content-type - application/x-www-form-urlencoded
app.use(express.json()) // content-type - application/json

// Indicate where static files are
app.use(express.static(path.join(__dirname, "/public")))

// Handlebars as templating engine
// ifCond helper allows us to use operators for comparison in our .hbs files
const handlebars = exphbs.create({
	extname: ".hbs",
	helpers: {
		ifCond(v1, operator, v2, options) {
			switch (operator) {
				case "==":
					return v1 == v2 ? options.fn(this) : options.inverse(this)
				case "===":
					return v1 === v2 ? options.fn(this) : options.inverse(this)
				case "!==":
					return v1 !== v2 ? options.fn(this) : options.inverse(this)
				case "<":
					return v1 < v2 ? options.fn(this) : options.inverse(this)
				case "<=":
					return v1 <= v2 ? options.fn(this) : options.inverse(this)
				case ">":
					return v1 > v2 ? options.fn(this) : options.inverse(this)
				case ">=":
					return v1 >= v2 ? options.fn(this) : options.inverse(this)
				case "&&":
					return v1 && v2 ? options.fn(this) : options.inverse(this)
				case "||":
					return v1 || v2 ? options.fn(this) : options.inverse(this)
				default:
					return options.inverse(this)
			}
		}
	}
})
app.engine(".hbs", handlebars.engine)
app.set("view engine", ".hbs")
app.set("views", path.join(__dirname, "views"))

// Use routes
app.use("/", homeRoutes)
app.use("/admission-prices", admissionPriceRoutes)
app.use("/customers", customerRoutes)
app.use("/employees", employeeRoutes)
app.use("/inventory-items", inventoryItemRoutes)
app.use("/reviews", reviewRoutes)
app.use("/rooms", roomRoutes)
app.use("/tickets", ticketRoutes)
app.use("/item-resps", itemResponsibilityRoutes)

// Listener
app.listen(PORT, function () {
	console.log("Express started on " + process.env.HOST + ": " + PORT + ". Press Ctrl-C to terminate.")
})
