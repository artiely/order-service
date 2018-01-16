<template>
  <div class="hello">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="expand">
            <div slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="客户姓名">
                  <span>{{ props.row.userinfo.username }}</span>
                </el-form-item>
                <el-form-item label="紧急程度">
                  <span>{{ props.row.instancy }}</span>
                </el-form-item>
                <el-form-item label="客户电话">
                  <span>{{ props.row.userinfo.telphone }}</span>
                </el-form-item>
                <el-form-item label="订单状态">
                  <span v-if="props.row.status==0">等待接单</span>
                  <span v-if="props.row.status==1">已接单</span>
                  <span v-if="props.row.status==-1">已取消</span>
                </el-form-item>
              </el-form>
            </div>
          </el-table-column>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="客户姓名" prop="userinfo.username">
          </el-table-column>
          <el-table-column label="紧急程度" prop="instancy">
          </el-table-column>
          <el-table-column label="客户电话" prop="userinfo.telphone"></el-table-column>
          <el-table-column label="订单状态" prop="status" :filters="[{ text: '等待接单', value: 0 }, { text: '已接单', value: 1 },{ text: '已取消', value: -1 }]" :filter-method="filterTag" filter-placement="bottom-end">
            <div slot-scope="scope">
              <el-tag :type="scope.row.status == 0 ? 'warning' : 'success'" close-transition>
                <span v-if="scope.row.status==0">等待接单</span>
                <span v-if="scope.row.status==1">已接单</span>
                <span v-if="scope.row.status==-1">已取消</span>
                <span v-if="scope.row.status==2">工程师已确认</span>
                <span v-if="scope.row.status==3">客户已确认</span>
                <span v-if="scope.row.status==4">客户已评价</span>
                <span v-if="scope.row.status==5">完成</span>
              </el-tag>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes,prev, pager, next" :total="total" :page-sizes="[3, 6, 10]" @size-change="handleSizeChange" :page-size="params.limit" @current-change="currentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: null,
        multipleSelection: [], // checkbox选择列表
        params: {
          page: 1,
          limit: 3
        },
        total: 2
      }
    },
    created() {
      this.getData()
    },
    watch: {
      params: {
        handler() {
          this.getData()
        },
        deep: true
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(v) {
        this.params.limit = v
      },
      currentChange(v) {
        this.params.page = v
      },
      filterTag(value, row) {
        return row.status === value
      },
      getData() {
        // /${this.params.page}/${this.params.limit}
        this.axios({
          url: `/api/order/listall/${this.params.page}/${this.params.limit}`,
          method: 'get'
        }).then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.total = res.data.count
            console.log(res)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .img-box {
    width: 50px;
    height: 50px;
    overflow: hidden;
    display: inline-block;
    margin-right: 4px;
  }
  .img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
