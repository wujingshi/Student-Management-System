'use strict';

// 导包
const express = require('express');
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

// 创建入口
const app = express();

// 静态文件设置
app.use(express.static('./statics'));

// 登录验证---保存信息
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}));
// post的依赖
app.use(bodyParser.urlencoded({
    extended: false
}))

// 请求、相应
const accountRouter = require(path.join(__dirname, './routers/accountRouter'));

app.use('/account', accountRouter);

// 启动端口号
app.listen(3000, '127.0.0.1', (err) => {
    if (err) {
        console.log(err);
    }
    console.log("启动成功!");
})