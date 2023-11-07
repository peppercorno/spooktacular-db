/*------------------------------
    Team Spooktacular (Team 32)
    Debbie Nguyen, Dawn Toh 
------------------------------*/

/*------------------------------
Admission Prices
------------------------------*/
-- For table: Get all Admission Price rows
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
-- For table: Get all Customer rows
SELECT customerID, firstName, lastName, email FROM Customers;

-- For dropdown menus: Get all Customer rows-- customerID and name-related details only
SELECT customerID, firstName, lastName FROM Customers ORDER BY customerID ASC;

-- Add a new Customer
INSERT INTO Customers (firstName, lastName, email) VALUES (:newFirstName, :newLastName, :newEmail);

-- Update a new Customer
UPDATE Customers SET firstName = :newFirstName, lastName = :newLastName, email = :newEmail WHERE customerID = :customerIDToUpdate;

-- Delete a Customer
DELETE FROM Customers WHERE customerID = :customerIDToDelete;

/*------------------------------
Employees
------------------------------*/
-- For table: Get all Employee rows
SELECT employeeID, firstName, lastName, email, jobTitle, startDate, endDate, salary FROM Employees;

-- For dropdown menus: Get all Employee rows-- employeeID and name-related details only
SELECT employeeID, firstName, lastName FROM Employees ORDER BY employeeID ASC;

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
-- For table: Get all Inventory Item rows with associated Room data
SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, Rooms.name AS roomName
FROM InventoryItems
LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID;

-- For update form after an error notification:
-- Get one Inventory Item row by itemID, along with associated Room data
SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, Rooms.name AS roomName
FROM InventoryItems 
LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID; 
WHERE InventoryItems.itemID = :itemID;

-- Add a new Inventory Item
INSERT INTO InventoryItems (name, roomID, itemCondition)
VALUES (:newName, :newRoomID, :newItemCondition);
-- At the same time, update intersection table InventoryItems_Employees
-- Use a loop in JS to perform as many inserts as there are Employees being associated with the Inventory Item:
INSERT INTO InventoryItems_Employees (itemID, employeeID)
VALUES (:itemID, :employeeID);

-- Update an Inventory Item
UPDATE InventoryItems
SET name = :newName, roomID = :newRoomID, itemCondition = :newItemCondition
WHERE itemID = :itemIDToUpdate;

-- Delete an Inventory Item
DELETE FROM InventoryItems WHERE itemID = :itemIDToDelete;

/*------------------------------
InventoryItems_Employees
------------------------------*/
-- For table: get all InventoryItems_Employees rows
SELECT itemID, employeeID FROM InventoryItems_Employees;

-- NOTE: Add is shown in line 83. No Update.

-- Delete a relationship between Inventory Items and Employees
DELETE FROM InventoryItems_Employees WHERE (itemID = :itemIDToDelete AND employeeID = :employeeIDToDelete);

/*------------------------------
Reviews
------------------------------*/
-- For table: 
-- Get all Review rows with associated Customer and Room data
SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, 
    CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, 
    Rooms.name AS roomName 
FROM Reviews 
INNER JOIN Customers ON Customers.CustomerID = Reviews.customerID 
LEFT JOIN Rooms ON Rooms.roomID = Reviews.roomID 
ORDER BY creationDate DESC;

-- For update form after an error notification:
-- Get one Review row by reviewID, along with associated Customer and Room data
SELECT Reviews.reviewID, Reviews.customerID, Reviews.roomID, Reviews.rating, Reviews.text, Reviews.creationDate, 
    CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName, 
    Rooms.name AS roomName 
FROM Reviews 
INNER JOIN Customers ON Customers.CustomerID = Reviews.customerID 
LEFT JOIN Rooms ON Rooms.roomID = Reviews.roomID 
WHERE Reviews.reviewID = :reviewID;

-- Add a new Review
INSERT INTO Reviews (customerID, roomID, rating, text)
VALUES (:customerID, :roomID, :rating, :text);

-- Update a Review
UPDATE Reviews
SET customerID = :customerID, roomID = :roomID, rating = :rating, text = :text
WHERE reviewID = :reviewIDToUpdate;

-- Delete a Review
DELETE FROM Reviews WHERE reviewID = :reviewIDToDelete;

/*------------------------------
Rooms
------------------------------*/
-- For table: Get all Room rows
SELECT roomID, name, theme, maxCapacity, level FROM Rooms;

-- For dropdown menus: Get all Room rows-- roomID and name only
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
-- For table: Get all Ticket rows along with associated Customer and AdmissionPrice data
SELECT Tickets.ticketID, Tickets.customerID, Tickets.priceID, Tickets.quantity, Tickets.purchaseDate,
    CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName,
    AdmissionPrices.basePrice AS unitPrice,
    (AdmissionPrices.basePrice * Tickets.quantity) AS totalPrice
FROM Tickets
INNER JOIN Customers ON Customers.CustomerID = Tickets.customerID 
INNER JOIN AdmissionPrices ON AdmissionPrices.priceID = Tickets.priceID
ORDER BY purchaseDate DESC;

-- Add a new Ticket
INSERT INTO Tickets (customerID, priceID, quantity)
VALUES (:customerID, :priceID, :quantity);

-- Update a Ticket
UPDATE Tickets
SET customerID = :customerID, priceID = :priceID, quantity = :quantity
WHERE ticketID = :ticketIDToUpdate;

-- Delete a Ticket
DELETE FROM Tickets WHERE ticketID = :ticketIDToDelete;
