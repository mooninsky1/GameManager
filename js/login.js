var db = require('./db.js');
const jwt = require('jsonwebtoken')
function login(socket,user,password)
{
    console.log(user+password);
    var sql = "SELECT * from users where [user]='"+user + "'";
    db.querySql(sql, "",function (err, result) {//查询所有users表的数据
        if(err)
        {
            console.log("db err");
            socket.emit("loginRsp",{code:-1,token:""});
        }
        else{
            if(result.recordset.length == 1)
            {
                if(result.recordset[0].passwd == password)
                {
                    console.log("login ok");
                    const mytoken = jwt.sign({
                        name: user,
                        _id: password
                    }, 'my_token', { expiresIn: '2h' });
                    socket.emit("loginRsp",{code:0,token:mytoken})
                    return 0;
                }
            }
            console.log("login failed");
            socket.emit("loginRsp",{code:-1,token:"aaa"});
        }
    });
}
module.exports = login;