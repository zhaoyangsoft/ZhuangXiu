var express = require('express');
var app = express();
var exStatic = require('express-static');
app.use(exStatic('./zx-002')); //这一句中的'./'是静态页面的相对路径。
app.listen(3302);

console.log('启动了 3302');
