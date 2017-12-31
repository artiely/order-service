<template>
  <div id="chat">
    <van-nav-bar :title="targetUser.username" leftText="返回" @click.native="back" leftArrow fixed style="z-index:99">
    </van-nav-bar>
    <div v-for="(item,index) in msgList" :key="index">
      <table class="chat-me" v-if="item.from==state._id">
        <tr>
          <td>
            <div class="pop-box"><span class="pop">{{item.content}}</span></div>
          </td>
          <td class="usericon"><span class="avatar" :style="{background:state.avatar}"></span></td>
        </tr>
      </table>
      <table class="chat-other" v-else>
        <tr>
          <td class="usericon"><span class="avatar" :style="{background:targetUser.avatar?targetUser.avatar:'#eee'}"></span></td>
          <td>
            <div class="pop-box-other"><span class="pop">{{item.content}}</span></div>
          </td>
        </tr>
      </table>
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
        username: '',
        toid: '',
        usericon: '',
        user: {}
      }
    },
    computed: {
      state() {
        return this.$store.state.user.userInfo
      },
      msgList() {
        const allMsgList = this.$store.state.user.msgList
        return allMsgList.filter(v => {
          if (v.chatid === [this.toid, this.state._id].sort().join('-')) {
            return v
          }
        })
      },
      targetUser() {
        return this.$store.state.user.targetUser
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      sendMsg() {
        let data = {
          from: this.state._id, // 消息从哪来（我是发消息的人）
          to: this.$route.params.id, // 消息到哪去
          content: this.value // 发送的内容
        }
        console.log('我发送的消息', data)
        console.log('msglis', this.msgList)
        socket.emit('sendmsg', data)
        this.value = ''
      }
    },
    created() {
      // socket.on('recvmsg', (data) => {
      //   console.log(data)
      //   this.msgList = [...this.msgList, data]
      // })
      // this.$api.GET_MSGLIST().then(res => {
      //   if (res.code === 0) {
      //     this.msgList = res.data
      //     console.log('this is msglis', res)
      //   }
      // })
      // this.$store.dispatch('recvMsg')
      // socket.on('recvmsg', (data) => {
      //   console.log(data)
      //   this.$store.dispatch('recvMsg', data)
      // })
    },
    mounted() {
    },
    activated() {
      window.scrollTo(0, document.body.scrollHeight)
      this.username = this.$route.params.username
      this.toid = this.$route.params.id
    }
  }
</script>
<style lang="less" scoped>
  #chat {
    padding-bottom: 50px;
    padding-top: 46px;
  }
  .chat-me,
  .chat-other {
    width: 100%;
    text-align: right;
    font-size: 14px;
    color: #333;
    position: relative;
    .usericon {
      vertical-align: top;
      width: 35px
    }
    .pop-box {
      display: flex;
      float: right;
    }
    .pop-box-other {
      display: flex;
      float: left;
    }
    .pop {
      background: rgba(6, 191, 4, 0.4);
      border-radius: 4px;
      padding: 8px 12px;
      display: block;
      height: 100%;
      text-align: left;
    }
    .avatar {
      vertical-align: top;
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 50%
    }
  }
  .chat-other {
    text-align: left;
    .pop {
      background: #eee;
    }
  }
</style>

