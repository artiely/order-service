<template>
  <div id="goods" class="page-content">
    <van-nav-bar title="goods" left-arrow @click.native="back" fixed>
    </van-nav-bar>
    <van-card title="标题" desc="描述" num="2" price="2.00" :thumb="require('../assets/logo.png')">
      <div slot="footer">
        <van-button size="mini">联系商家</van-button>
        <van-button size="mini">下单</van-button>
      </div>
    </van-card>
  </div>
</template>

<script>
  export default {
    name: 'goods',
    data() {
      return {
        seting: false
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    mounted() {}
  }
</script>
<style lang="less" scoped>
  .grid_box {
    p {
      font-size: 12px;
      color: #777;
      margin: 4px
    }
  }
</style>

