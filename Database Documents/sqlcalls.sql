-- Gets the user and the authentication info
SELECT * 
FROM users, auth 
WHERE userid=id 
AND email='andrew@test.com' AND hpassword='alskdfjlfjksa';

-- Create a new user
WITH x AS (
	INSERT INTO users (firstname, lastname, email)
	VALUES ('Test', 'McTest', 'test@word.com')
	RETURNING id
)
INSERT INTO auth (userid, hpassword)
VALUES ((SELECT id FROM x), 'lskadjflj');

-- Get lists for x user
SELECT DISTINCT listid, name, type, creator, creationtimestamp
FROM userlists, lists 
WHERE userlists.listid=lists.id AND userid=4
ORDER BY creationtimestamp;

-- Get pending lists for x user
SELECT DISTINCT listid, name, type, creator, creationtimestamp
FROM pendinguserlists, lists 
WHERE pendinguserlists.listid=lists.id AND userid=1
ORDER BY creationtimestamp;

-- get listitems for a list that the user is a member of
SELECT * from listitems WHERE listid=1 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- Create a new list with user added as a member
WITH x AS (
	INSERT INTO lists (name, type, creator)
	VALUES ('My First added list', 1, 1)
	RETURNING id
)
INSERT INTO userlists (userid, listid)
VALUES (1, (SELECT id FROM x));

-- Delete themselves from a list
WITH x AS (
	DELETE FROM userlists
	WHERE userid=1 AND listid=12
	RETURNING userid, listid
)
INSERT INTO removeduserlists (userid, listid)
SELECT * FROM x;

-- Get users of a list if user belongs to list
SELECT DISTINCT userid, firstname, lastname
FROM userlists, users 
WHERE userlists.userid=users.id AND listid=12 AND userid<>4
AND EXISTS (
	SELECT * FROM userlists WHERE userid=4 AND listid=12
)
ORDER BY lastname, firstname;

-- Get pending users of a list if user belongs to list
SELECT DISTINCT userid, firstname, lastname
FROM pendinguserlists, users 
WHERE pendinguserlists.userid=users.id AND listid=40
AND EXISTS (
	SELECT * FROM userlists WHERE userid=11 AND listid=40
)
ORDER BY lastname, firstname;

-- Invite a user to join a list
INSERT INTO pendinguserlists (userid, listid)
SELECT 4, 1
WHERE EXISTS 
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- Approve an invite
WITH x AS (
	DELETE FROM pendinguserlists
	WHERE userid=2 AND listid=11
	RETURNING userid, listid
)
INSERT INTO userlists (userid, listid)
SELECT * FROM x;

-- Decline an invite
DELETE FROM pendinguserlists where userid=4 AND listid=1;

-- update the list name if creator
UPDATE lists
SET name='bleh bleh'
WHERE id=13 AND creator=1;

-- Search for users to add to a list
SELECT * FROM users 
WHERE email ~* '.*drew@test.com.*' 
AND id<>1
LIMIT 10;

-- DELETE other user if user creator the list
WITH x AS (
	DELETE FROM userlists
	WHERE userid=4 AND listid=1
	RETURNING userid, listid
)
INSERT INTO removeduserlists (userid, listid)
SELECT * FROM x WHERE EXISTS
(
	SELECT * FROM lists WHERE listid=1 AND CREATOR=1
);

-- Delete a pending user request from a managed list
DELETE FROM pendinguserlists
WHERE userid=4 and listid=40
AND EXISTS
(
	SELECT * FROM userlists WHERE userid=11 AND listid=40
);

-- Create an item for a list user is apart of
INSERT INTO listitems (listid, name, price, recipient, creator)
SELECT 1, 'New Item and Such', 0, '', 1
WHERE EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- Trash an item that is in a list user is apart of
UPDATE listitems SET trashed=TRUE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- Remove an item from the trash
UPDATE listitems SET trashed=FALSE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- Set an item complete
UPDATE listitems SET completed=TRUE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- unset an item complete
UPDATE listitems SET completed=FALSE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- edit an items information
UPDATE listitems
SET 
	name = 'Updated Last item',
	price = '13.00',
	recipient = 'Yo Momma'
WHERE id = 37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

-- Get pendinguserlists notis
SELECT 
	notis.id AS NotiID, 
	notis.creationtimestamp AS NotiTimestamp, 
	notis.read,
	lists.id AS ListID,
	lists.name AS ListName
FROM notis, pendinguserlists, lists
WHERE 
	notis.pendinguserlistsid=pendinguserlists.id
	AND pendinguserlists.listid = lists.id
	AND notis.userid=1
	AND pendinguserlistsid IS NOT NULL;

-- Get approved userlist notis
SELECT 
	notis.id AS NotiID, 
	notis.creationtimestamp AS NotiTimestamp, 
	notis.read,
	users.id AS aUserID,
	users.firstname AS aUserFirstName,
	users.lastname AS aUserLastName,
	lists.id AS ListID,
	lists.name AS ListName
FROM notis, userlists, lists, users
WHERE
	notis.approveduserlistid=userlists.id
	AND userlists.listid=lists.id
	AND userlists.userid=users.id
	AND notis.userid=1
	AND approveduserlistid IS NOT NULL;

-- Get removal notis
SELECT 
	notis.id AS NotiID, 
	notis.creationtimestamp AS NotiTimestamp, 
	notis.read,
	users.id AS aUserID,
	users.firstname AS aUserFirstName,
	users.lastname AS aUserLastName,
	lists.id AS ListID,
	lists.name AS ListName
FROM notis, removeduserlists, lists, users
WHERE
	notis.removeduserlistsid=removeduserlists.id
	AND removeduserlists.listid=lists.id
	AND removeduserlists.userid=users.id
	AND notis.userid=1
	AND removeduserlistsid IS NOT NULL;

-- Set a noti as read
UPDATE notis
SET read=TRUE
WHERE
	userid=1
	AND id=19;







