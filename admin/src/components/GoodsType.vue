<template>
  <div class="hello">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品分类</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-collapse v-model="activeNames" accordion @change="handleChange">
          <el-collapse-item :name="index" v-for="(item,index) in list" :key="index">
            <template slot="title">
      <h3>{{item.name}}<i class="header-icon el-icon-info"></i> 
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xxx"></use>
      </svg>
      </h3>
    </template>
            <el-collapse v-model="activeNames2" accordion @change="handleChange">
              <el-collapse-item :title="sub.name" :name="index+'-'+i" v-for="(sub ,i) in item.children" :key="i">
                <span style="margin-right:6px;" v-for="(v,j) in sub.children" :key="j"> <el-tag>{{v.name}}</el-tag></span>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(i)">+ New Tag</el-button>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['0'],
      activeNames2: ['0-0'],
      inputVisible: false,
      inputValue: '',
      list: [{
        name: '整机',
        children: [{
          name: '笔记本',
          children: [{
            name: '笔记本'
          },
          {
            name: '电脑超极本'
          },
          {
            name: '笔记本包'
          },
          {
            name: '笔记本电池'
          },
          {
            name: '笔记本电源'
          },
          {
            name: '适配器'
          },
          {
            name: '笔记本扩展坞/底座'
          },
          {
            name: '电脑清洁'
          },
          {
            name: '电脑锁'
          }
          ]
        },
        {
          name: '平板产品'
        },
        {
          name: '台式整机'
        }
        ]
      }, {
        name: 'DIY硬件',
        children: [{
          name: '装机硬件'
        },
        {
          name: '硬件外设',
          children: [{
            name: '液晶显示器'
          },
          {
            name: '音箱'
          },
          {
            name: '数位板'
          }
          ]
        },
        {
          name: '扩展配件'
        }
        ]
      }]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    showInput(i) {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput[i].$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        // this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
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
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
