const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./router/client/user')
const goodsRouter = require('./router/admin/goods')
const orderRouter = require('./router/admin/order')
const app = express()
const server = require('http').Server(app)
const model = require('./model')
const Chat = model.getModel('chat')
const Order = model.getModel('order')
const User = model.getModel('user')
const upload = require('./router/admin/upload')

const io = require('socket.io')(server)
io.on('connection', function (socket) {
  console.log('socket 已连接')
  socket.on('sendmsg', function (data) {
    console.log(data)
    // 收到客户端发来的消息 处理
    const {
      from,
      to,
      content
    } = data
    const chatid = [from, to].sort().join('-')
    Chat.create({
      from,
      to,
      content,
      chatid,
      create_time: new Date().getTime()
    }, function (err, doc) {
      // 入库之后全局广播
      io.emit('recvmsg', doc)
      console.log('入库的消息', doc)
    })
  })

  socket.on('readmsg', function (data) {
    const {
      from,
      userid
    } = data
    Chat.update({
      from: from,
      to: userid
    }, {
      '$set': {
        read: true
      }
    }, {
      'multi': true
    }, function (err, doc) {
      // 入库之后全局广播
      io.emit('recvmsg', doc)
      console.log('读取的消息', doc)
    })
  })
    // 下单
  socket.on('sendorder', function (data) {
    const {
      userinfo,
      desc,
      serviceType,
      instancy
    } = data
    const times = [new Date().getTime()]
    const order = new Order({
      userinfo,
      desc,
      serviceType,
      instancy,
      times
    })
    order.save(function (err, doc) {
      // 入库之后全局广播 (io后面不能有return不然会断开连接)
      io.emit('recvorder', doc)
    })
  })
  // 接单
  socket.on('acceptorder',function(data){
    Order.findByIdAndUpdate(data,{$set:{status:1},$push:{times:new Date().getTime()}},{new:true},function(err,doc){
      if(!err){
        console.log('接单了',doc)
        io.emit('recvorder', doc)
      }
      console.log(err)
    })
  })

})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api/order', orderRouter)
app.use('/api/goods', goodsRouter)
app.use('/api/user', userRouter)
app.get('/api/upload', upload.upload)
server.listen(9093, function () {
  console.log('Node app start at port 9093')
})