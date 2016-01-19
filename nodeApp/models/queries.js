var queries = {};

// Gets the user and the authentication info
queries.getUserForAuth = "SELECT * "
	+ "FROM users, auth "
	+ "WHERE userid=id "
	+ "AND email=($1) AND hpassword=($2);";

// Create a new user
queries.createNewUser = "WITH x AS ( "
		+ "INSERT INTO users (firstname, lastname, email) "
		+ "VALUES (($1), ($2), ($3)) "
		+ "RETURNING id "
		+ ") "
	+ "INSERT INTO auth (userid, hpassword) "
	+ "VALUES ((SELECT id FROM x), ($4));";

// Get lists for x user
queries.getListForUser = "SELECT DISTINCT listid, name, type, creator, creationtimestamp "
	+ "FROM userlists, lists "
	+	"WHERE userlists.listid=lists.id AND userid=($1) "
	+ "ORDER BY creationtimestamp;";


// Get pending lists for x user
queries.getPendingForUser = "SELECT DISTINCT listid, name, type, creator, creationtimestamp "
	+ "FROM pendinguserlists, lists "
	+ "WHERE pendinguserlists.listid=lists.id AND userid=($1) "
	+ "ORDER BY creationtimestamp;";

// get listitems for a list that the user is a member of [listid, userid]
queries.getItemsForList = "SELECT * from listitems "
	+ "WHERE listid=($1) AND EXISTS "
	+ "( "
	+ "SELECT * FROM userlists WHERE userid=($2) AND listid=($1) "
	+ ");"

// Create a new list with user added as a member [name, type, userid]
queries.createNewList = "WITH x AS ( "
		+ "INSERT INTO lists (name, type, creator) "
		+ "VALUES (($1), ($2), ($3)) "
		+ "RETURNING id "
	+ ") "
	+ "INSERT INTO userlists (userid, listid) "
	+ "VALUES (($3), (SELECT id FROM x));";

// Delete themselves from a list [userid, listid]
queries.deleteSelfFromList = "WITH x AS ( "
		+ "DELETE FROM userlists "
 		+ "WHERE userid=($1) AND listid=($2) "
		+ "RETURNING userid, listid "
	+ ") "
	+ "INSERT INTO removeduserlists (userid, listid) "
	+ "SELECT * FROM x;";

// Get users of a list if user belongs to list [listid, userid]
queries.getUsersOfAList = "SELECT DISTINCT userid, firstname, lastname "
	+ "FROM userlists, users "
	+ "WHERE userlists.userid=users.id AND listid=($1) "
	+ "AND EXISTS ( "
		+ "SELECT * FROM userlists WHERE userid=($2) AND listid=($1) "
	+ ") "
	+ "ORDER BY lastname, firstname;";

// Invite a user to join a list [friendid, listid, userid]
queries.inviteFriendToList = "INSERT INTO pendinguserlists (userid, listid) "
	+ "SELECT ($1), ($2) "
	+ "WHERE EXISTS "
	+ "( "
		+ "SELECT * FROM userlists WHERE userid=($3) AND listid=($2) "
	+ ");";

// Approve an invite [userid, listid]
queries.approveInvite = "WITH x AS ( "
		+ "DELETE FROM pendinguserlists "
		+ "WHERE userid=($1) AND listid=($2) "
		+ "RETURNING userid, listid "
	+ ") "
	+ "INSERT INTO userlists (userid, listid) "
	+ "SELECT * FROM x;";

// Decline an invite [userid, listid]
queries.declineInvite = "DELETE FROM pendinguserlists where userid=($1) AND listid=($2);";

// update the list name if creator [listName, listid, creatorID]
queries.updateListName = "UPDATE lists "
	+ "SET name=($1) " 
	+ "WHERE id=($2) AND creator=($3);";

/*
// Update list type if creator
UPDATE lists
SET type=2
WHERE id=13 AND creator=1;

// Search for users to add to a list
SELECT * FROM users WHERE email ~* '.*drew@test.com.*';

// DELETE other user if user creator the list
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

// Create an item for a list user is apart of
INSERT INTO listitems (listid, name, price, recipient, creator)
SELECT 1, 'New Item and Such', 0, '', 1
WHERE EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

// Trash an item that is in a list user is apart of
UPDATE listitems SET trashed=TRUE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

// Remove an item from the trash
UPDATE listitems SET trashed=FALSE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

// Set an item complete
UPDATE listitems SET completed=TRUE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

// unset an item complete
UPDATE listitems SET completed=FALSE WHERE id=37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

// edit an items information
UPDATE listitems
SET 
	name = 'Updated Last item',
	price = '13.00',
	recipient = 'Yo Momma'
WHERE id = 37 AND EXISTS
(
	SELECT * FROM userlists WHERE userid=1 AND listid=1
);

// Get pendinguserlists notis
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

// Get approved userlist notis
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

// Get removal notis
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

// Set a noti as read
UPDATE notis
SET read=TRUE
WHERE
	userid=1
	AND id=19;
*/

module.exports = queries;



