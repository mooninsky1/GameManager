//var express = require('express');
//var app = express();
var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');
httpd.listen(8082);
function handler(req,res)
{
  fs.readFile(__dirname+ '/index.html',function(err,data)
  {
    if(err)
    {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  })
}
io.sockets.on('connection',function(socket)
{
  //console.log('context');
  socket.on('my',function(context)
  {
    console.log('aaaaa');
  });
  socket.on('close',function()
  {
    console.log('bbb');
  });
   socket.emit('servermsg',"cccc");
   // socket.emit('news', { hello: 'world' });
});

//会打开目录html下的index.html 静态,
//app.use(express.static(__dirname + '/html'));
//动态
//app.get('/api', function (req, res) {
//  res.send('Hello world!');
//});
//app.listen(8080);
//console.log("http://localhost:8080")