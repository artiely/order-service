<template lang="pug">
  van-cell(style="padding:0")
    div.field__code
      input(
        type="text"
        class="input__code"
        ref="input"
        v-bind:value="value"
        v-on:input="updateValue($event.target.value)"
        :placeholder="placeholder"
      )
      span.btn__code( @click="countdown(60)" v-if="this.count==countDown") 发送验证码
      span.btn__code(v-if="this.count!==countDown") 重新发送({{countDown}})
</template>

<script>
  export default {
    name: 'field__code',
    props: {
      value: {
        type: String,
        default: ''
      },
      count: {
        type: Number,
        default: 60
      },
      placeholder: {
        type: String,
        default: '请输入验证码'
      }
    },
    data() {
      return {
        __timer: null,
        countDown: this.count
      }
    },
    methods: {
      countdown() {
        this.countDown--
        this.__timer = setInterval(() => {
          this.countDown--
          if (this.countDown === 0) {
            this.countDown = this.count
            clearInterval(this.__timer)
          }
        }, 1000)
      },
      updateValue(value) {
        this.$emit('input', value.trim())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .field__code
    display: flex
    height: 44px
    .input__code
      flex: 1
      height: 44px
      border: none
      outline: none
      font-size:14px
    .btn__code
      display: inline-block
      width: 100px
      height: 44px
      line-height: 44px
      text-align: center
      background: #ccc
      font-size:12px
</style>
