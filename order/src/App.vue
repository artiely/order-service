<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  export default {
    name: 'app',
    activated() {
      // this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style>
html,body{
  height: 100%;
  /* overflow: hidden; */
}
.my-content{
  position: absolute;
  top:44px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
.van-cell{
  padding: 10px!important
}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center
  }
  .help{
    text-align: center;
    font-size: 14px;
    color: #777;
  }
  .page-content {
    padding-top: 46px
  }
  .error {
    margin: 0;
    font-size: 12px;
    padding: 4px 8px;
    color: #f00;
    background: rgba(0, 0, 0, .1)
  }
</style>
