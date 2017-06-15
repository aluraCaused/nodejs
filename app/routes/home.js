module.exports = function(app){
    
    app.get("/", function(request, response){
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.lista(function(erro, result){
            response.render("home/index", {livros:result});
        });
        connection.end();
    })
}