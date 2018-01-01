<template>
  <div id="msg">
    <e-item @click.native="toChat(v)" :data="v" v-for="(v,k) in unreadByChatUser" :key="k"></e-item>
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
      return {}
    },
    computed: {
      unreadByChatUser() {
        return this.$store.getters.unreadByChatUser
      }
    },
    methods: {
      toChat(item) {
        this.$router.push({
          name: 'Chat',
          params: {
            item: item
          }
        })
        this.$store.dispatch('targetUser', item)
      }
    },
    created() {
    }
  }
</script>
