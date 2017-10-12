'use strict';

const path = require('path');

// 跳转登录页面
exports.getLoinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login.html'));
}