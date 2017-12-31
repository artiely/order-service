<template>
  <div id="msg">
    <e-item @click.native="toChat(v)" :data="v" v-for="(v,k) in userList" :key="k"></e-item>
    <pre>{{unreadByChatUser}}</pre>
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
        userList: []
      }
    },
    computed: {
      state() {
        return this.$store.state.user.userInfo
      },
      unreadMsgList() {
        return this.$store.getters.unreadMsgList
      },
      unreadByChatUser() {
        return this.$store.getters.unreadByChatUser
      }

    },
    methods: {
      toChat(item) {
        this.$router.push({
          name: 'Chat',
          params: {
            id: item._id,
            username: item.username,
            item: item
          }
        })
        this.$store.dispatch('targetUser', item)
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
