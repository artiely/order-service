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
      return this.$store.getters.orderActiveNum
    }
  },
  methods: {},
  created() { },
  activated() {
    let urlmark = this.$route.path
    switch (urlmark) {
      case '/home':
        this.active = 0
        break
      case '/':
        this.active = 0
        break
      case '/index':
        this.active = 0
        break
      case '/msg':
        this.active = 1
        break
      case '/order':
        this.active = 2
        break
      case '/user':
        this.active = 3
        break
    }
  }
}
</script>
