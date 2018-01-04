<template>
  <div class="hello">
    <el-container>
      <el-menu default-active="1-4-1" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
          </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="create_goods">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3">
    <i class="el-icon-setting"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
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
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: left;
    height: 100%;
    min-height: 100vh;
  }
  body>.el-container {
    margin-bottom: 40px;
  }
</style>
