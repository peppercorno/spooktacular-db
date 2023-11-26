/*------------------------------
    Team Spooktacular (Team 32)
    Debbie Nguyen, Dawn Toh 
------------------------------*/

/*------------------------------
Admission Prices
------------------------------*/
-- For table: Get all Admission Price rows
-- Indicate whether each row has any child rows
SELECT priceID, year, description, basePrice,
EXISTS(SELECT 1 FROM Tickets t1 WHERE t1.priceID = AdmissionPrices.priceID) AS hasChildRows
FROM AdmissionPrices ORDER BY year DESC;

-- For dropdown menus: Get all Admission Price rows according to a given year. Order by description alphabetically.
SELECT priceID, description, basePrice FROM AdmissionPrices WHERE year = :givenYear ORDER BY description ASC;

-- Add a new Admission Price
INSERT INTO AdmissionPrices (year, description, basePrice) 
VALUES (:newYear, :newDescription, :newBasePrice);

-- To populate update form fields:
-- Get one Admission Price row by priceID
SELECT * FROM AdmissionPrices WHERE priceID = :priceIDToUpdate;

-- Update an Admission Price
UPDATE AdmissionPrices SET year = :newYear, description = :newDescription, basePrice = :newBasePrice WHERE priceID = :priceIDToUpdate;

-- Delete an Admission Price
DELETE FROM AdmissionPrices WHERE priceID = :priceIDToDelete;

/*------------------------------
Customers
------------------------------*/
-- For table: Get all Customer rows
-- Indicate whether each row has any child rows
SELECT customerID, firstName, lastName, email, 
(EXISTS (SELECT 1 FROM Tickets t1 WHERE t1.customerID = Customers.customerID)
    OR EXISTS (SELECT 1 FROM Reviews r1 WHERE r1.customerID = Customers.customerID))
    AS hasChildRows
FROM Customers;

-- For dropdown menus: Get all Customer rows-- customerID and name-related details only
SELECT customerID, firstName, lastName FROM Customers ORDER BY customerID ASC;

-- Add a new Customer
INSERT INTO Customers (firstName, lastName, email) VALUES (:newFirstName, :newLastName, :newEmail);

-- To populate update form fields:
-- Get one Customer row by customerID
SELECT * FROM Customers WHERE customerID = :customerIDToUpdate;

-- Update a Customer
UPDATE Customers SET firstName = :newFirstName, lastName = :newLastName, email = :newEmail WHERE customerID = :customerIDToUpdate;

-- Delete a Customer
DELETE FROM Customers WHERE customerID = :customerIDToDelete;

/*------------------------------
Employees
------------------------------*/
-- For table: Get all Employee rows
SELECT * FROM Employees;

-- For dropdown menus: Get all Employee rows-- employeeID and name-related details only
SELECT employeeID, firstName, lastName FROM Employees ORDER BY employeeID ASC;

-- Add a new Employee
INSERT INTO Employees (firstName, lastName, email, jobTitle, startDate, endDate, salary)
VALUES (:newFirstName, :newLastName, :newEmail, :newJobTitle, :newStartDate, :newEndDate, :newSalary);

-- To populate update form fields:
-- Get one Employee row by employeeID
SELECT * FROM Employees WHERE employeeID = :employeeIDToUpdate;

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
LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID 
ORDER BY itemID desc;

-- To populate update form fields:
-- Get one Inventory Item row by itemID, along with associated Room data
SELECT InventoryItems.itemID, InventoryItems.roomID, InventoryItems.name, InventoryItems.itemCondition, 
	Rooms.name AS roomName
FROM InventoryItems 
LEFT JOIN Rooms ON Rooms.roomID = InventoryItems.roomID
WHERE InventoryItems.itemID = :itemIDToUpdate;

-- For dropdown menus: Get all Inventory Item rows-- itemID and name only
SELECT itemID, name FROM InventoryItems;

