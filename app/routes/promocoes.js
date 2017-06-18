module.exports = function(app){
    app.get("/promocoes/form", function(request, response){
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutosDAO(connection);

        produtoDAO.lista(function(erros, resultado){
            response.render("promocoes/form", {livros:resultado});
        });
        connection.end();
    });

    app.post("/promocoes", function(request, response){
        var promocao = request.body;
        app.get("io").emit("novaPromocao", promocao);
        response.redirect("promocoes/form");

    })
}