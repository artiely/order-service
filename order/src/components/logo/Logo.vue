<template lang="pug">
  .logo
    img.img(src='./logo.jpg')
</template>

<script>
  export default {
    name: 'logo'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .logo
    height 100px
    width 100px
    overflow hidden
    margin: 10px auto
    border-radius 50%
    .img
      width 100%
</style>
