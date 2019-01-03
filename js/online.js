//引入redis
var redis = require("redis");
var conf = require('./config.js')
//创建redis客户端
var db = redis.createClient(conf.GM_LOGSERVER_DB.port, conf.GM_LOGSERVER_DB.server);
//连接错误处理
db.on("error", function (error) {
    console.log(error);
});

db.on('connect', function () {
    console.log('Redis连接成功.');
});


function online(socket, zoneid, timestart, timeend) {
    var tem = db.lrange("online" + zoneid, 0, -1, function (err, res) {
        if (err) {
            console.log("err:" + err);
        }
        else {

            if (res != "") {
                var dataArry = [];
                for (var i = 0; i < res.length; i++) {
                    let data_json = JSON.parse(res[i]);
                    var t1 = data_json["time"];
                    if ( (t1 >= timestart && t1 <= timeend) || timestart==0) {
                        dataArry.push(data_json)
                    }
                }
                socket.emit("FindOnlineRsp", dataArry)

            }
            else {
                socket.emit("FindOnlineRsp", "");
            }
        }
    });
}

module.exports.online = online;