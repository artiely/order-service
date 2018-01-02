<template>
  <div id="msg">
    <e-item @click.native="toChat(v)" :data="v" v-for="(v,k) in msgListByUser" :key="k"></e-item>
  </div>
</template>

<script>
  import EItem from '@/components/engineer-item/Eitem.vue'
  export default {
    name: 'msg',
    components: {
      EItem
    },
    data() {
      return {}
    },
    computed: {
      msgListByUser() {
        return this.$store.getters.msgListByUser
      }
    },
    methods: {
      toChat(item) {
        this.$store.dispatch('targetUser', item)
        this.$router.push({
          path: `/chat/${item._user._id}`
        })
      }
    },
    created() {
    }
  }
</script>
