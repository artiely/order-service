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
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="ruleForm.fileList"
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
          <el-form-item label="配送区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择配送区域">
              <el-option label="全国" value="china"></el-option>
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
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
      ruleForm: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        desc: '',
        price: '',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
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
            max: 5,
            message: '长度在 3 到 5 个字符',
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
  methods: {
    handleChange(value) {
      console.log(value)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
