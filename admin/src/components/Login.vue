<template>
  <div class="hello">
   <el-dialog title="登录" :show-close="false" center :visible.sync="dialogFormVisible">
  <el-form :model="form" >
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <el-alert
  v-show="error"
    :title="errorMsg"
    type="error">
  </el-alert>
  <div slot="footer" class="dialog-footer">
    <el-button style="width:100%" type="primary" @click="login">登录</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: '120px',
      form: {
        username: '',
        password: ''
      },
      error: false,
      errorMsg: '',
    }
  },
  created() {

  },
  watch: {

  },
  methods: {
    login() {
      var data
      if (this.form.username === '' || this.form.password === '') {
        this.error = true
        this.errorMsg = '用户名或密码不能为空'
        return
      }
      data = {
        username: this.form.username,
        password: this.form.password
      }

      this.axios.post('/api/user/login', data).then(res => {
        if (res.data.code === 0) {
          // this.$api.GET_INFO().then(res2 => {
          //   if (res2.code === 0) {
          //     Cookies.set('_userId', {
          //       _id: res.data._id
          //     })
          //     this.$store.dispatch('getUserInfo', res2.data)
          //     this.$store.dispatch('getOrderList')
          //     this.$router.push('/index')
          //   } else if (res2.code === 1) {
          //     Cookies.remove('_userId')
          //   }
          // })
          this.$router.push('/home')
        } else {
          this.error = true
          this.errorMsg = res.msg
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
