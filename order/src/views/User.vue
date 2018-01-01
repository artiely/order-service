<template>
  <div id="user">
    {{state}}
  <van-panel :title="state.username" desc="描述信息" status="状态">
  <div>内容</div>
</van-panel>
    <van-button size="large" type="danger" @click="logout">注销</van-button>
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
        this.$router.replace('/login')
      }
    }
  }
</script>