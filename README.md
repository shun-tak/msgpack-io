# msgpack-io

You can create HTTP request with MessagePack (msgpack) body

## Usage

Execute app.js, then you can get api response:

```
$ node app.js
REQUEST
> BODY: ��name�しゅん

RESPONSE
< STATUS: 200
< HEADERS: {"date":"Wed, 02 Mar 2016 10:13:05 GMT","content-type":"application/json","content-length":"103","connection":"close"}
< BODY: {"result":true,"data":{"id":27,"name":"しゅん","createdAt":1456913585580,"updatedAt":1456913585580}}
```
