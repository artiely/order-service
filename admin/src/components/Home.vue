<template>
  <div class="hello">
    <el-container>
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="1-4-1" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <div slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </div>
          <el-menu-item-group>
            <span slot="title">产品</span>
            <el-menu-item index="create_goods">产品入库</el-menu-item>
            <el-menu-item index="goods_list">产品列表</el-menu-item>
            <el-menu-item index="goods_type">产品分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="工单">
            <el-menu-item index="order_list">工单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-container>
        <el-header>
          <span class="icon-expand" @click="changeCollapse"><i class="iconfont icon-expand-20-copy"></i></span>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .icon-expand {
    float: left;
    height: 60px;
    width: 60px;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
  }
  .icon-expand i {
    font-size: 24px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    text-align: left;
    position: relative;
    border-right: none;
    min-height: 100vh;
    padding-top: 60px;
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .el-menu-vertical-demo.el-menu--collapse {
    position: relative;
    border-right: none;
    min-height: 100vh;
    padding-top: 60px;
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .el-menu {
    border-right: none;
    z-index: 10;
  }
  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
  }
  .el-main {
    background-color: #f0f2f5;
    color: #333;
    text-align: left;
    height: 100%;
    min-height: 100vh;
  }
  body>.el-container {
    margin-bottom: 40px;
  }
</style>
