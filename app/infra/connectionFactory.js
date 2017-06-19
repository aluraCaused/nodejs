var mysql = require("mysql");

function createDBConnection(){
		if(!process.env.NODE_ENV){
			return mysql.createConnection({
				host : "localhost",
				user : "root",
				password: "root",
				database:"casadocodigo_nodejs"
			});
		}

		if(process.env.NODE_ENV == "test"){
			return mysql.createConnection({
				host : "localhost",
				user : "root",
				password: "root",
				database:"casadocodigo_nodejs_test"
			});
		}

		if(process.env.NODE_ENV == "production"){
			return mysql.createConnection({
				host : "us-cdbr-iron-east-03.cleardb.net",
				user : "be7597d8a485a5",
				password: "14b3901f",
				database:"heroku_761000acc974b51"
			});
		}

		
}

module.exports = function(){
	return createDBConnection;
}

