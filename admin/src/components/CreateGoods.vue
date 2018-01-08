<template>
  <div class="hello">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品入库</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品图片" prop="fileList">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="http://upload.qiniup.com"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="ruleForm.fileList"
              :data="imgData"
              :auto-upload="true"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
              :on-error="onError"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            
          </el-form-item>
           <el-form-item label="产品描述" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="产品价格" prop="price">
            <el-input-number :step="100" v-model="ruleForm.price" controls-position="right" @change="handleChange" :min="100" :max="1000000"></el-input-number>
          </el-form-item>
          <el-form-item label="产品库存" prop="count">
            <el-input-number :step="100" v-model="ruleForm.count" controls-position="right" @change="handleChange" :min="100" :max="1000000"></el-input-number>
          </el-form-item>
          <el-form-item label="配送区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择配送区域">
              <el-option label="全国" value="全国"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="北京" value="北京"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="是否上架" prop="sale">
            <el-switch v-model="ruleForm.sale"></el-switch>
          </el-form-item>
          <el-form-item label="所属类型" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="病毒" name="type"></el-checkbox>
              <el-checkbox label="系统" name="type"></el-checkbox>
              <el-checkbox label="软件" name="type"></el-checkbox>
              <el-checkbox label="网络" name="type"></el-checkbox>
              <el-checkbox label="邮件" name="type"></el-checkbox>
              <el-checkbox label="硬件" name="type"></el-checkbox>
              <el-checkbox label="会议" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: null,
      ruleForm: {
        name: '',
        region: '',
        delivery: false,
        sale: false,
        type: [],
        desc: '',
        price: '',
        count: '',
        fileList: []
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '请选择配送区域',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个所属类型',
            trigger: 'change'
          }
        ],
        resource: [
          {
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请填写产品描述',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请填写产品价格',
            trigger: 'blur'
          }
        ],
        fileList: [
          {
            required: true,
            message: '请上传产品图片'
          }
        ]
      }
    }
  },
  created() {
  },
  activated() {
  },
  methods: {
    beforeUpload(file) {
      // 在图片提交前进行验证
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      console.log('上传前', file)
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return this.axios({
        url: '/api/upload',
        method: 'get',
        params: { fileName: file.name }
      }).then(res => {
        if (res.data.code === 0) {
          console.log('拿到当前token了')
          this.imgData = {
            key: res.data.result.fileName,
            token: res.data.result.uploadToken
          }
        } else {
          this.$message.error('上传图片失败')
        }
      }).catch(() => {
        this.$message.error('上传图片失败')
      })
    },
    onSuccess(res, file, fileList) {
      console.log('上传成功', res)
      this.ruleForm.fileList.push({ name: res.key, url: `http://p22aqog3k.bkt.clouddn.com/${res.key}` })
    },
    onError(err) {
      console.log('上传失败', err)
    },
    handleChange(value) {
      console.log(value)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log('什么时候触发', file)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let data = this.ruleForm
        if (valid) {
          this.axios({
            url: '/api/goods/create',
            data: data,
            method: 'post'
          }).then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.resetForm(formName)
          })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
