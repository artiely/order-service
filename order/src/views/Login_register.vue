<template>
  <div id="login_register" class="page-content">
    <van-nav-bar  fixed >
      <span  slot="right" @click="toHelp">帮助</span>
    </van-nav-bar>
    <logo></logo>
    <t-button @click.native="toLogin">登录</t-button>
    <div style="height:8px"></div>
    <t-button @click.native="toRegister" type="yellow">注册</t-button>
  </div>
</template>

<script>
  import TButton from '@/components/button/TButton'
  import Logo from '@/components/logo/Logo'

  export default {
    name: 'login_register',
    components: {
      TButton,
      Logo
    },
    methods: {
      toRegister() {
        this.$router.push('/register')
      },
      toLogin() {
        this.$router.push('/login')
      },
      toHelp() {
        this.$router.push('/help')
      }
    }
  }
</script>
