var http = require('http');

var conf = {
    hostname:"localhost",
    port:"3000",
    path:"/produtos",
    headers : {
        "Accept" : "application/json"
    }
}

http.get(conf, function(response){
     console.log(response.statusCode);
    response.on('data', function(body){
        console.log("Corpo:" +body);
    })
})