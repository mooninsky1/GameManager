var express = require('express');
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const myfs=require("fs");//文件的输入输出
var multer = require('multer');//Multer是一个用于处理multipart / form-data的node.js中间件，主要用于上传文件。它构建在busboy基础上以提高效率。点击 这里 阅读更多关于multer包。
var conf = require('./js/config.js');
var app = express();
var  io = require('socket.io').listen(conf.GM_SERVER_PORT.socket_io_port); 
var  fs = require('fs');
var login = require('./js/login.js');
var oss = require('./js/oss.js');
var db = require('./js/db.js');
var url = require('url');
var querystring = require("querystring");

//登录账号
var hashLoginUser = new Array();
var online = require('./js/online.js');
//权限校验
function pathcheck(req,res,next)
{
    if(req.path == '/navigation.html')
    {
        var parseObj = url.parse(req.url);
        var params = querystring.parse(parseObj.query);
        console.log(params.token);
        console.log("path check");
        
        jwt.verify(params.token,'my_token',function(err,decode)
        {
            if(err)
            {
                console.log('decode error')
            }
            else
            {
                console.log("decode ok");
                res.writeHead(200,{'Content-Type':'text/html'})
                fs.readFile('./protected/navigation.html','utf-8',function(err,data){
                if(err)
                {
                     throw err ;
                }
                res.end(data);
                });
            }
        })
        return;
    
    }
    res.end();
}
//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));
// '/protected' 路径不能静态访问，需要检验
//app.use(express.static(__dirname + '/protected'));
//app.use(express.static(__dirname + '/protected'));
//app.use( '/protected',pathcheck);
//app.use( '/protected');
app.use(express.static(__dirname+'/js'))
app.use(express.static(__dirname+'/Images'))
//app.use ： 用来给path注册中间函数的。这个path默认是“/”，也就是处理任何请求，同时注意的是他会处理path下的子路径
app.use(pathcheck)
app.use(expressJwt({
    secret: 'secret12345'  // 签名的密钥 或 PublicKey
  }).unless({
    path: ['/']  // 指定路径不经过 Token 解析
  }))
app.listen(conf.GM_SERVER_PORT.app_port);
//这个路径需要权限校验
//app.get("/protected", pathcheck)

app.get('/log', function(req, res) {
    var num = req.params.num;
    res.send("你获取到form/后的参数:" + num);
    });
app.get('/Images/echarts.js', function (req, res) {
    var num = req.params.num;
    res.download(__dirname+"/Images/echarts.js");
});
app.post('/mail?' ,function(req ,res){
    req.on('data',function(data){
        console.log('mail http post '+decodeURIComponent(data) );
    })
    req.on('end',function(){
        console.log('mail http post end')
    })
    res.end();
})

 //   然后，创建说明应该在哪里以及如何保存文件/图像的storage。
 /*
 每个文件包含以下信息：

fieldname：在窗体中指定的字段名

originalname：用户计算机上文件的名称

encoding：文件的编码类型

mimetype：文件的MIME类型

size：文件的大小（以字节为单位）

destination：保存文件的文件夹

filename：目标文件的名称

path：上传文件的完整路径

buffer：整个文件的Buffer
 */
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

//上传上来的文件一般都存在C盘的临时文件中，若要存储在服务器重需要设置一个临时存储地，还需要在
//服务器配置中的bodyParserz中配置bodyParser({uploadDir:".public/temp"{)
app.post("/uploadfile.do",function(req,res){
    console.log(req.files);//文件上传请求信息
    let username="zzz";//这里的name需要用户登录，存在session中，然后从session中取出来
    let tempPath=req.files.myfile.path;//找到临时路径
    let filename=req.files.myfile.originalFilename;
    let targetPath="./public/upload/"+username+"/"+filename;//将文件放入上传上来的目标路径
    if(myfs.existsSync("./public/upload/"+username)==false){//判断upload路径下是否存在该用户的文件夹
        myfs.mkdirSync("./public/upload/"+username);//没有的话，就创建一个文件夹
    }
    myfs.rename(tempPath,targetPath,function(err,data){
        console.log(err);
        console.log(data);
        if(err==null){
            res.send("upload succeed!");
        }else{
            throw err;//抛出错误
        }
    })});　
