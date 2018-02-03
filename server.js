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

io.sockets.on('connection', function (socket){
    socket.on('clientmsg', function (data){
      console.log(data);
       socket.emit('servermsg',data);
    });
    socket.on('login',function(data){
        console.log("recve login event");
        login(socket,data.user,data.password);
    });
    socket.on('searchPlayer',function(host,port,data)
    {
        console.log('searchPlayer'+host+data);
        oss.searchPlayer(socket,host,port,data);
    });
     socket.on('searchAccount',function(host,port,data)
    {
        console.log('searchAccount'+host+data);
        oss.searchAccount(socket,host,port,data);
    });
    socket.on('queryPlayer',function(host,port,data)
    {
        oss.queryPlayer(socket,host,port,data.user);
    });
    
    socket.on('updatePlayer',function(host,port,data)
    {
        oss.updatePlayer(socket,host,port,data);
    });
    socket.on('KickPlayer',function(host,port,data)
    {
        console.log('KickPlayer')
        oss.KickPlayer(socket,host,port,data);
    })
    socket.on('BannedPlayer',function(host,port,data){
        oss.BannedPlayer(socket,host,port,data);
    })
    socket.on('sendMail',function(host,port,data){
        console.log('sendMail');
        oss.sendMail(socket,host,port,data);
    })
    socket.on('online',function(host,port){
        console.log('online');
        oss.online(socket,host,port);
    })
    socket.on('GetBag',function(host,port,data){
        console.log('get bag');
        oss.GetBag(socket,host,port,data);
    })

});
console.log("http://192.168.31.249:8082")