<template>
  <div id="user">
  <van-panel :title="state.username" :desc="state.telphone+''" :status="state.type == '1'?'客户':'工程师'">
</van-panel>
    <van-button  :bottom-action="true" :block="true" type="danger" @click="logout">注销</van-button>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'user',
    components: {},
    data() {
      return {}
    },
    computed: {
      state() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      logout() {
        Cookies.remove('_userId')
        this.$router.replace('/loginregister')
      }
    }
  }
</script>