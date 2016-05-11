var mysql = require('mysql');

module.exports = function() {
	return createDbConnection;
}

function createDbConnection() {
	return mysql.createConnection({
		host : 'localhost',
		user : 'nodejs',
		password : 'nodejs',
		database : 'nodedb'
	});
}