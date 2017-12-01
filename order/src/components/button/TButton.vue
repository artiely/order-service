<template lang="pug">
  div.t__button(:class="['t__' + type]")
    span.t-button__text
      slot
</template>

<script>
  export default {
    name: 't-button',
    props: {
      type: {
        type: String,
        default: 'primary'
      }
    },
    data() {
      return {}
    },
    methods: {
      onClick(event) {
        this.$emit('click', event)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .t__button
    width 95%
    margin 5px auto
    border-radius 22px
    height 40px
    background #00deff
    background -webkit-linear-gradient(315deg, #00deff 0, #02caff 56%, #03b5ff 100%)
    background -o-linear-gradient(315deg, #00deff 0, #02caff 56%, #03b5ff 100%)
    background linear-gradient(135deg, #00deff 0, #02caff 56%, #03b5ff 100%)
    color #fff
    text-align color 
    line-height 40px
    box-shadow: 0 2px 6px 0 rgba(0, 222, 255,0.4)
  .t__yellow
    background: #ede020
    background: -webkit-linear-gradient(315deg, #ede020 0, #f6cd10 34%, #ffba00 100%)
    background: -o-linear-gradient(315deg, #ede020 0, #f6cd10 34%, #ffba00 100%)
    background: linear-gradient(135deg, #ede020 0, #f6cd10 34%, #ffba00 100%)
    color: #fff
    box-shadow: 0 2px 6px 0 rgba(237, 224, 32,0.4)
</style>
