var gamedb = require('./gamedb.js');
var logdb = require('./db.js');
var request = require('request');
var http = require('http'); 
var config = require('./config.js'); 

var data = {  
    "uid": "4294967563",
    "channel": 10,
    "area": 5013
};//这是需要提交的数据   
var content = JSON.stringify(data);
  
var Playeroptions = {  
    hostname: '127.0.0.1',  
    port: 8080,  
    path: '/queryPlayer?',  
    method: 'POST'  
};  

var updatePlayerData = {  
    "uid": "21530671054870",
    "param":   [  {"36_10":"10"}   ]    ,
    "area": 5013
};//这是需要提交的数据   
function queryuser(socket,user)
{
    var sql = "SELECT * from actor where [NickName]='"+user + "'";
    gamedb.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
        }
        else{
            //console.log(result);
            socket.emit("queryuserrsp",result) 
        }
    });
}
function QueryLog(socket,  timestart, timeend){
    var sql = "SELECT * from gm where DATEDIFF(SECOND, '1970-1-1', [logtime]) >= "+timestart+" and DATEDIFF(SECOND, '1970-1-1', [logtime]) <= "+timeend+" ";
    console.log(sql);
    logdb.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
        }
        else{
            //console.log(result);
            socket.emit("QueryLogRsp",result) 
        }
    });
}
function QueryPayLog(socket, timestart, timeend, actorid,zoneid) {
    if(zoneid > config.PAY_LOG_DB_list.length){
        console.log("QueryPayLog zonid error");
        return;
    }
    var sql = "SELECT  a.* ,b.NickName  from pay as a LEFT JOIN actor as b ON a.actorid=b.ActorID where state <> 1 and DATEDIFF(SECOND, '1970-1-1', [lupdate]) >= "+timestart+" and DATEDIFF(SECOND, '1970-1-1', [lupdate]) <= "+timeend+"  ";
    if(actorid){
        sql += "and a.actorid = "+actorid+" ";
    }
    sql +="  ORDER BY lupdate DESC "
    //console.log(sql);
    gamedb.querySql(config.PAY_LOG_DB_list[zoneid-1], sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            //console.log(result);
            socket.emit("QueryPayLogRsp", JSON.stringify(result) );
        }
    });
}
function searchPlayer(socket,host,port,indata)
{
    debugger;
    Playeroptions.hostname = host;
     Playeroptions.port = port;
    Playeroptions.path = "/searchPlayer?";
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + JSON.parse(chunk));  
           socket.emit("searchPlayerRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    data.uid =   indata.user;
    data.area = indata.area
    var content = JSON.stringify(data);
    req.write(content);
    req.end();

}
function searchAccount(socket,host,port,indata)
{
    debugger;
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/searchAccount?";
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log("searchAccountRsp");  
            socket.emit("searchAccountRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    data.account =   indata.user;
    data.area = indata.area
    var content = JSON.stringify(data);
    req.write(content);
    req.end();

}
function queryPlayer(socket,host,port,user)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/queryPlayer?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("queryuserrsp1",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    var data = {     };//这是需要提交的数据 
    data.uid =   user;
    var content = JSON.stringify(data);
    req.write(content);
    req.end();

}
function updatePlayer(socket,host,port,data)
{
    //console.log(data);
    //console.log(host);
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/updatePlayer?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("queryuserrsp1",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();

}
function KickPlayer(socket,host,port,data)
{
    //console.log('KickPlayer')
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/quitPlayer?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("KickPlayerRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function BannedPlayer(socket,host,port,data){
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/banned?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("BannedPlayerRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function sendMail(socket,host,port,data)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/sendMail?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("sendMailRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function online(socket, host, port) {
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/online?"
    var req = http.request(Playeroptions, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            socket.emit("onlineRsp", JSON.parse(chunk))
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    var data = {};//这是需要提交的数据 
    req.write(JSON.stringify(data));
    req.end();
}
function GetBag(socket,host,port,data){
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/queryBag?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
           socket.emit("GetBagRsp",JSON.parse(chunk)) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function sendNotice(socket,host,port,data)
{
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/sendNotice?"
    var req = http.request(Playeroptions, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
            socket.emit("sendNoticeRsp",chunk) 
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        });  
    req.write(JSON.stringify(data));
    req.end();
}
function sendMailonTime(socket,host,port,data,time)
{

    setTimeout(() => {
        sendMail(socket,host,port,data)
    }, time);
    socket.emit("sendMailonTimeRsp","定时邮件发送成功")
}
function GetServerList(socket)
{
    var sql = "SELECT * from server";
    //console.log(sql);
    logdb.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
        }
        else{
            console.log(result);
            socket.emit("GetServerListRsp",result) 
        }
    });
}
function UpdateServerStat(socket, data) {
    var sql = "update server set name=" + "'"+data.name +"'" + ", stat =" + data.stat + ", flag=" + data.flag + ", [open]=" + data.open+", [tips]="  + "'"+data.tips +"'"+" where id="+data.id;
    //console.log(sql);
    logdb.querySql(sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            console.log(result);
            socket.emit("UpdateServerStatRsp")
        }
    });
}

var notice_list=[];
function sendNoticeOnTime(socket,data){
    //console.log("sendNoticeOnTime"+JSON.stringify(data) );
    notice_list.push(data);
    
    //console.log("timenow:"+timenow);
    setInterval(() => {
        //console.log("sendNoticeOnTime ontime");
        var dateNow = new Date();
        var timenow = dateNow.getTime() / 1000 + 8 * 60 * 60;
        if(data.time1<=timenow && data.time2 >=timenow){
            sendNotice(socket,data.host,data.port,data);
            console.log("sendNoticeOnTime"+data);
           // socket.emit("sendMailonTimeRsp","定时邮件发送成功")
        }
    }, data.interval);
    socket.emit("NoticeQuryRsp",notice_list);
}
function NoticeQury(socket){
    //console.log("NoticeQury");
    socket.emit("NoticeQuryRsp",notice_list);
}
function GetActiveList(socket,host,port,zoneid){
    if(zoneid > config.PAY_LOG_DB_list.length){
        console.log("QueryPayLog zonid error");
        return;
    }
    var sql = "SELECT  *   from ActivityServerData ";
    console.log(sql);
    gamedb.querySql(config.PAY_LOG_DB_list[zoneid-1], sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            //console.log(result);
            socket.emit("GetActiveListRsp",result,host,port,zoneid );
        }
    });
}
function UpdateActivityStat(socket,data){
    //更新数据库
    if(data.zoneid > config.PAY_LOG_DB_list.length ||
       data.zoneid ==undefined ||
       data.zoneid ==null ||
       data.zoneid <1
        ){
        console.log("QueryPayLog zonid error");
        return;
    }
    var sql = "update  ActivityServerData set startTime="+data.startTime+", endTime="+data.endTime+", limitValue="+data.limitValue+", countFlag="+data.countFlag+" where activityId="+data.activityId;
    //console.log(sql);
    gamedb.querySql(config.PAY_LOG_DB_list[data.zoneid - 1], sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            console.log("更新活动成功:" + result);
            socket.emit("UpdateActivityStatRsp","更新活动数据库成功");
            //通知场景服
            Playeroptions.hostname = data.host;
            Playeroptions.port = data.port;
            Playeroptions.path = "/updateActivity?"
            var req = http.request(Playeroptions, function (res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                    socket.emit("UpdateActivityStatRsp", "通知游戏服成功")
                });
            });
            req.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });
            req.write(JSON.stringify(data));
            req.end();
        }
    });
}
function AddActivity(socket,data){
    //更新数据库
    if(data.zoneid > config.PAY_LOG_DB_list.length ||
       data.zoneid ==undefined ||
       data.zoneid ==null ||
       data.zoneid <1
        ){
        console.log("QueryPayLog zonid error");
        return;
    }
    var sql = "insert into ActivityServerData ([activityId],[startTime],[endTime],[limitValue],[countFlag]) VALUES("+data.activityId+","+data.startTime+","+data.endTime+", "+data.limitValue+", "+data.countFlag+")";
    //console.log(sql);
    //console.log("db:"+JSON.stringify( config.PAY_LOG_DB_list[data.zoneid - 1]));
    gamedb.querySql(config.PAY_LOG_DB_list[data.zoneid - 1], sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
            socket.emit("AddActivityRsp","添加活动失败,请检查ID是否重复");
        }
        else {
            //console.log("添加活动成功:" + result);
            socket.emit("AddActivityRsp","添加活动成功数据库成功");
            //通知场景服
            Playeroptions.hostname = data.host;
            Playeroptions.port = data.port;
            Playeroptions.path = "/updateActivity?"
            var req = http.request(Playeroptions, function (res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    //console.log('BODY: ' + chunk);
                    socket.emit("UpdateActivityStatRsp", "通知游戏服成功")
                });
            });
            req.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });
            req.write(JSON.stringify(data));
            req.end();
        }
    });
}

