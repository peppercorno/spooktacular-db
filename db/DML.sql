/*------------------------------
    Team Spooktacular (Team 32)
    Debbie Nguyen, Dawn Toh 
------------------------------*/
-- get all Price IDs, years and Base Proces to populate Admission Prices 
SELECT priceID, year, basePrice FROM AdmissionPrices;

-- add a new admission price 
INSERT INTO AdmissionPrices (year, basePrice) 
VALUES (:yearInput, :basePriceInput);

-- update existing admission price
UPDATE AdmissionPrices SET basePrice = :newBasePriceInput 
WHERE priceID = :priceIDToUpdate;

-- delete an admission price
DELETE FROM AdmissionPrices WHERE priceID = :priceIDToDelete;

-- get all Customer IDs, first names, last names and emails to populate Customers
SELECT customerID, firstName, lastName, email FROM Customers;

-- add a new Customer
INSERT INTO Customers (firstName, lastName, email) VALUES (:newFirstName, :newLastName, :newEmail);

-- update a new Customer
UPDATE Customers SET firstName = :newFirstName, lastName = :newLastName, email = :newEmail WHERE customerID = :customerIDToUpdate;

-- delete a Customer
DELETE FROM Customers WHERE customerID = :customerIDToDelete;

-- Get all Employee IDs, first names, last names, emails, job titles, start dates, end dates, and salaries to populate Employees
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

-- Get all Inventory Item IDs, room IDs, employee IDs, names, item conditions to populate Inventory Items
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

-- Get all review information to populate Reviews
SELECT reviewID, customerID, roomID, rating, text, creationDate FROM Reviews;


-- Add a new review
INSERT INTO Reviews (customerID, roomID, rating, text, creationDate)
VALUES (:customerID, :roomID, :rating, :text, NOW()); -- Use the current date and time


-- Update a review
UPDATE Reviews
SET customerID = :customerID, roomID = :roomID, rating = :rating, text = :text
WHERE reviewID = :reviewIDToUpdate;

-- Delete a review
DELETE FROM Reviews WHERE reviewID = :reviewIDToDelete;

-- Get all room information to populate Rooms
SELECT roomID, name, theme, maxCapacity, level FROM Rooms;


-- Add a new room
INSERT INTO Rooms (name, theme, maxCapacity, level)
VALUES (:name, :theme, :maxCapacity, :level);


-- Update a room
UPDATE Rooms
SET name = :name, theme = :theme, maxCapacity = :maxCapacity, level = :level
WHERE roomID = :roomIDToUpdate;


-- Delete a room
DELETE FROM Rooms WHERE roomID = :roomIDToDelete;

-- Get all ticket information to populate Tickets
SELECT ticketID, customerID, priceID, quantity, purchaseDate, entryDate FROM Tickets;

-- Add a new ticket
INSERT INTO Tickets (customerID, priceID, quantity, purchaseDate, entryDate)
VALUES (:customerID, :priceID, :quantity, NOW(), NOW());


-- Update a ticket
UPDATE Tickets
SET customerID = :customerID, priceID = :priceID, quantity = :quantity
WHERE ticketID = :ticketIDToUpdate;

-- Delete a ticket
DELETE FROM Tickets WHERE ticketID = :ticketIDToDelete;

