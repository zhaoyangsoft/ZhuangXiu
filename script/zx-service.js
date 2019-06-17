//1, npm i express -S
//2, npm i body-parser -S
var express = require('express');
// var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const querystring = require("querystring");

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '127.0.0.1', //数据库地址
  user: 'root', //账号
  password: 'XXX', //密码
  database: 'mysql', //库名
  multipleStatements: true, //允许执行多条语句
  timezone: '08:00', //数据库处理时间
});
//开始链接数据库
conn.connect(function(err) {
  if (err) {
    console.log(`mysql连接失败: ${err},正在重新连接!`);
    // setTimeout(function(){autoConnect(connect);},2000); //2s重新连接
  } else {
    console.log('mysql连接成功!');
  }
});

//全部列表查询
app.get('/api/user', function(req, res) {
  let sqlQuery = 'select * from zx_users';
  conn.query(sqlQuery, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '暂无数据', affextedRows: 0 });
    res.json({ err_code: 200, message: results, affextedRows: results.affextedRows });
  });
});

//新订单插入数据
app.get('/api/user/add', (req, res) => {
  // const ordernum=req.body.ordernum
  const name = req.query.name + '@' + new Date().toLocaleString();
  const phone = req.query.phone;
  const desc = req.query.desc;
  //   INSERT INTO `zx_users` VALUES ( '姚明','123', '25');
  const sqlStr = 'insert into zx_users set ?';
  conn.query(
    sqlStr,
    {
      name: name,
      phone: phone,
      desc: desc,
    },
    (err, results) => {
      if (err) return res.json({ err_code: 1, message: err, affectedRows: 0 });
      res.json({ err_code: 0, message: '添加成功', affectedRows: results.affectedRows });
    },
  );
});

//配置服务端口

var server = app.listen(3002, function() {
  var host = server.address().address;

  var port = server.address().port;

  console.log('Example app listening at http://localhost:3002', host, port);
});
