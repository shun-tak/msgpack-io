var assert = require('assert');
var http = require('http');
var msgpack = require('msgpack');

// 送信するデータ形式を切り替えるフラグ
var useJson = false;

var o = {"name": "しゅん"};
var b = msgpack.pack(o);
var oo = msgpack.unpack(b);
assert.deepEqual(oo, o);

var data;
var contentType;
if (useJson) {
    // JSONで送る
    data = JSON.stringify(o);
    contentType = 'application/json';
} else {
    // MsgPackで送る
    data = b;
    contentType = 'application/x-msgpack';
}

console.log('REQUEST');
console.log('> BODY: ' + data);

var options = {
    method: 'POST',
    headers: {
        'Content-Type': contentType,
        // JSONで受け取る場合のヘッダ
        'Accept': 'application/json',
        // MsgPackで受け取る場合のヘッダ
        //'Accept': 'application/x-msgpack',
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

req.write(data);
req.end();
