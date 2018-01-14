<template>
  <div id="msg">
    <van-nav-bar title="消息列表"  fixed style="z-index:99">
    </van-nav-bar>
    <div class="my-content">
        <e-item @click.native="toChat(v)" :data="v" v-for="(v,k) in msgListByUser" :key="k"></e-item>
    </div>
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
