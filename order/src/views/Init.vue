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
    },
    methods: {},
    created() {
      socket.on('recvmsg', (data) => {
        this.$store.dispatch('recvMsg', data)
      })
    },
    activated() {
    }
  }
</script>
