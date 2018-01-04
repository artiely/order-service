<template>
  <div id="order">
    <p>空空如也</p>
    <van-card title="标题" desc="描述" num="2" price="2.00" :thumb="require('../assets/logo.png')">
      <div slot="footer">
        <van-button size="mini">联系买家</van-button>
        <van-button size="mini">抢单</van-button>
      </div>
    </van-card>
  </div>
</template>

<script>
  export default {
    name: 'order',
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>