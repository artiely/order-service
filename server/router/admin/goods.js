const express = require('express')
const Router = express.Router()
const model = require('../../model')
const Goods = model.getModel('goods')
const Order = model.getModel('order')
const utils = require('../../utils')

// 创建商品
Router.post('/create',function(req, res,next){
  const {name, desc, fileList:img, type,region} = req.body
  const goods = new Goods({name, desc,img, type,region,create_time:new Date().getTime()})
  goods.save(function(err,doc){
    console.log('入库的消息',doc)
    if(err){
      return res.json({code:500,msg:err})
    }
    return res.json({code:0,msg:'保存成功'})
  })
})

Router.get('/list/:page/:limit',function(req, res,next){
  var page = req.params.page || 1
  var limit = Number(req.params.limit) || 3
  var count = 0
  Goods.count({},function(err,doc){
    if(err){
      console.log(err)
    }
    count = doc
  })
  Goods.find({}).skip((page - 1) * limit)
  .limit(limit)
  .sort({'_id': -1})
  .exec(function(err,doc){
    if(!err){
      return res.json({
        code:0,
        data:doc,
        count:count
      })
    }
    console.log(err)
  })
})

module.exports = Router

