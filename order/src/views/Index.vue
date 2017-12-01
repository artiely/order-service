<template>
  <div id="index" class="page-content">
    <van-nav-bar title="JS" @clickLeft="addressList" @clickRight="openMenu" fixed>
      <span slot="left">地址 <t-icon name="icon-unfold"></t-icon></span>
      <t-icon name="icon-other" slot="right"></t-icon>
    </van-nav-bar>
    <van-row style="padding-top:10px">
      <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-putao" slot="right" type='colorful'></t-icon>
          <p>数据</p>
        </div>
      </van-col>
     <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-shanzhu" slot="right" type='colorful'></t-icon>
          <p>硬件</p>
        </div>
      </van-col>
      <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-mihoutao" slot="right" type='colorful'></t-icon>
          <p>软件</p>
        </div>
      </van-col>
      <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-ningmeng" slot="right" type='colorful'></t-icon>
          <p>网络</p>
        </div>
      </van-col>
    </van-row>
    <van-row style="padding-top:10px">
      <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-boluo" slot="right" type='colorful'></t-icon>
          <p>电脑</p>
        </div>
      </van-col>
     <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-huolongguo" slot="right" type='colorful'></t-icon>
          <p>手机</p>
        </div>
      </van-col>
      <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-hongpingguo" slot="right" type='colorful'></t-icon>
          <p>系统</p>
        </div>
      </van-col>
      <van-col span="6">
        <div class="grid_box">
          <t-icon name="icon-pisa" slot="right" type='colorful'></t-icon>
          <p>办公</p>
        </div>
      </van-col>
    </van-row>
    <van-popup v-model="seting" position="left" style="width:80%;height:100%">
      内容
    </van-popup>
  </div>
</template>

<script>
  import TButton from '@/components/button/TButton'
  import TIcon from '@/components/icon/Icon'
  // import {
  //   Toast
  // } from 'vant'
  export default {
    name: 'login',
    components: {
      TButton,
      TIcon
    },
    data() {
      return {
        seting: false
      }
    },
    methods: {
      addressList() {
        this.$router.push('/address')
      },
      openMenu() {
        this.seting = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .grid_box{
    p{
      font-size: 12px;
      color: #777;
      margin: 4px
    }
  }
</style>

