INSERT INTO Users(FirstName, LastName, Email) VALUES
	('Andrew', 'Sheffield', 'andrew@test.com'),
	('Abi', 'Sheffield', 'abi@test.com'),
	('Kim', 'Sheffield', 'kim@test.com'),
	('Marissa', 'Kassel', 'riss@test.com');

INSERT INTO AUTH(UserID, HPassword) VALUES
	(1, 'alskdfjlfjksa'),
	(2, ';lksadjfl;kad'),
	(3, 'aslkjdfas;kld'),
	(4, ';alskdfjlsdjf');

INSERT INTO Lists(Name, Type, Creator) VALUES
	('My First Financial List', 1, 1), -- List 1
	('My First Simple List', 2, 1), -- List 2
	('My First Gift List', 3, 1), -- List 3
	('My First Financial List', 1, 2), -- List 4
	('My First Simple List', 2, 2), -- List 5
	('My First Gift List', 3, 2), -- List 6
	('My First Financial List', 1, 3), -- List 7
	('My First Simple List', 2, 3), -- List 8
	('My First Gift List', 3, 3), -- List 9
	('My First Financial List', 1, 4), -- List 10
	('My First Simple List', 2, 4), -- List 11
	('My First Gift List', 3, 4); -- List 12

-- Setting up financial items to be added to financial lists
INSERT INTO ListItems(ListID, Name, Price, Creator) VALUES
	(1, 'Beer', 12.99, 1),
	(1, 'Pizza', 25.50, 1),
	(1, 'Toilet Paper', 6.00, 1),
	(4, 'Coffee', 7.55, 2),
	(4, 'Chipotle', 12.98, 2),
	(4, 'Gas', 30.56, 2),
	(7, 'Movie', 54.69, 3),
	(7, 'Snacks', 10.15, 3),
	(7, 'Drinks', 21.30, 3),
	(10, 'Paper Towels', 12.66, 4),
	(10, 'Plates', 8.73, 4),
	(10, 'Cleaning Supplies', 27.37, 4);

-- Setting up simple items to be added to simple Lists
INSERT INTO ListItems(ListID, Completed, Name, Creator) VALUES
	(2, FALSE, 'Pay Bills', 1),
	(2, FALSE, 'Go to DMV', 1),
	(2, TRUE, 'Buy Groceries', 1),
	(5, FALSE, 'Water Plants', 2),
	(5, FALSE, 'Fill out papers', 2),
	(5, TRUE, 'Laundry', 2),
	(8, FALSE, 'Feed the dog', 3),
	(8, FALSE, 'Run Dishwasher', 3),
	(8, TRUE, 'Vacuum', 3),
	(11, FALSE, 'Pack Lunch', 4),
	(11, FALSE, 'Make Dinner', 4),
	(11, TRUE, 'Buy Ice cream', 4);

-- Setting up gift items to be added to gift Lists
INSERT INTO ListItems(ListID, Name, Recipient, Creator) VALUES
	(3, 'Slippers', 'Marissa', 1),
	(3, 'Big Beer hand', 'Joe', 1),
	(3, 'Legos', 'Abi', 1),
	(6, 'Shirt', 'Daddy', 2),
	(6, 'Pennies', 'Papa', 2),
	(6, 'Charm', 'Mammo', 2),
	(9, 'Money', 'Andrew', 3),
	(9, 'Money', 'Joe', 3),
	(9, 'Charm', 'Susan', 3),
	(12, 'Disneyland', 'Xav', 4),
	(12, 'Sharks Tix', 'Andrew', 4),
	(12, 'Raindeer Animal', 'Caiden', 4);

-- Users are attached to there own list
INSERT INTO UserLists(UserID, ListID) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 6),
	(3, 7),
	(3, 8),
	(3, 9),
	(4, 10),
	(4, 11),
	(4, 12);

-- Users are attahced to others lists
INSERT INTO UserLists(UserID, ListID) VALUES
	(1, 4),
	(1, 6),
	(1, 12),
	(2, 1),
	(2, 12),
	(3, 1),
	(3, 3),
	(3, 11),
	(4, 8),
	(4, 1);

INSERT INTO PendingUserLists(UserID, ListID) VALUES
	(1, 11),
	(2, 11),
	(3, 12),
	(4, 2);



