# CS 340 Spooktacular Database

Basic Node.js, Express, MySQL CRUD project with Handlebars templating.

---

### Citations

Most of the code structure was our own work, but we did check up many references along the way to work out various issues, as listed below. The CSS is original and is not copied.

**SQL**

-   Title: 'Exists' SQL syntax to return a boolean as to whether a parent row has any child rows.

    -   Date Accessed: 12 Nov 2023
    -   Based on: https://stackoverflow.com/a/58886829
    -   Degree of originality: Implemented the same way, just with different entity names and attributes to suit our DB.
    -   Author: GMB

-   Title: YEAR(CURDATE()) syntax to get rows in AdmissionPrices where year matches the current year.
    -   Date Accessed: 28 Nov 2023
    -   Based on: https://stackoverflow.com/a/27745487
    -   Degree of originality: Implemented the same way, just with different entity names and attributes to suit our DB.
    -   Author: John Conde

**Handlebars**

-   Title: Checking Handlebars documentation to figure out how it works, from layouts to partials to built-in helpers such as 'if' and 'each'.

    -   Date Accessed: 30 Oct 2023
    -   Adapted from: https://handlebarsjs.com/guide/
    -   Degree of originality: Largely applying the Handlebars logic the same way as the documentation. Nothing too adventurous.
    -   Author: Yehuda Katz

-   Title: Registering ifCond helper for Handlebars.
    -   Date Accessed: 30 Oct 2023
    -   Copied from: https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional/16315366#16315366
    -   Degree of originality: Copied the comparison function over, no changes by us.
    -   Author: Jim

**Misc**

-   Title: Reference for how to proceed with opening a connection and implementing CRUD, though we have modified it significantly to use an MVC structure.

    -   Date Accessed: 30 Oct 2023
    -   Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
    -   Degree of originality: Our code is much the same for setting up the connection, but deviates from the class guide significantly thereafter.
    -   Author: CS 340 Instruction Team

-   Title: A starting point for figuring out how to set-up an MVC structure.

    -   Date Accessed: 3 Nov 2023
    -   Adapted from: https://github.com/rahulguptafullstack/node-mysql-crud-app/blob/master/src/models/employee.model.js
    -   Degree of originality: Our models and controllers are largely original and use classes and promises instead.
    -   Author: Rahul Gupta

-   Title: Checking up how to use promises in JS.

    -   Date Accessed: 3 Nov 2023
    -   Adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    -   Degree of originality: Mostly original. Just checked the documentation to be doubly sure on 'resolve' and 'reject'.
    -   Author: MDN Contributors

-   Title: Checking syntax for querySelectorAll() to apply click event listeners to buttons in all table rows.

    -   Date Accessed: 4 Nov 2023
    -   Adapted from: https://stackoverflow.com/a/50229330
    -   Degree of originality: Largely original. Just needed to check the name of the built-in method.
    -   Author: Mamun

-   Title: Checking up the use of multipleStatements in mysql.createConnection().

    -   Date Accessed: 13 Nov 2023
    -   Adapted from: https://anonystick.com/blog-developer/nodejs-mysql-multiple-statement-queries-2020040188043017
    -   Degree of originality: Copied the one line over. Just needed to check how this multipleStatements key-value pair is used by others.
    -   Author: Anonystick

-   Title: To prevent SQL errors, escape quotes in string values before inserting or updating.

    -   Date Accessed: 27 Nov 2023
    -   Adapted from: https://bobbyhadz.com/blog/javascript-escape-quotes-in-string
    -   Degree of originality: We changed this to use a regular expression instead.
    -   Author: Borislav Hadzhiev

-   Title: Regex to prevent multiple single quotes when editing a string that contains a single quote.

    -   Date Accessed: 28 Nov 2023
    -   Based on: https://stackoverflow.com/questions/6070275/regular-expression-match-only-non-repeated-occurrence-of-a-character
    -   Degree of originality: We copied over the regex to use inside string.replace().
    -   Author: Cory

-   Title: How to get the ID of a newly-inserted row, so we know which row to highlight in a table.

    -   Date Accessed: 28 Nov 2023
    -   Copied from: https://www.npmjs.com/package/mysql#getting-the-id-of-an-inserted-row
    -   Degree of originality: We followed the documentation exactly to use res.insertId.
    -   Author: mysql npm creators

---

### Running the project

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
