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
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="配送范围">
                  <span>{{ props.row.region }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row._id }}</span>
                </el-form-item>
                <el-form-item label="所属类型">
                  <span>{{ props.row.type }}</span>
                </el-form-item>
                <el-form-item label="入库时间">
                  <span>{{ props.row.create_time }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="销售量">
                  <span>
                      {{props.row.saleCount}}/{{props.row.count}}
                    </span>
                </el-form-item>
                <el-form-item label="是否销售">
                  <span v-if="props.row.sale">销售中</span>
                  <span v-else>下架</span>
                </el-form-item>
                <el-form-item label="入库时间">
                  <i class="el-icon-time"></i>
                  <span>{{ props.row.create_time }}</span>
                </el-form-item>
                <el-form-item label="产品图片">
                  <div class="img-box" v-for="(item,i) in props.row.img" :key="i">
                    <img :src="item.url" alt="">
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-table-column>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="商品名称" prop="name">
          </el-table-column>
          <el-table-column label="商品价格" prop="price">
          </el-table-column>
          <el-table-column label="销售量" prop="desc">
            <div slot-scope="scope">
              <el-progress :percentage="scope.row.saleCount/scope.row.count*100" status="exception">
              </el-progress>
            </div>
          </el-table-column>
          <el-table-column label="配送范围" prop="region">
          </el-table-column>
          <el-table-column label="所属类型" prop="type">
          </el-table-column>
          <el-table-column label="入库时间" prop="create_time">
            <div slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.create_time }}</span>
            </div>
          </el-table-column>
          <el-table-column label="是否销售" prop="sale" :filters="[{ text: '销售中', value: true }, { text: '下架', value: false }]" :filter-method="filterTag" filter-placement="bottom-end">
            <div slot-scope="scope">
              <el-tag :type="scope.row.sale == false ? 'warning' : 'success'" close-transition>
                <span v-if="scope.row.sale">销售中</span>
                <span v-else>下架</span>
              </el-tag>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes,prev, pager, next" :total="9" :page-sizes="[3, 6, 10]" @size-change="handleSizeChange" :page-size="params.limit" @current-change="currentChange">
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
        return row.sale === value
      },
      getData() {
        this.axios({
          url: `/api/goods/list/${this.params.page}/${this.params.limit}`,
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
