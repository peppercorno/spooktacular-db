# CS 340 Spooktacular Database

Basic Node.js, Express, MySQL CRUD project with Handlebars templating

---

### Citations

**SQL**
Title: 'Exists' SQL syntax to return a boolean as to whether a parent row has any child rows.
Date: 12 Nov 2023
Adapted from URL: https://stackoverflow.com/a/58886829
Author: GMB

Title: YEAR(CURDATE()) syntax to get rows in AdmissionPrices where year matches the current year.
Date: 28 Nov 2023
Adapted from URL: https://stackoverflow.com/a/27745487
Author: John Conde

**Handlebars**
Title: Registering ifCond helper for Handlebars.
Date: 30 Oct 2023
Adapted from URL: https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/16315366#16315366
Author: Jim

**Misc**
Title: Reference for how to proceed with adding new data, though we have modified it significantly to use an MVC structure.
Date: 30 Oct 2023
Adapted from URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
Author: CS 340 Instruction Team

Title: Reference for MVC structure, though our model is not an object. We use a class and promises instead.
Date: 3 Nov 2023
Adapted from URL: https://github.com/rahulguptafullstack/node-mysql-crud-app/blob/master/src/models/employee.model.js
Author: Rahul Gupta

Title: Checking how to use promises in JS.
Date: 3 Nov 2023
Adapted from URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
Author: MDN Contributors

Title: Checking syntax for querySelectorAll() to apply click event listeners to buttons in all table rows.
Date: 4 Nov 2023
Adapted from URL: https://stackoverflow.com/a/50229330
Author: Mamun

Title: Checking up the use of multipleStatements in mysql.createConnection().
Date: 13 Nov 2023
Adapted from URL: https://anonystick.com/blog-developer/nodejs-mysql-multiple-statement-queries-2020040188043017
Author: Anonystick

Title: To prevent SQL errors, escape quotes in string values before inserting or updating.
Date: 27 Nov 2023
Adapted from URL: https://bobbyhadz.com/blog/javascript-escape-quotes-in-string
Author: Borislav Hadzhiev

Title: How to get the ID of a newly-inserted row, so we know which row to highlight in a table.
Date: 28 Nov 2023
Adapted from URL: https://www.npmjs.com/package/mysql#getting-the-id-of-an-inserted-row
Author: mysql npm creators

Title: Escaping quotes: Using a slash (eg. "\'") does prevent SQL errors, but it stores the slash in the database. So, trying a regex instead which prevents multiple single quotes when editing a string that contains a single quote.
Date: 28 Nov 2023
Adapted from URL: https://stackoverflow.com/questions/6070275/regular-expression-match-only-non-repeated-occurrence-of-a-character
Author: Cory

---

### Running the project:

-   Clone project to a local directory.
-   In the root directory, duplicate the .env.template file and rename it to .env. Fill in the fields with your own settings. Eg.:
    -   PORT = 5000
    -   HOST = "localhost"
    -   DB_NAME = "spooktacular"
    -   DB_USERNAME = "root"
    -   DB_PASS = ""
-   Using your intended server's phpmyadmin (or MySQL CLI), make sure a table exists with the name used above in your .env file. To set up and populate this table, import the **db > DDL.sql** file.
-   In the command line, navigate to the project directory and run `npm install`.
-   To start the server, you can either use `npm start` to run with nodemon, or `node app.js`.
-   In your browser, navigate to the URL you set up (eg. localhost:5000 ) to view the web app.
