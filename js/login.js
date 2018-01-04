var db = require('./db.js');
function login(socket,user,password)
{
    debugger;
    var sql = "SELECT * from users where [user]='"+user + "'";
    db.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
            socket.emit("loginRsp",-1);
        }
        else{
            if(result.recordset.length == 1)
            {
                if(result.recordset[0].passwd == password)
                {
                    console.log("login ok");
                    socket.emit("loginRsp",0)
                    return 0;
                }
            }
            console.log("login failed");
            socket.emit("loginRsp",-1);
        }
    });
}
module.exports = login;