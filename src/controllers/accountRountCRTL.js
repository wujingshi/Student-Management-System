'use strict';

const path = require('path');
const captchapng = require('captchapng');

// 跳转登录页面
exports.getLoinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login.html'));
}

// 图片验证码逻辑
exports.getVcodeImage = (req, res) => {
    const vodeNumber = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, vodeNumber); // width,height,numeric captcha 
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}