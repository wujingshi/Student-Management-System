'use strict';

// 导包
const express = require('express');
const path = require('path');

// 创建入口
const app = express();



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