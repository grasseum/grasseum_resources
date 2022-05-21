
const http = require("http");
const https = require("https");

exports.http_assign = function () {

    const action = {
        "http": {
            "method": "GET",
            "module": http,
            "port": 80

        },
        "https": {
            "method": "GET",
            "module": https,
            "port": 443

        }
    };

    return action;

};
