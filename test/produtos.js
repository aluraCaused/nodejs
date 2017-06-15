var express = require("../config/express")();
var request = require("supertest")(express);
var DataBaseCleaner = require("database-cleaner");

describe("#ProdutosController", function(){

    beforeEach(function(done){
        var cleaner = new DataBaseCleaner("mysql");
        cleaner.clean(express.infra.connectionFactory(), function(){
            done();
        })
    })
    it("#listagem json", function(done){
        request.get("/produtos")
        .set("Accept", "text/html")
        .expect("Content-type", /html/)
        .expect(200, done);
    })

    it("#cadastro de produtos com dados inválidos", function(done){
        request.post("/produtos")
        .send({titulo:"", descricao:"novo livro"})
        .expect(400, done);
    })

    it("cadastro de produtos com dados válidos", function(done){
        request.post("/produtos")
        .send({titulo:"Livro teste", descricao:"novo livro", preco :20.10})
        .expect(302, done);
    })
})