function WhiteListSwitch(socket,host,port,param){
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/WhiteListSwitch?"
    var req = http.request(Playeroptions, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            socket.emit("WhiteListSwitchRsp", JSON.parse(chunk))
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(JSON.stringify(param));
    req.end();
}
function WhiteListQuery(socket, host, port) {
    Playeroptions.hostname = host;
    Playeroptions.port = port;
    Playeroptions.path = "/WhiteListQuery?"
    var req = http.request(Playeroptions, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            socket.emit("WhiteListQueryRsp", JSON.parse(chunk))
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    var data = {};//这是需要提交的数据 
    req.write(JSON.stringify(data));
    req.end();
}
function ClientUpdateQuery(socket) {
    var sql = "SELECT * from updateflag where id=1";
    //console.log(sql);
    logdb.querySql(sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            //console.log(result);
            result.recordset.forEach(element => {
                var param={};
                param.flag = element.flag;
                socket.emit("ClientUpdateQueryRsp", param);
                return;
            });

        }
    });
}
function ClientUpdateSet(socket, param) {
    var sql = "update  updateflag set flag=" + param.flag;
    //console.log(sql);
    logdb.querySql(sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            socket.emit("ClientUpdateSetRsp", "修改成功");
        }
    });
}
function ClientVersionQuery(socket) {
    var sql = "SELECT * from updateflag where id=1";
    //console.log(sql);
    logdb.querySql(sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            //console.log(result);
            result.recordset.forEach(element => {
                var param={};
                param.version = element.version;
                socket.emit("ClientVersionQueryRsp", param);
                return;
            });

        }
    });
}
function ClientVersionSet(socket, param) {
    var sql = "update  updateflag set version=" +"'"+ param.version+"'";
    //console.log(sql);
    logdb.querySql(sql, "", function (err, result) {//查询所有users表的数据
        if (err) {
            console.log("db err");
        }
        else {
            socket.emit("ClientVersionSetRsp", "修改成功");
        }
    });
}
module.exports.GetBag = GetBag;
module.exports.online = online;
module.exports.sendMail = sendMail;
module.exports.BannedPlayer = BannedPlayer;
module.exports.KickPlayer = KickPlayer;
module.exports.searchPlayer = searchPlayer;
module.exports.queryPlayer = queryPlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.searchAccount = searchAccount;
module.exports.sendNotice = sendNotice;
module.exports.sendMailonTime = sendMailonTime;
module.exports.QueryLog = QueryLog;
module.exports.GetServerList = GetServerList;
module.exports.UpdateServerStat = UpdateServerStat;
module.exports.QueryPayLog = QueryPayLog;
module.exports.sendNoticeOnTime = sendNoticeOnTime;
module.exports.NoticeQury = NoticeQury;
module.exports.GetActiveList = GetActiveList;
module.exports.UpdateActivityStat = UpdateActivityStat;
module.exports.AddActivity = AddActivity;
module.exports.WhiteListSwitch = WhiteListSwitch;
module.exports.WhiteListQuery = WhiteListQuery;
module.exports.ClientUpdateQuery = ClientUpdateQuery;
module.exports.ClientUpdateSet = ClientUpdateSet;
module.exports.ClientVersionQuery = ClientVersionQuery;
module.exports.ClientVersionSet = ClientVersionSet;
