  
var request = require('request');
var http = require('http');  
var qs = require('querystring'); 
var json = require('json');

var data = {  
    "uid": "4294967563",
    "channel": 10,
    "area": 5013
};//这是需要提交的数据  
var content = qs.stringify(data);  
var content1 = JSON.stringify(data);
  
var options = {  
    hostname: '127.0.0.1',  
    port: 8080,  
    path: '/queryPlayer?',  
    method: 'POST'  
};  

var req = http.request(options, function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log('BODY: ' + chunk);  
    });  
});  
  
req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
});  
req.write(content1);
req.end();