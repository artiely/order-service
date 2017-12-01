const mongoose = require('mongoose')
// 链接mongo 并且使用order这个集合
// 我本地启动mongo bin下 mongod --dbpath d:/MongoDB/data
const DB_URL = 'mongodb://localhost/order-chat'
mongoose.connect(DB_URL, {
  useMongoClient: true,
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('数据库已经连接')
});
const models = {
  user: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: { //头像
      type: String
    },
    desc: { // 个人简介或者职位简介
      type: String
    },
    title: {// 职位名
      type: String
    },
    type:{ // 类型 1 客户 2 工程师
      type:String,
      default:'1'
    }
  },
  chat: { // 消息入库模型
    from:{
      type:String,
      required:true
    },
    to:{
      type:String,
      required:true
    },
    content:{
      type:String,
      required:true,
      default:''
    },
    create_time:{
      type:Number,
      default:new Date().getTime()
    },
    chatid:{
      type:String,
      required:true,
    },
    read:{
      type:Boolean,
      default:false
    }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}