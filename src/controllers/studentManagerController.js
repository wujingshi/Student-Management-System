'use strict';

const xtpl = require('xtpl');
const path = require('path');
// 引入数据库控制器
const databasemanager = require(path.join(__dirname, '../tools/databasemanager.js'));

// 获取学生列表
exports.getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || '';
    databasemanager.findList('student_info', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, '../view/list.html'), {
            students: docs,
            keyword: keyword,
            loginedName: req.session.username
        }, (err, content) => {
            res.send(content);
        })
    })
}

// 新增学生页面
exports.getAddStudentPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../view/add.html"), {
        loginedName: req.session.username
    }, (err, content) => {
        res.send(content);
    })
}

//保存学生信息
exports.addStudent = (req, res) => {
    //调用databasemanager方法，把我们传递过来的数据，插入到数据库中
    databasemanager.insertOne('student_info', req.body, (err, result) => {
        if (result == null) { //插入失败
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("<script>alert('插入失败');</script>")
        } else { //插入成功
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
        }
    })
}

//获取学生信息页面
exports.getEditStudentPage = (req, res) => {
    //query  ?key=value
    //params xxx/xxx/value
    const studentId = databasemanager.ObjectId(req.params.studentId)
    //1、根据_id查询学生信息
    databasemanager.findOne('student_info', {
        _id: studentId
    }, (err, doc) => {
        //2、拿着查询到的学生信息，返回给浏览器去呈现
        xtpl.renderFile(path.join(__dirname, "../view/edit.html"), {
            student: doc,
            loginedName: req.session.username
        }, (err, content) => {
            res.send(content)
        })
    })
}

//修改学生信息
exports.editStudent = (req, res) => {
    //获取学生id
    const studentId = databasemanager.ObjectId(req.params.studentId)

    //调用修改一个文档的方法
    databasemanager.updateOne('student_info', {
        _id: studentId
    }, req.body, (err, result) => {
        if (result == null) { //修改失败
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("<script>alert('修改失败');</script>")
        } else { //修改成功
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
        }
    })
}

//删除学生信息
exports.deleteStudent = (req, res) => {
    //获取学生id
    const studentId = databasemanager.ObjectId(req.params.studentId)

    //调用删除一个的文档的方法
    databasemanager.deleteOne('student_info', {
        _id: studentId
    }, (err, result) => {
        if (result == null) { //删除失败
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("<script>alert('删除失败');</script>")
        } else { //删除成功
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
        }
    })
}