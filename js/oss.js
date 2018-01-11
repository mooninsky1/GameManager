var db = require('./gamedb.js');
var request = require('request');
var http = require('http');  

var data = {  
    "uid": "4294967563",
    "channel": 10,
    "area": 5013
};//这是需要提交的数据   
var content = JSON.stringify(data);
  
var options = {  
    hostname: '127.0.0.1',  
    port: 8080,  
    path: '/queryPlayer?',  
    method: 'POST'  
};  
var updatePlayerOption = {  
    hostname: '127.0.0.1',  
    port: 8080,  
    path: '/updatePlayer?',  
    method: 'POST'  
};
var updatePlayerData = {  
    "uid": "21530671054870",
    "param":   [  {"36_10":"10"}   ]    ,
    "area": 5013
};//这是需要提交的数据   
var content = JSON.stringify(data);
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
function queryPlayer(socket,user)
{
    console.log("haha");
    var req = http.request(options, function (res) {  
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
    req.write(content);
    req.end();

}
function updatePlayer(socket,host,data)
{
    console.log(data);
    console.log(host);
    updatePlayerOption.hostname = host;
    var req = http.request(updatePlayerOption, function (res) {  
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
module.exports.queryuser = queryuser;
module.exports.queryPlayer = queryPlayer;
module.exports.updatePlayer = updatePlayer;