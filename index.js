var http = require("http");
var https = require("https");
var url = require('url');

class httpRequestMultipleURL{
    constructor(){
        this.list_file = []

    }
    fetch(url_path,funcSuccess,funcFailed){
        var main = this;
        url_path.forEach(element => {
            //console.log(element,":element");
            
    
            if(main.list_file.indexOf(element)  == -1){
                var options = url.parse(element, true);
                //console.log(options,":options")
            if(options.protocol == "https:"){
                var local_http = https;
                options.port=443
                options.method='GET'
            }else{
                var local_http = http;
                options.port=80
                options.method='GET'
            }    
    
            local_http.get(options, function(res) {
                funcSuccess(element,res)
          
            }).on('error', function(e) {
            
                //
                funcFailed(element,e)
             
              });
            }  
            main.list_file.push(element);
    });  
    }
}
exports.httpRequestMultipleURL = httpRequestMultipleURL;