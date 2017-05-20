var express = require("express");
var load = require("express-load");

module.exports = function(){
	
	var app = express();
	app.set("view engine", "ejs");
	app.set("views", "./app/views");

	load("infra", {cwd:'app'})
		.then("routes")
		.into(app);
	
	return app;
}