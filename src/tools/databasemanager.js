'use strict';

var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient

var ObjectId = mongodb.ObjectId
exports.ObjectId = ObjectId

var url = 'mongodb://localhost:27017/szhmqd10';

function getDB(callback) {
    MongoClient.connect(url, function (err, db) {
        //把连接数据库返回的err和db通过回调函数传递出去
        callback(err, db)
    })
}

/**
 * 暴露出去的查找一个的方法
 * 
 * 参数1：集合名称
 * 参数2：查询条件
 * 参数3：回调(把查询到的结果返回给控制器去用)
 */
exports.findOne = (collectionName, condition, callback) => {
    getDB((err, db) => {
        //获取集合
        const collection = db.collection(collectionName)

        //查询一个
        collection.findOne(condition, (err, doc) => {
            callback(err, doc)

            db.close()
        })
    })
}

/**
 * 暴露出去的是一个查询列表的方法
 * 
 * 参数1：集合名称
 * 参数2：查询条件
 * 参数3：回调(把查询到的结果返回给控制器去用)
 */
exports.findList = (collectionName, condition, callback) => {
    //操作数据库，去查询
    getDB((err, db) => {
        //获取集合
        const collection = db.collection(collectionName)

        //查询方法
        collection.find(condition).toArray(function (err, docs) {
            //将结果通过回调函数传递给控制器
            callback(err, docs)

            db.close()
        })
    })
}

/**
 * 插入一个文档
 * 参数1：集合名称
 * 参数2：插入的条件
 * 参数3：回调(把查询到的结果返回给控制器去用)
 */
exports.insertOne = (collectionName, condition, callback) => {
    getDB((err, db) => {
        //获取集合
        const collection = db.collection(collectionName)

        //插入一条文档
        collection.insertOne(condition, (err, result) => {
            callback(err, result)

            db.close()
        })
    })
}

/**
 * 修改一个文档
 * 参数1：集合
 * 参数2：修改的条件
 * 参数3：修改成什么样的值
 * 参数4：回调，为了把结果传给控制器
 */
exports.updateOne = (collectionName, condition, changedValue, callback) => {
    getDB((err, db) => {
        //获取集合
        const collection = db.collection(collectionName)

        collection.updateOne(condition, {
            $set: changedValue
        }, (err, result) => {
            callback(err, result)

            db.close()
        })
    })
}

/**
 * 删除一个文档的方法
 * 参数1：集合名称
 * 参数2：删除的条件
 * 参数3：回调(把查询到的结果返回给控制器去用)
 */
exports.deleteOne = (collectionName, condition, callback) => {
    getDB((err, db) => {
        //获取集合
        const collection = db.collection(collectionName)

        collection.deleteOne(condition, (err, result) => {
            callback(err, result)

            db.close()
        })
    })
}