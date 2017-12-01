<template>
  <div id="app" >
    <router-view/>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center
}
.page-content{
  padding-top: 46px
}
.error{
  margin: 0;
  font-size: 12px;
  padding: 4px 8px;
  color:#f00;
  background: rgba(0,0,0,.1)
}
</style>
