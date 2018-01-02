var fs = require('fs');
var http = require('http');
var server = http.createServer();
var path = require('path');
var client = require('./client.js');
server.on('request',function(req,res)
{
    console.log(req.url);
    switch(req.url)
    {
        case '/':
        {
            res.writeHead(200,{'Content-Type':'text/html'});
            var rs = fs.createReadStream('../html/ossmanu.html');
            rs.pipe(res);
            break;
        }
       default:
       {    
           if(path.extname(req.url) == '.html')
           {
                res.writeHead(200,{'Content-Type':'text/html'});
                var rs = fs.createReadStream("../html/" +req.url);
                rs.pipe(res);
           }
           else
           {
               console.log("not prcess url "+req.url);
               res.end();
           }
        }
    }
    
  

});
server.listen(4000);
console.log("Web server has started.\nPlease log on http://127.0.0.1:4000")