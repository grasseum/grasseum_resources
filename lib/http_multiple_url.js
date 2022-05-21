const url = require('url');
const structkit = require("structkit");
const config = require("grasseum_resources/config");

class HttpRequestMultipleURL {

    constructor (configInit) {

        this.list_file = [];
        this.config = configInit;

    }

    fetch (url_path, funcSuccess, funcFailed) {

        const that = this;
        let alloc_http;

        url_path.forEach((element) => {


            if (that.list_file.indexOf(element) === -1) {

                const options = new url.URL(element);

                const select_http = config.http_assign();
                const protocol_option = options.protocol.replace(/[:]/g, "");

                if (structkit.has(select_http, protocol_option)) {

                    alloc_http = select_http[protocol_option];

                } else {

                    alloc_http = select_http.http;

                }
                const local_http =alloc_http.module;

                options.port=alloc_http.port;
                options.method=alloc_http.method;


                local_http.get(options, function (res) {

                    funcSuccess(element, res);

                }).on('error', function (error) {

                    //
                    funcFailed(element, error);

                });

            }
            that.list_file.push(element);

        });

    }

}

module.exports = function (configInit) {

    return new HttpRequestMultipleURL(configInit);

};
