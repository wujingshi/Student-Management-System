'use strict';

const path = require('path');
const captchapng = require('captchapng');
var MongoClient = require('mongodb').MongoClient;
// 跳转登录页面
exports.getLoinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login.html'));
}

// 图片验证码逻辑
exports.getVcodeImage = (req, res) => {
    const vodeNumber = parseInt(Math.random() * 9000 + 1000);
    req.session.vcode = vodeNumber;
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
// 登录验证
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功!'
    };
    // 获取参数
    const params = req.body;
    console.log(req.session.vcode);
    // 校验验证码
    if (req.session.vcode != params.vcode) {
        result.status = 1;
        result.message = "验证码错误";
        res.json(result);
        return;
    }
    var url = 'mongodb://localhost:27017/stu';
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('account');
        collection.findOne({
            username: params.username,
            password: params.password
        }, (err, doc) => {
            if (doc == null) {
                result.status = 1;
                result.message = "用户名或密码错误"
            };
            res.json(result);
        });
        db.close();
    });
}