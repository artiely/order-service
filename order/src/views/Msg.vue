<template>
  <div id="msg">
    <!-- <e-item :data="chatData" @click.native="toChat"></e-item> -->
    <div @click="toChat(item)" v-for="(item,index) in userList" :key="index">{{item.username}}{{item._id}}</div>
  </div>
</template>

<script>
  import EItem from '@/components/engineer-item/Eitem.vue'
  // import io from 'socket.io-client'
  export default {
    name: 'msg',
    components: {
      EItem
    },
    data() {
      return {
        chatData: {
          lastChatTime: '12:59',
          userName: '谭杰',
          lastChatText: '可以，我们马上给您解决！',
          userIcon: 'https://avatars1.githubusercontent.com/u/19198355?s=400&u=aa18d8f6d07dbd4f8f4dd966f3fbb2b3a1b3ee00&v=4',
          chatNum: '30'
        },
        userList: []
      }
    },
    computed: {
      state() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      toChat(item) {
        this.$router.push(`/chat/${item._id}`)
      }
    },
    created() {
      // const socket = io('ws://localhost:9093')
      // 获取用户列表
      let data = {
        type: this.state.type === '1' ? '2' : '1'
      }
      console.log('this is state', this.state)
      this.$api.GET_USER_LIST(data).then(res => {
        if (res.code === 0) {
          this.userList = res.data
        }
      })
    }
  }
</script>
