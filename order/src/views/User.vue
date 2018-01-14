<template>
  <div id="user">
    <van-nav-bar title="个人中心" fixed>
    </van-nav-bar>
    <div class="my-content">
      <van-panel :title="state.username" :desc="state.telphone+''" :status="state.type == '1'?'客户':'工程师'">
</van-panel>
    <van-button  :bottom-action="true" :block="true" type="danger" @click="logout">注销</van-button>
    </div>
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