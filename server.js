var express = require('express');
var conf = require('./js/config.js');
var app = express();
var  io = require('socket.io').listen(conf.GM_SERVER_PORT.socket_io_port); 
var  fs = require('fs');
var login = require('./js/login.js');
var oss = require('./js/oss.js');
var db = require('./js/db.js');
var online = require('./js/online.js');

//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname+'/js'))

app.listen(conf.GM_SERVER_PORT.app_port);
app.get('/log', function(req, res) {
    var num = req.params.num;
    res.send("你获取到form/后的参数:" + num);
    });

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
    socket.on('FindOnline',function(zoneid,t1,t2){
        console.log('FindOnline');
        online.online(socket,zoneid,t1,t2);
    })

});
console.log("localhost:"+conf.GM_SERVER_PORT.app_port)