var assert = require('assert');
var http = require('http');
var msgpack = require('msgpack');

// request data format
var useJson = false;

// response data format
var acceptJson = false;

var o = {"name": "しゅん"};
var b = msgpack.pack(o);
var oo = msgpack.unpack(b);
assert.deepEqual(oo, o);

var reqData;
var contentType;
var accept;

reqData = useJson ? JSON.stringify(o) : b;
contentType = useJson ? 'application/json' : 'application/x-msgpack';
accept = acceptJson ? 'application/json' : 'application/x-msgpack';

console.log('REQUEST');
console.log('> BODY: ' + reqData);

var options = {
    method: 'POST',
    headers: {
        'Content-Type': contentType,
        'Accept': accept,
    },
    hostname: 'localhost',
    port: 8080,
    path: '/user/register',
};

var req = http.request(options, function(res) {
    console.log('\nRESPONSE');
    console.log('< STATUS: ' + res.statusCode);
    console.log('< HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('< BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(reqData);
req.end();
