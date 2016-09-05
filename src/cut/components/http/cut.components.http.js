// TODO: convert to https
const http = require('http');

export function get(options,callback){

    const x =  http.request(options, function (response) {
        let body = '';
        response.on('data', function(d) {
            body += d;
        });

        response.on('end', function() {
            var parsed = JSON.parse(body);
            return callback(parsed);
        });

        response.on('error',function(err){
            return callback(err);
        })
    });

    x.end();
}

export function del(options,callback){

    const x =  http.request(options, function (response) {
        let body = '';
        response.on('data', function(d) {
            body += d;
        });

        response.on('end', function() {
            var parsed = JSON.parse(body);
            return callback(parsed);
        });

        response.on('error',function(err){
            return callback(err);
        })
    });

    x.end();

}

export function post(options,body,callback){

    let postData = JSON.stringify(body);
    let dataChunk = "";
    
    let req = http.request(options, (res) => {

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            dataChunk = chunk;
            console.log(dataChunk)
        });
        res.on('end', () => {

                if(dataChunk  === '{"message":"authorized"}'){
                    return callback(res.headers["authorization"]);
                }

                if (dataChunk === "OK"){
                    return callback(JSON.stringify( body ));
                }

                if (JSON.parse(dataChunk).status === 500) {
                    return callback(JSON.stringify({"message": JSON.parse(dataChunk)}));
                }

                if (res.statusCode === 401) {
                    return callback(JSON.stringify({"message": "Unauthorized Access"}));
                }


                return callback(postData);
        })
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

export function put(options,body,callback){

    let postData = JSON.stringify(body);

    let req = http.request(options, (res) => {

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
            return callback(postData)
        })
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

// write data to request body
    req.write(postData);
    req.end();
}