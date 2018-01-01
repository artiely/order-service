<template lang="pug">
  .e__box
    .e__header
      .e__icon
        .badge(v-if="data._msg.length") {{data._msg.length}}
        .img(:style='{background:data._user.avatar}')
          //- img(:src="data.avatar")
      .name {{data._user.username ? data._user.username:'无名氏'}}
      .e__tag(v-if="data._msg.length") {{data._msg[data._msg.length-1].create_time}}
    .e__body
      .e__des(v-if="data._msg.length") {{data._msg[data._msg.length-1].content}}
</template>

<script>
  export default {
    name: 'e-item',
    props: {
      data: {
        type: [Object]
      }
    },
    data() {
      return {}
    },
    computed: {
      unreadMsgList() { // 所有未读消息
        return this.$store.getters.unreadMsgList
      },
      unreadMsg() { // 筛选出和当前聊天对象的未读消息
        return this.unreadMsgList.filter(v => {
          if (v.from === this.data._id) {
            return v
          }
        })
      },
      lastMsg() { // 获取最后一条消息
        return this.unreadMsg[this.unreadMsg.length - 1]
      }
    },
    mounted() {},
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
          color: #fff;
          top: -5px;
          right: -8px;
          font-size: 12px;
          -webkit-transform: scale(.8);
          transform: scale(.8);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 0 3px;
          text-align: center;
          min-width: 18px;
          line-height: 18px;
          border-radius: 9px;
          background-color: #f44;
          position: absolute;
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
