const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./router/user')
const app = express()
const server = require('http').Server(app)
const model = require('./model')
const Chat = model.getModel('chat')

const io = require('socket.io')(server)
io.on('connection',function(socket){
  console.log('socket 已连接')
  socket.on('sendmsg',function(data){
    console.log(data)
    // 收到客户端发来的消息 处理
    const  {from, to, content} = data
    const chatid=[from,to].sort().join('-')
    Chat.create( {from,to,content,chatid,create_time:new Date().getTime()},function(err,doc){
      // 入库之后全局广播
      io.emit('recvmsg',doc)
      console.log('入库的消息',doc)
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api/user',userRouter)
server.listen(9093,function(){
  console.log('Node app start at port 9093')
})