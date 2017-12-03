const express = require('express')
const Router = express.Router()
const model = require('../model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('../utils')
const md5Pwd = utils.md5
/**
 * 查询过滤条件
 */
const _filter = {'password':0,'__v':0}

/**
 * 获取用户的列表
 */
Router.get('/list',function(req, res){
  const { type } = req.query
  User.find({type},function(err,doc){
    return res.json({code:0,data:doc})
  })
})

/**
 * 用户登录
 * 1.查询用户是否存在 不存在返回错误提示
 * 2.存在 设置cookie
 * @param {String}username
 * @param {String}password
 */
Router.post('/login', function(req,res){
  const {username, password} = req.body
  User.findOne({username,password:md5Pwd(password)},_filter,function(err,doc){
    if (!doc) {
      return res.json({code:1,msg:'用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code:0,data:doc})
  })
})
/**
 * 用户注册
 * 1.获取提交的信息
 * 2.通过用户名查找是否存在
 * 3.存在返回错误提示
 * 4.不存在 给密码加密
 * 5.保存到用户数据模型
 * @param {String}username
 * @param {String}password
 * @param {String}code
 * @param {String}avatar
 */
Router.post('/register', function(req, res){
  const {username, password, type} = req.body
  User.findOne({username},function(err,doc){
    if (doc) {
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({username,password:md5Pwd(password),type,avatar:utils.getRandomColor()})
    userModel.save(function(e,d){ // 这里之所以用save 而不用 create是因为save之后我们才可以拿到id
      if (e) {
        return res.json({code:1,msg:'保存用户出错了'})
      }
      console.log('入库的用户信息',d)
      const {username, type, _id} = d
      res.cookie('userid', d._id)
      return res.json({code:0,data:{username, type, _id}})
    })
  })
})
Router.get('/info',function(req, res){
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code:1,data:[],msg:'请登录'})
  }else{
    User.findOne({_id:userid} ,_filter , function(err,doc){
      if (err) {
        return res.json({code:1, msg:'后端出错了'})
      }else{
        return res.json({code:0,data:doc})
      }
    })
  }
})

/* function md5Pwd(password){
  // const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
  // return utils.md5(utils.md5(pwd+salt))
  return utils.md5(utils.md5(utils.md5(utils.md5(password))))
}
 */

 /**
  * 获取消息列表
  * 获取用户信息
  */
Router.get('/msglist',function(req,res){
  const userid = req.cookies.userid
  console.log(req.cookies)
  User.find({},_filter,function(e,d){
    if(!e){
      Chat.find({},function(err,doc){
        if(!err){
          res.json({code:0,data:doc,users:d})
        }else{
          res.json({code:1,msg:'获取消息失败'})
        }
      })
    }else{
      res.json({code:1,msg:'获取用户信息失败'})
    }
  })
 
})

Router.post('/msg',function(req,res){
  const userid=req.cookies.userid
  // Chat.create()
})
module.exports = Router