var express = require('express');
var app = express();
var  io = require('socket.io').listen(8081); 
var  fs = require('fs');
var login = require('./js/login.js');
var oss = require('./js/oss.js');
var db = require('./js/db.js');

app.listen(8080);
//io.set('log level', 1);//将socket.io中的debug信息关闭

//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));
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
        login(socket,data.user,data.password);
    });
    socket.on('queryuser',function(data)
    {
        oss.queryuser(socket,data.user);
    });
    
});
console.log("http://localhost:8080")