-- Add a new Inventory Item
INSERT INTO InventoryItems (name, roomID, itemCondition)
VALUES (:newName, :newRoomID, :newItemCondition);
-- At the same time, if relevant, add or update intersection table InventoryItems_Employees (see next section). Use a JS loop to perform add or update.

-- Update an Inventory Item
UPDATE InventoryItems
SET name = :newName, roomID = :newRoomID, itemCondition = :newItemCondition
WHERE itemID = :itemIDToUpdate;
-- At the same time, if relevant, update intersection table InventoryItems_Employees

-- Delete an Inventory Item
DELETE FROM InventoryItems WHERE itemID = :itemIDToDelete;

/*------------------------------
InventoryItems_Employees
------------------------------*/
-- For table: get all InventoryItems_Employees rows and associated names from InventoryItems and Employees
SELECT InventoryItems_Employees.relationshipID, InventoryItems_Employees.itemID, InventoryItems_Employees.employeeID, 
    InventoryItems.name AS itemName, 
    CONCAT(Employees.firstName, ' ', Employees.lastName) as employeeFullName 
FROM InventoryItems_Employees
INNER JOIN InventoryItems ON InventoryItems.itemID = InventoryItems_Employees.itemID 
INNER JOIN Employees ON Employees.employeeID = InventoryItems_Employees.employeeID;

-- Add a relationship between Inventory Items and Employees
INSERT INTO InventoryItems_Employees (itemID, employeeID) VALUES (:newItemID, :newEmployeeID);

-- To populate update form fields: Get one relationship by relationshipID.
-- Don't need associated InventoryItem or Employee names as dropdown values will provide them.
SELECT * FROM InventoryItems_Employees WHERE relationshipID = :relationshipIDToUpdate;

-- Update a relationship
UPDATE InventoryItems_Employees SET itemID = :newItemID, employeeID = :newEmployeeID 
WHERE relationshipID = :relationshipIDToUpdate;

-- Delete a relationship between Inventory Items and Employees
DELETE FROM InventoryItems_Employees WHERE relationshipID = :relationshipIDToDelete;

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

-- To populate update form fields
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
-- Indicate whether each row has any child rows
SELECT roomID, name, theme, maxCapacity, level, 
EXISTS(SELECT 1 FROM Reviews r1 WHERE r1.roomID = Rooms.roomID) AS hasChildRows
FROM Rooms;

-- For dropdown menus: Get all Room rows-- roomID and name only. Order by name.
SELECT roomID, name FROM Rooms ORDER BY name ASC;

-- Add a new Room
INSERT INTO Rooms (name, theme, maxCapacity, level)
VALUES (:name, :theme, :maxCapacity, :level);

-- To populate update form fields:
-- Get one Room row by roomID
SELECT * FROM Rooms WHERE roomID = :roomIDToUpdate;

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

-- To populate update form fields
-- Get one Ticket row by ticketID, along with associated Customer and Room data
SELECT Tickets.ticketID, Tickets.customerID, Tickets.priceID, Tickets.quantity, Tickets.purchaseDate,
    CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerFullName,
    AdmissionPrices.basePrice AS unitPrice,
    (AdmissionPrices.basePrice * Tickets.quantity) AS totalPrice
FROM Tickets
INNER JOIN Customers ON Customers.CustomerID = Tickets.customerID 
INNER JOIN AdmissionPrices ON AdmissionPrices.priceID = Tickets.priceID
WHERE Tickets.ticketID = :ticketID;

-- Add a new Ticket
INSERT INTO Tickets (customerID, priceID, quantity)
VALUES (:customerID, :priceID, :quantity);

-- No update as we are not allowing users to update tickets

-- Delete a Ticket
DELETE FROM Tickets WHERE ticketID = :ticketIDToDelete;


-- Citation
-- 'Exists' SQL syntax to return a boolean as to whether a parent row has any child rows
-- Date: 12 Nov 2023
-- Adapted from URL: https://stackoverflow.com/a/58886829
-- Author: GMB