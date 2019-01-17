//GM管理工具，账号数据库
var GM_Account_DB = {
    user: 'sa',
    password: '123456',
    server: '192.168.31.118',
    database: 'nodetest',
    port: 1029,
    options: {
    encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};
//游戏服务器数据库
var GM_SERVER_DB = {
    user: 'sa',
    password: '123456',
    server: '192.168.31.118',
    database: 'snkRegion',
    port: 1028,
    options: {
    encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

//log日志数据库
var GM_LOGSERVER_DB = {
    port : 6379,
    server: '120.76.235.228',
    password:'lhf123456'
};
//GM服务器监听端口
var GM_SERVER_PORT = {
    app_port : 8082,            //浏览器端口
    socket_io_port : 8081,      //浏览器跟后端node.js 使用socket.io通信端口
};
module.exports.GM_Account_DB = GM_Account_DB;
module.exports.GM_SERVER_DB = GM_SERVER_DB;
module.exports.GM_LOGSERVER_DB = GM_LOGSERVER_DB;
module.exports.GM_SERVER_PORT = GM_SERVER_PORT;

