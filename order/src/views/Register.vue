<template>
  <div id="register">
    <van-nav-bar title="注册" leftText="返回" @click-left="back" leftArrow fixed>
    </van-nav-bar>
    <van-cell-group style="margin-top:60px;">
      <van-field v-model="username" icon="clear" placeholder="请输入用户名" @click-icon="username = ''">
      </van-field>
      <!-- <field-code v-model="code" placeholder="请输入短信验证码" :count="30"></field-code> -->
      <van-field v-model="password" type="password" placeholder="请输入密码">
      </van-field>
      <van-field v-model="repassword" type="password" placeholder="确认密码">
      </van-field>
      <van-cell>
        <van-radio name="1" v-model="type">我需要服务</van-radio>
      </van-cell>
      <van-cell>
        <van-radio name="2" v-model="type">我是工程师</van-radio>
      </van-cell>
    </van-cell-group>
    <p v-show="error" class="error">{{errorMsg}}</p>
    <t-button @click.native="register">注册</t-button>
    <p @click="toLogin" class="help">登录</p>
    <p>
      <van-tag plain type="primary" @click.native="login({username:'G1', password:'123'})">测试工程师1登录</van-tag>
      <van-tag plain type="success"  @click.native="login({username:'K1', password:'123'})">测试客户1登录</van-tag>
    </p>
  </div>
</template>

<script>
import FieldCode from '@/components/field/FieldCode'
import TButton from '@/components/button/TButton'
import Logo from '@/components/logo/Logo'
import Cookies from 'js-cookie'
export default {
  name: 'register',
  components: {
    FieldCode,
    TButton,
    Logo
  },
  data() {
    return {
      username: '',
      code: '1024',
      password: '',
      repassword: '',
      error: false,
      errorMsg: '',
      type: '1'
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    back() {
      this.$router.go(-1)
    },
    login(params) {
      // const toast = Toast.loading({
      //   mask: true,
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   message: '登录中...'
      // })

      var data
      if (params) {
        data = params
      } else {
        if (this.username === '' || this.password === '') {
          this.error = true
          this.errorMsg = '用户名或密码不能为空'
          return
        }
        data = {
          username: this.username,
          password: this.password
        }
      }
      this.$api.LOGIN(data).then(res => {
        if (res.code === 0) {
          this.$api.GET_INFO().then(res2 => {
            if (res2.code === 0) {
              Cookies.set('_userId', {
                _id: res.data._id
              })
              this.$store.dispatch('getUserInfo', res2.data)
              this.$store.dispatch('getOrderList')
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
    },
    register() {
      if (this.username === '' || this.password === '') {
        this.error = true
        this.errorMsg = '用户名和密码不能为空'
        return
      } else if (this.password !== this.repassword) {
        this.error = true
        this.errorMsg = '两次密码不一致'
        return
      }
      let data = {
        username: this.username,
        code: this.code,
        password: this.password,
        type: this.type
      }
      this.$api.REGISTER(data).then(res => {
        if (res.code === 0) {
          this.$router.push('/login')
        } else {
          this.error = true
          this.errorMsg = res.msg
        }
      })
    }
  }
}
</script>
