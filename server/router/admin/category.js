const express = require('express')
const Router = express.Router()
const model = require('../../model')
const Category = model.getModel('category')
const Order = model.getModel('order')
const utils = require('../../utils')

// 创建分类
Router.post('/create',function(req, res,next){
  const {name,level,id} = req.body
  if(level===1){
    const category = new Category({name})
    category.save(function(err,doc){
      console.log('入库的消息',doc)
      if(err){
        return res.json({code:500,msg:err})
      }
      return res.json({code:0,msg:'保存成功'})
    })
  }else{
    Category.update({_id:id},{$push:{children:{name:name}}}).exec(function(err,doc){
      if(err){
        return res.json({code:500,msg:err})
      }
      return res.json({code:0,msg:'保存成功'})
    })
  }
})

Router.get('/list',function(req, res,next){
 
  Category.find({})
  .exec(function(err,doc){
    if(!err){
      return res.json({
        code:0,
        data:doc
      })
    }
    console.log(err)
  })
})

module.exports = Router

