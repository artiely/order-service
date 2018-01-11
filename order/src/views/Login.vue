<template>
  <div id="login">
    <van-nav-bar title="登录" leftText="返回" @click.native="back" leftArrow fixed>
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="username" icon="clear" placeholder="请输入手机号" @click-icon="username = ''">
      </van-field>
      <van-field v-model="password" type="password" placeholder="请输入密码">
      </van-field>
    </van-cell-group>
    <p v-show="error" class="error">{{errorMsg}}</p>
    <t-button @click.native="login">登录</t-button>
  </div>
</template>

<script>
import TButton from '@/components/button/TButton'
import Cookies from 'js-cookie'
export default {
  name: 'login',
  components: {
    TButton
  },
  data() {
    return {
      username: '',
      password: '',
      error: false,
      errorMsg: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    login() {
      // const toast = Toast.loading({
      //   mask: true,
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   message: '登录中...'
      // })
      if (this.username === '' || this.password === '') {
        this.error = true
        this.errorMsg = '用户名或密码不能为空'
        return
      }
      let data = {
        username: this.username,
        password: this.password
      }
      this.$api.LOGIN(data).then(res => {
        if (res.code === 0) {
          this.$api.GET_INFO().then(res2 => {
            if (res2.code === 0) {
              Cookies.set('_userId', {
                _id: res.data._id
              })
              this.$store.dispatch('getUserInfo', res2.data)
              this.$router.push('/index')
            } else if (res2.code === 1) {
              Cookies.remove('_userId')
            }
          })
        } else {
          this.error = true
          this.errorMsg = res.msg
        }
      })
    }
  },
  activated() {
    // this.$store.dispatch('getMsgList')
    // this.$store.dispatch('recvMsg')
  }
}
</script>
