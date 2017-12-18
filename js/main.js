var fs = require('fs');
var http = require('http');
var server = http.createServer();
var path = require('path');
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
           }
        }
    }
    
  

});
server.listen(4000);