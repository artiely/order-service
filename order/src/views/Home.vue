<template>
  <div id="home">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" :info="unRead" to="/msg">客服</van-tabbar-item>
      <van-tabbar-item icon="records" info="5" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import TButton from '@/components/button/TButton'
  import TIcon from '@/components/icon/Icon'
  // import {
  //   Toast
  // } from 'vant'
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
      unRead() {
        return this.$store.state.user.unRead
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
