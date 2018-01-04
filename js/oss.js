var db = require('./gamedb.js');
function queryuser(socket,user)
{
    var sql = "SELECT * from actor where [NickName]='"+user + "'";
    db.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
        }
        else{
            console.log(result);
            socket.emit("queryuserrsp",result) 
        }
    });
}
module.exports.queryuser = queryuser;