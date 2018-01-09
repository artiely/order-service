<template>
  <div id="home">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" :info="unReadNum" to="/msg">消息</van-tabbar-item>
      <van-tabbar-item icon="records" :info="orderNum" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">我的</van-tabbar-item>
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
      return this.$store.getters.unreadMsgList.length ? this.$store.getters.unreadMsgList.length + '' : ''
    },
    orderNum() {
      // 客户返回接单的数目 工程师显示未接单的数目
      if (this.$store.state.user.userInfo.type === '1') {
        return this.$store.getters.accepted.length ? this.$store.getters.accepted.length + '' : ''
      } else {
        return this.$store.getters.unAccept.length ? this.$store.getters.unAccept.length + '' : ''
      }
    }
  },
  methods: {},
  created() { },
  activated() {
    // alert(1)
    // this.$store.dispatch('recvMsg')
  }
}
</script>
