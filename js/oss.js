var db = require('./gamedb.js');
var request = require('request');
var http = require('http');  

var data = {  
    "uid": "4294967563",
    "channel": 10,
    "area": 5013
};//这是需要提交的数据   
var content = JSON.stringify(data);
  
var Playeroptions = {  
    hostname: '127.0.0.1',  
    port: 8080,  
    path: '/queryPlayer?',  
    method: 'POST'  
};  

var updatePlayerData = {  
    "uid": "21530671054870",
    "param":   [  {"36_10":"10"}   ]    ,
    "area": 5013
};//这是需要提交的数据   
function queryuser(socket,user)
{
    var sql = "SELECT * from actor where [NickName]='"+user + "'";
    db.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
        }
        else{
            console.log(result);
            socket.emit("queryuserrsp",result) 
        }
    });
}
function searchPlayer(socket,host,indata)
{
    debugger;
    Playeroptions.hostname = host;
    Playeroptions.path = "/searchPlayer?";
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + JSON.parse(chunk));  
           socket.emit("searchPlayerRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    data.uid =   indata.user;
    data.area = indata.area
    var content = JSON.stringify(data);
    req.write(content);
    req.end();

}
function searchAccount(socket,host,indata)
{
    debugger;
    Playeroptions.hostname = host;
    Playeroptions.path = "/searchAccount?";
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log("searchAccountRsp");  
            socket.emit("searchAccountRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    data.account =   indata.user;
    data.area = indata.area
    var content = JSON.stringify(data);
    req.write(content);
    req.end();

}
function queryPlayer(socket,host,user)
{
    Playeroptions.hostname = host;
    Playeroptions.path = "/queryPlayer?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("queryuserrsp1",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    data.uid =   user;
    var content = JSON.stringify(data);
    req.write(content);
    req.end();

}
function updatePlayer(socket,host,data)
{
    console.log(data);
    console.log(host);
    Playeroptions.hostname = host;
    Playeroptions.path = "/updatePlayer?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("queryuserrsp1",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();

}
module.exports.searchPlayer = searchPlayer;
module.exports.queryPlayer = queryPlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.searchAccount = searchAccount;