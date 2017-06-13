var express = require("../config/express")();
var request = require("supertest")(express);

describe("#ProdutosController", function(){
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