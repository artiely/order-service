<template>
  <div id="init">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { _ip } from '../api/config'
const socket = io(_ip)
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
    this.$store.dispatch('getUserInfo').then(() => {
      socket.on('recvmsg', (data) => {
        this.$store.dispatch('recvMsg', data)
      })
      socket.on('recvorder', (data) => {
        console.log('接受到了下单消息')
        this.$store.dispatch('recvOrder', data)
      })
      this.$store.dispatch('getMsgList')
      this.$store.dispatch('getOrderList')
    })
  },
  mounted() {
  },
  activated() {
  }
}
</script>
