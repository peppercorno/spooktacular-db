/*------------------------------
    Team Spooktacular (Team 32)
    Debbie Nguyen, Dawn Toh 
------------------------------*/

/*------------------------------
Admission Prices
------------------------------*/
-- Get all Admission Price rows
SELECT priceID, year, basePrice FROM AdmissionPrices;

-- Add a new Admission Price 
INSERT INTO AdmissionPrices (year, basePrice) 
VALUES (:yearInput, :basePriceInput);

-- Update existing Admission Price
UPDATE AdmissionPrices SET basePrice = :newBasePriceInput 
WHERE priceID = :priceIDToUpdate;

-- Delete an Admission Price
DELETE FROM AdmissionPrices WHERE priceID = :priceIDToDelete;

/*------------------------------
Customers
------------------------------*/
-- Get all Customer rows to populate Customers
SELECT customerID, firstName, lastName, email FROM Customers;

-- Get all Customer rows for dropdown menus. customerID and full name details only.
SELECT customerID, firstName, lastName FROM Customers;

-- Add a new Customer
INSERT INTO Customers (firstName, lastName, email) VALUES (:newFirstName, :newLastName, :newEmail);

-- Update a new Customer
UPDATE Customers SET firstName = :newFirstName, lastName = :newLastName, email = :newEmail WHERE customerID = :customerIDToUpdate;

-- Delete a Customer
DELETE FROM Customers WHERE customerID = :customerIDToDelete;

/*------------------------------
Employees
------------------------------*/
-- Get all Employee rows to populate Employees
SELECT employeeID, firstName, lastName, email, jobTitle, startDate, endDate, salary FROM Employees;

-- Add a new Employee
INSERT INTO Employees (firstName, lastName, email, jobTitle, startDate, endDate, salary)
VALUES (:newFirstName, :newLastName, :newEmail, :newJobTitle, :newStartDate, :newEndDate, :newSalary);

-- Update an Employee
UPDATE Employees
SET firstName = :newFirstName, lastName = :newLastName, email = :newEmail, jobTitle = :newJobTitle,
startDate = :newStartDate, endDate = :newEndDate, salary = :newSalary
WHERE employeeID = :employeeIDToUpdate;

-- Delete an Employee
DELETE FROM Employees WHERE employeeID = :employeeIDToDelete;

/*------------------------------
Inventory Items
------------------------------*/
-- Get all Inventory Item rows to populate Inventory Items
SELECT itemID, roomID, employeeID, name, itemCondition FROM InventoryItems;

-- Add a new Inventory Item
INSERT INTO InventoryItems (name, roomID, employeeID, itemCondition)
VALUES (:newName, :newRoomID, :newEmployeeID, :newItemCondition);

-- Update an Inventory Item
UPDATE InventoryItems
SET name = :newName, roomID = :newRoomID, employeeID = :newEmployeeID, itemCondition = :newItemCondition
WHERE itemID = :inventoryItemIDToUpdate;

-- Delete an Inventory Item
DELETE FROM InventoryItems WHERE itemID = :inventoryItemIDToDelete;

/*------------------------------
Reviews
------------------------------*/
-- Get all Review rows
SELECT reviewID, customerID, roomID, rating, text, creationDate FROM Reviews;

-- Get all Review rows with associated Customer and Room information
SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, 
    CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, 
    Rooms.name AS roomName 
FROM Reviews 
INNER JOIN Customers ON Customers.CustomerID = Reviews.customerID 
LEFT JOIN Rooms ON Rooms.roomID = Reviews.roomID 
ORDER BY creationDate DESC;

-- Add a new Review
INSERT INTO Reviews (customerID, roomID, rating, text, creationDate)
VALUES (:customerID, :roomID, :rating, :text, NOW()); -- Use the current date and time

-- Update a Review
UPDATE Reviews
SET customerID = :customerID, roomID = :roomID, rating = :rating, text = :text
WHERE reviewID = :reviewIDToUpdate;

-- Delete a Review
DELETE FROM Reviews WHERE reviewID = :reviewIDToDelete;

/*------------------------------
Rooms
------------------------------*/
-- Get all Room rows
SELECT roomID, name, theme, maxCapacity, level FROM Rooms;

-- Get all Room rows for dropdown menus. roomID and name only.
SELECT roomID, name FROM Rooms ORDER BY name ASC;

-- Add a new Room
INSERT INTO Rooms (name, theme, maxCapacity, level)
VALUES (:name, :theme, :maxCapacity, :level);

-- Update a Room
UPDATE Rooms
SET name = :name, theme = :theme, maxCapacity = :maxCapacity, level = :level
WHERE roomID = :roomIDToUpdate;

-- Delete a Room
DELETE FROM Rooms WHERE roomID = :roomIDToDelete;

/*------------------------------
Tickets
------------------------------*/
-- Get all Ticket information to populate Tickets
SELECT ticketID, customerID, priceID, quantity, purchaseDate, entryDate FROM Tickets;

-- Add a new Ticket
INSERT INTO Tickets (customerID, priceID, quantity, purchaseDate, entryDate)
VALUES (:customerID, :priceID, :quantity, NOW(), NOW());

-- Update a Ticket
UPDATE Tickets
SET customerID = :customerID, priceID = :priceID, quantity = :quantity
WHERE ticketID = :ticketIDToUpdate;

-- Delete a Ticket
DELETE FROM Tickets WHERE ticketID = :ticketIDToDelete;

/*------------------------------
InventoryItems_Employees
------------------------------*/

