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
    telphone: {
      type: Number,
      required: true,
      default: 00000000000
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
    title: { // 职位名
      type: String
    },
    type: { // 类型 1 客户 2 工程师
      type: String,
      default: '1'
    }
  },
  chat: { // 消息入库模型
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      default: ''
    },
    create_time: {
      type: Number,
      default: new Date().getTime()
    },
    chatid: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  goods: { // 消息入库模型
    img: { // 商品图片 可能多张
      type: Array,
      required: true
    },
    name: { // 商品名称
      type: String,
      required: true
    },
    desc: { // 商品描述
      type: String,
      required: true,
      default: ''
    },
    region: { // 配送区域
      type: String,
      required: true
    },
    create_time: { // 商品入库时间 （这里是商品先入库,然后特定时间批量上架）
      type: Number,
      default: new Date().getTime()
    },
    add_time: { // 商品上架时间
      type: Number,
      default: 0
    },
    subtract_time: { // 商品下架时间
      type: Number,
      default: 0
    },
    type: { // 商品类型 id
      type: String,
      default: 0
    },
    sale: { // 商品状态 0 下架 1 销售中
      type: Boolean,
      default: false
    },
    count: { // 库存数量
      type: Number,
      default: 100
    },
    saleCount: { // 销量
      type: Number,
      default: 10
    },
    price: { // 商品价格
      type: Number,
      default: 100
    }
  },
  // category: {
  //   name: String,
  //   icon: String,
  //   children: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'category'
  //   }]
  // },
  order: {
    userinfo: {
      type: Object,
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    serviceType: { // 服务类型
      type: String,
      required: true
    },
    instancy: { // 紧急程度
      type: String,
      required: true
    },
    status: { //  状态 0 下单 1接单 2已处理 3确定处理 4待评价 5完成
      type: Number,
      required: true,
      default: 0
    },
    times: {
      type: Array,
      required: true,
      default: [new Date().getTime()]
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