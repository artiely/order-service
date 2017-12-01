<template lang="pug">
  .e__box
    .e__header
      .e__icon
        .badge {{data.chatNum}}
        .img
          img(:src="data.userIcon")
      .name {{data.userName}}
      .e__tag {{data.lastChatTime}}
    .e__body
      .e__des {{data.lastChatText}}
</template>

<script>
  export default {
    name: 'e-item',
    props: {
      data: {
        type: Object,
        default: {
          lastChatTime: '00:00',
          userName: '高级工程师',
          lastChatText: '可以，我们马上给您解决！',
          userIcon: '',
          chatNum: '0'
        }
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
  .e__box
    width:100%
    text-align left 
    font-size 12px
    padding 8px 8px 8px 30px
    box-sizing border-box
    border-bottom 1px solid #eee
    .e__header
      display flex
      height:30px
      width:100%
      .name
        flex 1
        padding-top 5px
        padding-left 10px 
      .e__icon
        position relative
        height:30px
        width:30px
        border-radius:50%
        background:#ccc
        .badge
          position absolute
          top -10%
          right -30%
          padding 4px
          color #ffffff
          background rgba(255, 68, 68,0.8)
          font-size 8px
          border-radius 50%
          transform: scale(.8)
        .img
          width 30px
          height 30px
          border-radius 50%
          overflow hidden
          img
            width:100%
            object-fit :cover
      .e__tag
        flex 1
        text-align right 
        color #999
    .e__body
      padding 4px 0
      .e__des
        color #777
</style>
