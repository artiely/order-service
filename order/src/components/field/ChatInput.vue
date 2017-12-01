<template lang="pug">
  van-cell(style="padding:0")
    div.field__chat
      input(
        type="text"
        class="chat__input"
        ref="input"
        v-bind:value="value"
        v-on:input="updateValue($event.target.value)"
        :placeholder="placeholder"
        @keyup.enter="$emit('click-send')"
      )
      span.btn__code(@click="$emit('click-send')" ) 发送
</template>

<script>
  export default {
    name: 'chat-input',
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入'
      }
    },
    data() {
      return {
      }
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value.trim())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .field__chat
    display: flex
    height: 40px
    position fixed
    bottom 0
    right 0
    left 0
    z-index 99
    .chat__input
      flex: 1
      height: 40px
      border: none
      outline: none
      font-size:14px
      text-indent 8px
    .btn__code
      display: inline-block
      width: 60px
      height: 40px
      line-height: 40px
      text-align: center
      background: #ccc
      font-size:12px
</style>
