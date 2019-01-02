//引入redis
var redis = require("redis");
var conf = require('./config.js')
//创建redis客户端
var db = redis.createClient(conf.GM_LOGSERVER_DB.port, conf.GM_LOGSERVER_DB.server);
//连接错误处理
db.on("error", function (error) {
    console.log(error);
});

db.on('connect', function(){
    console.log('Redis连接成功.');
});


function online(socket,zoneid){
    var tem = db.lrange("online"+zoneid,0,-1,function (err, res) {
        if (err) {
            console.log("err:" + err);
        }
        else {
            socket.emit("FindOnlineRsp",(res)) 
           // if (res != "") {
            //    socket.emit("FindOnlineRsp",(res)) 
            //}
        }
        });
}

module.exports.online = online;