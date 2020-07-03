
var http = require("http");
var https = require("https");
exports.http_assign = function(){
    var action = {
        "http":{
            "module":http,
            "port":80,
            "method":"GET"
        },
        "https":{
            "module":https,
            "port":443,
            "method":"GET"
        }
    }

    return action;
}