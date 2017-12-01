<template>
  <div id="chat">
    <div v-for="(item,index) in msgList" :key="index">
      {{item}}
      <p class="chat-me" v-if="item.from==state._id"><span class="pop">{{item.content}}</span><span class="avatar" :style="{background:state.avatar}"></span></p>
      <p class="chat-other" v-else><span class="avatar" :style="{background:state.avatar}"></span><span class="pop">{{item.content}}</span></p>
    </div>
    <ChatInput v-model="value" @click-send="sendMsg"></ChatInput>
  </div>
</template>

<script>
  import ChatInput from '@/components/field/ChatInput.vue'
  import io from 'socket.io-client'
  const socket = io('ws://localhost:9093')
  export default {
    name: 'chat',
    components: {
      ChatInput
    },
    data() {
      return {
        value: '',
        msgList: []
      }
    },
    computed: {
      state() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      sendMsg() {
        let data = {
          from: this.state._id, // 消息从哪来（我是发消息的人）
          to: this.$route.params.id, // 消息到哪去 
          content: this.value, // 发送的内容
        }
        console.log('我发送的消息', data)
        socket.emit('sendmsg', data)
        this.value = ''
      }
    },
    created() {
      socket.on('recvmsg', (data) => {
        console.log(data)
        this.msgList = [...this.msgList, data]
      })
      this.$api.GET_MSGLIST().then(res => {
        if (res.code === 0) {
          this.msgList = res.data
          console.log('this is msglis', res)
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .chat-me,
  .chat-other {
    text-align: right;
    font-size: 14px;
    color: #333;
    position: relative;
    .pop {
      background: rgba(6, 191, 4, 0.4);
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      padding: 8px;
      display: inline
    }
    .avatar {
      width: 30px;
      height: 30px;
      display: inline-block;
      position: relative;
      top: 10px
    }
  }
  .chat-other {
    text-align: left;
    .pop {
      background: #eee;
    }
  }
</style>

