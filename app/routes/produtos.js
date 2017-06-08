
module.exports = function(app){
	app.get("/produtos", function(request, response){

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			response.format({
				html:function(){
					response.render("produtos/lista", {lista:results})
				},
				json:function(){
					response.json(results);
				}
			})
		});
		

		connection.end();

		
	});

	app.get("/produtos/form", function(request, response){
		response.render("produtos/form");
	})

	app.post("/produtos", function(request, response){
		var produto = request.body;

		var tituloValidator = request.assert("titulo", "Título é obrigatorio");
		tituloValidator.notEmpty();

		var erros = request.validationErrors();

		if(erros){
			response.render("produtos/form");
			return;
		}
		
		
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.salva(produto, function(err, results){
			response.redirect("/produtos");
		})
	})
}