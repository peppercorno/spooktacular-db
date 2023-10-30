/*------------------------------
    Team Spooktacular (Team 32)
    Debbie Nguyen, Dawn Toh 
------------------------------*/
-- Drop existing tables
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS InventoryItems_Employees, Tickets, InventoryItems, Employees, Reviews, Rooms, AdmissionPrices, Customers;
SET FOREIGN_KEY_CHECKS = 1;

/*------------------------------
    Create entity tables
------------------------------*/
-- Create Customers table
-- 1:M optional relationship with Tickets
-- 1:M optional relationship with Reviews
CREATE TABLE IF NOT EXISTS Customers (
    customerID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(64) NOT NULL,
    lastName varchar(64) NOT NULL,
    email varchar(64) NOT NULL
) ENGINE = InnoDB;

-- Create AdmissionPrices table for storing base prices by year
-- 1:M optional relationship with Tickets
CREATE TABLE IF NOT EXISTS AdmissionPrices (
    priceID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    year int NOT NULL,
    basePrice decimal(9,2) NOT NULL
) ENGINE = InnoDB;

-- Create Tickets table
-- dateFirstEntry defaults to epoch time
-- M:1 mandatory relationship with Customers
-- M:1 mandatory relationship with AdmissionPrices
CREATE TABLE IF NOT EXISTS Tickets (
    ticketID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID int NOT NULL,
    priceID int NOT NULL,
    quantity int NOT NULL DEFAULT 1,
    purchaseDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    entryDate datetime DEFAULT '1970-01-01 07:30:00',
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE RESTRICT,
    FOREIGN KEY (priceID) REFERENCES AdmissionPrices(priceID) ON DELETE RESTRICT
) ENGINE = InnoDB;

-- Create Rooms table
-- 1:M optional relationship with InventoryItems
-- 1:M optional relationship with Reviews
CREATE TABLE IF NOT EXISTS Rooms (
    roomID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    theme varchar(255),
    maxCapacity int,
    level int NOT NULL
) ENGINE = InnoDB;

-- Create InventoryItems table
-- M:1 optional relationship with Rooms
-- M:N relationship with Employees via InventoryItems_Employees
CREATE TABLE IF NOT EXISTS InventoryItems (
    itemID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roomID int,
    name varchar(255) NOT NULL,
    itemCondition varchar(255),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID) ON DELETE SET NULL
) ENGINE = InnoDB;

-- Create Employees table
-- M:N relationship with InventoryItems via InventoryItems_Employees
-- startDate and endDate default to epoch time
CREATE TABLE IF NOT EXISTS Employees (
    employeeID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(64) NOT NULL,
    lastName varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    jobTitle varchar(255) NOT NULL,
    startDate datetime NOT NULL DEFAULT '1970-01-01 07:30:00',
    endDate datetime NOT NULL DEFAULT '1970-01-01 07:30:00',
    salary decimal(9,2) NOT NULL
) ENGINE = InnoDB;

-- Create Reviews table
-- M:1 mandatory relationship with Customers
-- M:1 optional relationship with Rooms
CREATE TABLE IF NOT EXISTS Reviews (
    reviewID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID int NOT NULL,
    roomID int,
    rating int,
    text text,
    creationDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE RESTRICT,
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID) ON DELETE RESTRICT
) ENGINE = InnoDB;

/*------------------------------
    Create intersection tables 
------------------------------*/
CREATE TABLE IF NOT EXISTS InventoryItems_Employees (
    itemID int,
    employeeID int,
    PRIMARY KEY (itemID, employeeID),
    FOREIGN KEY (itemID) REFERENCES InventoryItems(itemID) ON DELETE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE CASCADE
) ENGINE=InnoDB;

/*------------------------------
    Add data to tables
------------------------------*/
INSERT INTO Customers (firstName, lastName, email) VALUES 
    (
        "Jack",
        "O'Lantern",
        "jackol@email.com"
    ),
    (
        "Wanda",
        "Witchcraft",
        "wandaw@email.com"
    ),
    (
        "Franky",
        "Frankenstein",
        "frankyf@email.com"
    ),
    (
        "Donnie",
        "Darko",
        "donnyd@email.com"
    );

INSERT INTO AdmissionPrices (year, basePrice) VALUES
    (2021, 15.00),
    (2022, 20.00),
    (2023, 25.00);

