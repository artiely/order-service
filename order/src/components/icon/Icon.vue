<template lang="pug">
span.icons
  i.iconfont(:class="[name]" v-if="isDefault")
  svg.icon(aria-hidden="true" v-else)
    use(:xlink:href="'#'+name")
</template>

<script>
  export default {
    name: 't-icon',
    props: {
      name: {
        type: String,
        default: 'icon-praise'
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    computed: {
      isDefault() {
        return this.type === 'default' ? 1 : false
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
  .icons
    display: inline-block
  .icon
    width: 32px
    height: 32px
    vertical-align: -0.15em
    fill: currentColor
    overflow: hidden
  
</style>
