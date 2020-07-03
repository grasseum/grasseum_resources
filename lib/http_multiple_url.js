
var url = require('url');
var compt = require("compts");
var config = require("grasseum_resources/config");
class httpRequestMultipleURL{
    constructor(config){
        this.list_file = []
        this.config = config

    }
    fetch(url_path,funcSuccess,funcFailed){
        var main = this;
        url_path.forEach(element => {
             
    
            if(main.list_file.indexOf(element)  == -1){
                var options = url.parse(element, true);
            
            var select_http = config.http_assign();
            var protocol_option = options.protocol.replace(/[:]/g,"");    
            
            if(compt._.has(select_http,protocol_option)){
                var alloc_http = select_http[protocol_option];
            }else{
                var alloc_http = select_http["http"];
            }
            var local_http =alloc_http['module'];
            options.port=alloc_http['port'];
            options.method=alloc_http['method'];


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

module.exports = httpRequestMultipleURL;