function write_log(loginuser,opt,data)
{
    //var keyToDelete = "loginuser";
    //delete data.keyToDelete;
    var newDate = new Date();
    var sql = "insert INTO gm ([user], [opt],[log], [logtime]) VALUES('"+loginuser + "','"+opt + "','"+data + "' , CONVERT(datetime,'"+newDate.toLocaleString()+"',101))";
    console.log(sql);
    db.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("log db err");
        }
        else
        {
            console.log("log db OK");
        }
    });
}
io.sockets.on('connection', function (socket){
    socket.on('clientmsg', function (data){
      console.log(data);
       socket.emit('servermsg',data);
    });
    socket.on('login',function(data){
        console.log("recve login event");
        login(socket,data.user,data.password);
        hashLoginUser[socket.id] = data.user;
        console.log("socket id:"+socket.id+hashLoginUser[socket.id]);
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
        loginuser = data.loginuser;
        if(loginuser == null){
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        oss.updatePlayer(socket,host,port,data);
        write_log(loginuser,'修改属性',JSON.stringify(data));
    });
    socket.on('KickPlayer',function(host,port,data)
    {
        loginuser = data.loginuser;
        if(loginuser == null){
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        oss.KickPlayer(socket,host,port,data);
        write_log(loginuser,'踢人',JSON.stringify(data));
    })
    socket.on('BannedPlayer',function(host,port,data){
        loginuser = data.loginuser;
        if(loginuser == null){
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        oss.BannedPlayer(socket,host,port,data);
        write_log(loginuser,'封号',JSON.stringify(data));
    })
    socket.on('sendMail', function (host, port, data) {
        loginuser = data.loginuser;
        if(loginuser == null){
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        //邮件使用服务器时间
        data.showStart = new Date().getTime();
        data.showEnd += data.showStart;
        oss.sendMail(socket, host, port, data);
        write_log(loginuser, '发送邮件', JSON.stringify(data));
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
    socket.on('QueryLog',function(t1,t2){
        console.log('QueryLog');
        oss.QueryLog(socket,t1,t2);
    })
    socket.on('sendNotice',function(host,port,data){
        console.log('sendNotice');
        oss.sendNotice(socket,host,port,data);
    })
    socket.on('sendMailonTime',function(host,port,data,time){
        console.log('sendMailonTime');
        oss.sendMailonTime(socket,host,port,data,time);
    })
    socket.on('GetServerList',function(){
        console.log('GetServerList');
        oss.GetServerList(socket);
    })
    socket.on('UpdateServerStat',function(data){
        loginuser = data.loginuser;
        if(loginuser == null){
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        oss.UpdateServerStat(socket,data);
        write_log(loginuser, '修改服务器状态', JSON.stringify(data));
    })
    socket.on('QueryPayLog',function(t1,t2,actorid,zoneid){
        oss.QueryPayLog(socket,t1,t2,actorid,zoneid);
    })
    socket.on('sendNoticeOnTime',function(data){
        oss.sendNoticeOnTime(socket,data);
    })
    socket.on('NoticeQury',function(){
        oss.NoticeQury(socket);
    })
    socket.on("GetActiveList",function(host,port,zoneid){
        oss.GetActiveList(socket,host,port,zoneid);
    })  
    socket.on('UpdateActivityStat',function(data){
        loginuser = data.loginuser;
        if(loginuser == null){
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        oss.UpdateActivityStat(socket,data);
        write_log(loginuser, '修改活动状态', JSON.stringify(data));
    })
    socket.on('AddActivity', function (data) {
        loginuser = data.loginuser;
        if (loginuser == null) {
            console.log("登录超时请重新登录!");
            return;
        }
        delete data.loginuser;
        oss.AddActivity(socket, data);
        write_log(loginuser, '增加活动状态', JSON.stringify(data));
    })
    socket.on('WhiteListSwitch',function(host,port,param){
        oss.WhiteListSwitch(socket,host,port,param);
    })
    socket.on('WhiteListQuery', function (host, port) {
        oss.WhiteListQuery(socket, host, port);
    })
    socket.on('ClientUpdateQuery', function () {
        oss.ClientUpdateQuery(socket);
    })
    socket.on('ClientUpdateSet', function (data) {
        loginuser = data.loginuser;
        delete data.loginuser;
        oss.ClientUpdateSet(socket, data);
        write_log(loginuser, '修改客户端更新状态', JSON.stringify(data));
    })
    socket.on('ClientVersionQuery', function () {
        oss.ClientVersionQuery(socket);
    })
    socket.on('ClientVersionSet', function (data) {
        loginuser = data.loginuser;
        delete data.loginuser;
        oss.ClientVersionSet(socket, data);
        write_log(loginuser, '修改客户端版本号', JSON.stringify(data));
    })
});
console.log("localhost:"+conf.GM_SERVER_PORT.app_port)