var fs = require('fs');
var http = require('http');
var server = http.createServer();
server.on('request',function(req,res)
{
    res.writeHead(200,{'Content-Type':'text/html'});
    var rs = fs.createReadStream('../html/ossmanu.html');
    rs.pipe(res);

});
server.listen(4000);