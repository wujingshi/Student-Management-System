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
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 180000
    }
}));
// post的依赖
app.use(bodyParser.urlencoded({
    extended: false
}))

// 权限设置
app.all('/*', (req, res, next) => {
    if (req.url.includes('account')) {
        next();
    } else {
        if (req.session.username) {
            next();
        } else {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            res.end("<script>alert('您还没有登录，请先登录');location.href='/account/login'</script>")
        }
    }
})

// 请求、相应
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'));
app.use('/account', accountRouter);

const studentManagerRouter = require(path.join(__dirname, 'routers/studentManagerRouter.js'));
app.use('/studentmanager', studentManagerRouter);

// 启动端口号
app.listen(3000, '127.0.0.1', (err) => {
    if (err) {
        console.log(err);
    }
    console.log("启动成功!");
})