<template>
  <div id="register">
    <van-nav-bar title="注册" leftText="返回" @click.native="back" leftArrow fixed>
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
  </div>
</template>

<script>
  import FieldCode from '@/components/field/FieldCode'
  import TButton from '@/components/button/TButton'
  import Logo from '@/components/logo/Logo'
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
