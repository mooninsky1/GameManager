
var url = require('url');
var usrname='lhf';

var sql='SELECT * from users where [user]='+usrname
var sql1="SELECT * from users where [user]='"+usrname + "'";
var sql2= 'select * from mytable where id = ${usrname}'
var data = { recordsets: [ [ [Object] ] ],
  recordset: [ { user: 'lhf', passwd: '123456' } ],
  output: {},
  rowsAffected: [ 1 ],
  returnValue: 0 };
console.log(data.recordset.length);
const myURL =
  url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
  console.log(myURL);
