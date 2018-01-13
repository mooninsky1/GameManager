var express = require('express');
var app = express();
var  io = require('socket.io').listen(8081); 
var  fs = require('fs');
var login = require('./js/login.js');
var oss = require('./js/oss.js');
var db = require('./js/db.js');

//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));

app.listen(8082);
//io.set('log level', 1);//将socket.io中的debug信息关闭


//动态
//app.get('/index2.html', function (req, res) {
//  console.log("/index2.html");
 // res.send('Hello world!');
//});
io.sockets.on('connection', function (socket){
    socket.on('clientmsg', function (data){
      console.log(data);
       socket.emit('servermsg',data);
    });
    socket.on('login',function(data){
        console.log("recve login event");
        login(socket,data.user,data.password);
    });
    socket.on('searchPlayer',function(host,data)
    {
        console.log('searchPlayer'+host+data);
        oss.searchPlayer(socket,host,data);
    });
     socket.on('searchAccount',function(host,data)
    {
        console.log('searchAccount'+host+data);
        oss.searchAccount(socket,host,data);
    });
    socket.on('queryPlayer',function(host,data)
    {
        oss.queryPlayer(socket,host,data.user);
    });
    
    socket.on('updatePlayer',function(host,data)
    {
        oss.updatePlayer(socket,host,data);
    });
});
console.log("http://192.168.31.249:8082")