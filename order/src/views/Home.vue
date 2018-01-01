<template>
  <div id="home">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" :info="unReadNum" to="/msg">消息</van-tabbar-item>
      <van-tabbar-item icon="records" info="5" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="contact"  to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import TButton from '@/components/button/TButton'
  import TIcon from '@/components/icon/Icon'
  export default {
    name: 'home',
    components: {
      TButton,
      TIcon
    },
    data() {
      return {
        active: 0
      }
    },
    computed: {
      unReadNum() {
        return this.$store.getters.unreadMsgList.length + ''
      }
    },
    methods: {},
    created() {
    },
    activated() {
      // alert(1)
      // this.$store.dispatch('recvMsg')
    }
  }
</script>
