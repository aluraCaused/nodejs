
module.exports = function(app){
	app.get("/produtos", function(request, response){

		var connection = app.infra.connectionFactory();

		connection.query("select * from produtos", function(err, results){
			response.render("produtos/lista", {lista:results})
		});

		connection.end();

		
	});
}