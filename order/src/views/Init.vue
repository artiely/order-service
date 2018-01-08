<template>
  <div id="init">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
export default {
  name: 'init',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    type() {
      return this.$store.state.user.userInfo.type
    }
  },
  methods: {},
  created() {
    socket.on('recvmsg', (data) => {
      this.$store.dispatch('recvMsg', data)
    })
    this.$api.ORDER_LIST().then(res => {
      if (res.code === 0) {
        this.$store.dispatch('recvOrder', res.data)
      }
    })
    socket.on('recvorder', (data) => {
      console.log('接受到了下单消息')
      this.$store.dispatch('recvOrder', data)
    })
    this.$store.dispatch('getMsgList')
    this.$store.dispatch('getUserInfo')
  },
  activated() {
  }
}
</script>