INSERT INTO Rooms (name, theme, maxCapacity, level) VALUES 
    (
        "The Grand Ballroom",
        "Decaying splendor",
        100,
        1
    ),
    (
        "Aviary of Anubis",
        "Egyptian-themed greenhouse",
        30,
        1
    ),
    (
        "The Scarlet Chamber",
        "Velvet, cobwebs, coffins",
        20,
        2
    ),
    (
        "The Catacombs",
        "Terrifying tombs",
        50,
        1
    ),
    (
        "Ectoplasma Echo Chamber",
        "Ghouly ghosts",
        54,
        3
    ),
    (
        "Boudoir of Bones",
        "Spooky skeletons",
        60,
        4
    );

-- NOTE: Usually we would let the DB automatically fill 'purchaseDate' and 'entryDate' with default values, but here, we want to seed data from past years.
INSERT INTO Tickets (customerID, priceID, quantity, purchaseDate, entryDate) VALUES
    (1, 1, 2, "2021-10-05 11:32:12", "2021-10-17 07:44:01"),
    (2, 2, 1, "2022-09-22 15:21:03", "2022-10-08 18:48:14"),
    (3, 2, 3, "2022-09-28 09:40:10", "2022-10-12 17:58:21"),
    (4, 3, 1, "2023-10-01 18:33:10", "2023-10-01 18:36:02"),
    (1, 3, 1, "2023-09-25 23:15:40", "2023-10-01 20:30:05");

INSERT INTO Employees (firstName, lastName, email, jobTitle, startDate, endDate, salary) VALUES 
    (
        "Vincent",
        "Vampire",
        "vincentv@email.com",
        "Count von Canapes",
        "2022-09-15 12:00:00",
        "2022-11-05 12:00:00",
        60000
    ),
    (
        "Drew",
        "Dracula",
        "drewd@email.com",
        "Head of Wardrobe",
        "2022-10-03 12:00:00",
        "2022-11-01 12:00:00",
        42000
    ),
    (
        "Greta",
        "Gravestone",
        "gretag@email.com",
        "Lady Carnelian",
        "2022-09-15 12:00:00",
        "2022-11-05 12:00:00",
        60000
    ),
    (
        "Bobbi",
        "Bandages",
        "bobbib@email.com",
        "Main Mummy",
        "2023-10-01 12:00:00",
        "2023-11-01 12:00:00",
        50000
    ),
    (
        "Jerry",
        "Jackal",
        "jerryj@email.com",
        "Anubis",
        "2023-10-01 12:00:00",
        "2023-11-01 12:00:00",
        55000
    );

INSERT INTO InventoryItems (name, itemCondition, roomID) VALUES 
    (
        "Ornate coffin",
        "Cushy. Fits one human.",
        3
    ),
    (
        "Sarcophagus",
        "Bit fragile. Do not sit on it.",
        2
    ),
    (
        "Crimson gown",
        "Victorian-inspired dress with bustle, mint condition.",
        NULL
    ),
    (
        "Pumpkinhead",
        "Well-preserved, not rotting.",
        NULL
    ),
    (
        "Eerie fog machine",
        "Working well.",
        5
    ),
    (
        "Haunted portrait",
        "Worn. Handle with care.",
        NULL
    ),
    (
        "Skeleton",
        "Excellent condition. Provenance unknown.",
        6
    );

-- NOTE: Usually we would let the DB handle 'creationDate' with a default value, but here we want to seed data from past years.
INSERT INTO Reviews (customerID, roomID, rating, text, creationDate) VALUES
    (
        1,
		4,
        5,
        "Just want to say The Catacombs really bury your competitors in the haunted house scene! Made my skin crawl.",
        "2021-10-19 10:02:20"
    ),
    (
        2,
		6,
        4,
        "The Boudoir of Bones is fantastically decorated, so creepy. Would not be able to sleep a wink here!",
        "2021-10-09 12:20:10"
    ),
    (
        3,
		NULL,
        5,
        "I had a ghoul old time! The atmosphere was electric, just like Frankenstein's laboratory!",
        "2022-10-13 16:11:10"
    ),
    (
        4,
		NULL,
        3,
        "It had some fang-tastic moments, but let's brew up some spookier scares next time!",
        "2023-10-03 17:04:12"
    );

/*--------------------------------
    Intersection table inserts
--------------------------------*/

INSERT INTO InventoryItems_Employees (itemID, employeeID) VALUES
    (3, 3),
    (3, 2),
    (2, 5);