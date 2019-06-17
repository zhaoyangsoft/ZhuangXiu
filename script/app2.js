var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

//同步读取密钥和签名证书
var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
};

var app = express();
var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app);

var exStatic = require('express-static');
app.use(exStatic('./ZhuangXiu')); //这一句中的'./'是静态页面的相对路径。

// app.get('/', function(req, res, next) {
//   res.send('Hello Express+https');
// });

//https监听3302端口
httpsServer.listen(3302);
//http监听3301端口
httpServer.listen(3301);
