console.log(23);

var express = require('express');
var app = express();
var exStatic = require('express-static');
app.use(exStatic('./caijiNeiRong')); //这一句中的'./'是静态页面的相对路径。
app.listen(3303);

console.log('启动了 3303');
