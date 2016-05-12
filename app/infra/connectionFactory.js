var mysql = require('mysql');

module.exports = function() {
	return createDbConnection;
}

function createDbConnection() {

	if (!process.env.NODE_ENV) {
		return mysql.createConnection({
			host : 'localhost',
			user : 'nodejs',
			password : 'nodejs',
			database : 'nodedb'
		});
	}

	if (process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
			host : 'localhost',
			user : 'nodejs',
			password : 'nodejs',
			database : 'nodedb_test'
		});
	}
}