var db = require('./gamedb.js');
var logdb = require('./db.js');
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
function QueryLog(socket,  timestart, timeend){
    var sql = "SELECT * from gm where DATEDIFF(SECOND, '1970-1-1', [logtime]) >= "+timestart+" and DATEDIFF(SECOND, '1970-1-1', [logtime]) <= "+timeend+" ";
    console.log(sql);
    logdb.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
        }
        else{
            console.log(result);
            socket.emit("QueryLogRsp",result) 
        }
    });
}
function searchPlayer(socket,host,port,indata)
{
    debugger;
    Playeroptions.hostname = host;
     Playeroptions.port = port;
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
function searchAccount(socket,host,port,indata)
{
    debugger;
    Playeroptions.hostname = host;
    Playeroptions.port = port;
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
function queryPlayer(socket,host,port,user)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
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
function updatePlayer(socket,host,port,data)
{
    console.log(data);
    console.log(host);
    Playeroptions.hostname = host;
    Playeroptions.port = port;
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
function KickPlayer(socket,host,port,data)
{
    console.log('KickPlayer')
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/quitPlayer?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("KickPlayerRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function BannedPlayer(socket,host,port,data){
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/banned?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("BannedPlayerRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function sendMail(socket,host,port,data)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/sendMail?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("sendMailRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function online(socket,host,port)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/online?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("onlineRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    req.write(JSON.stringify(data));
    req.end();
}
function GetBag(socket,host,port,data){
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/queryBag?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("GetBagRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function sendNotice(socket,host,port,data)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/sendNotice?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
            socket.emit("sendNoticeRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function sendMailonTime(socket,host,port,data,time)
{

    setTimeout(() => {
        sendMail(socket,host,port,data)
    }, time);
    socket.emit("sendMailonTimeRsp","定时邮件发送成功")
}
module.exports.GetBag = GetBag;
module.exports.online = online;
module.exports.sendMail = sendMail;
module.exports.BannedPlayer = BannedPlayer;
module.exports.KickPlayer = KickPlayer;
module.exports.searchPlayer = searchPlayer;
module.exports.queryPlayer = queryPlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.searchAccount = searchAccount;
module.exports.sendNotice = sendNotice;
module.exports.sendMailonTime = sendMailonTime;
module.exports.QueryLog = QueryLog;