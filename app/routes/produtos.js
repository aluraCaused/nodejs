
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
		response.render("produtos/form", {errosValidacao: {}, produto:{}});
	})

	app.post("/produtos", function(request, response){
		var produto = request.body;

		request.assert("titulo", "Título é obrigatorio").notEmpty();
		request.assert("preco", "Formato inválido").isFloat();
		
		var erros = request.validationErrors();

		if(erros){
			response.format({
				html: function(){
					response.status(400).render("produtos/form", {errosValidacao: erros, produto:produto});
				},
				json: function(){
					response.status(400).json(erros);
				}
			})
			return;
		}
		
		
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.salva(produto, function(err, results){
			response.redirect("/produtos");
		})
	})
}