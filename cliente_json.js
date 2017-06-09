var http = require('http');

var conf = {
    hostname:"localhost",
    port:"3000",
    path:"/produtos",
    method:"post",
    headers : {
        "Accept" : "application/json",
        'Content-type':'application/json'
    }
}

var client = http.request(conf, function(response){
     console.log(response.statusCode);
    response.on('data', function(body){
        console.log("Corpo:" +body);
    })
})

var produto = {
    titulo : '',
    descricao: 'node, javascript e um pouco sobre http',
    preco: '100'
}

client.end(JSON.stringify(produto));

