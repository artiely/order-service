const express = require('express')
const Router = express.Router()
const model = require('../../model')
const Order = model.getModel('order')
const User = model.getModel('user')
const utils = require('../../utils')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

Router.get('/list/:page/:limit', function (req, res, next) {
  // 用户按照用户的id查自己的列表
  // 工程师查看所有的列表
  var page = req.params.page || 1
  var limit = Number(req.params.limit) || 3
  var count = 0
  Order.count({},function(err,doc){
    if(err){
      console.log(err)
    }
    count = doc
  })
  const {userid} = req.cookies
  if (!userid) {
    return res.json({
      code: 1,
      data: [],
      msg: '请登录'
    })
  }
  User.findOne({_id:userid}).exec(function(error,document){
    if(error){
      console.log(error)
    }
    if (document.type == 1){
      const __id = document._id
      Order.find({'userinfo._id' : __id.toString()}) // id要转字符串的小细节坑了我很久
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({'_id': -1})
      .exec(function (err, doc) {
        if (!err) {
          return res.json({
            code: 0,
            data: doc,
            count:count
          })
        }
        console.log(err)
      })
    }else{
      Order.find()
      .sort({'_id': -1})
      .exec(function (err, doc) {
        if (!err) {
          return res.json({
            code: 0,
            data: doc
          })
        }
        console.log(err)
      })
    }
  })
  
 
})

module.exports = Router