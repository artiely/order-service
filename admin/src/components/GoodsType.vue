<template>
  <div class="hello">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品分类</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-button type="primary"  class="button-new-tag" size="small" @click="add">添加顶级类别</el-button>
        <el-button type="success" class="button-new-tag" size="small" @click="add">修改顶级类别</el-button>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="item.name" :name="item.name" v-for="(item,i) in categoryList" :key="i">
            <el-button  class="button-new-tag" size="small" @click="showInput(item)">添加子分类</el-button>
            <el-tag
            :key="i"
            v-for="(tag,i) in item.children"
            :disable-transitions="false"
            class="a-tag"
           >
            {{tag.name}} <i class="el-icon-edit a-edit" ></i>
          </el-tag>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-cascader
    expand-trigger="hover"
    :options="options"
    v-model="selectedOptions2"
    @change="handleChange">
  </el-cascader>
    </el-card>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
    为{{item.name?item.name:''}} 添加子分类
    <el-input v-model="category1" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="postCategory1">确 定</el-button>
    </span>
  </el-dialog>
   <el-dialog
    title="添加顶级类别"
    :visible.sync="dialogVisible2"
    width="30%"
    >
    <el-input v-model="category" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="postCategory">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      categoryList: [],
      selectedOptions2: [],
      item: {},
      activeName: '',
      category: '',
      category1: ''
    }
  },
  computed: {
    options() {
      return this.categoryList.map(item => {
        item.label = item.name
        item.value = item._id
        item.children.map(v => {
          v.label = v.name
          v.value = v._id
        })
        return item
      })
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    add() {
      this.dialogVisible2 = true
    },
    showInput(item) {
      this.item = item
      this.dialogVisible = true
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    postCategory() {
      this.axios({
        url: '/api/category/create',
        method: 'post',
        data: { name: this.category, level: 1 }
      }).then(res => {
        if (res.data.code === 0) {
          this.dialogVisible2 = false
          this.getCategory()
        }
      })
    },
    postCategory1() {
      console.log(this.item)
      this.axios({
        url: '/api/category/create',
        method: 'post',
        data: { name: this.category1, level: 2, id: this.item._id }
      }).then(res => {
        if (res.data.code === 0) {
          this.dialogVisible = false
          this.getCategory()
        }
      })
    },
    getCategory() {
      this.axios({
        url: '/api/category/list',
        method: 'get'
      }).then(res => {
        if (res.data.code === 0) {
          this.categoryList = res.data.data
          this.activeName = res.data.data[0].name
        }
      })
    }
  }
}
</script>

<style>
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.a-tag {
  margin-right: 6px;
  cursor: pointer;
}
.a-edit {
  display: none;
}
.a-tag:hover .a-edit {
  display: inline;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
