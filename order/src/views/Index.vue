<template>
  <div id="index" class="page-content">
    <van-nav-bar title="JS" @clickLeft="addressList" @clickRight="openMenu" fixed>
      <span slot="left">地址 <t-icon name="icon-unfold"></t-icon></span>
      <t-icon name="icon-other" slot="right"></t-icon>
    </van-nav-bar>
    <van-row style="padding-top:10px">
      <van-col span="6">
        <div class="grid_box" @click="toGoods">
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
    <div @click="toputin" class="order-card" v-if="userInfo.type==1">
      工单需求
      <p class="desc">点击下单工程师可以远程或上门为您解决一切it服务。</p>
      <div class="go">前去下单</div>
    </div>
    <van-popup v-model="seting" position="left" style="width:80%;height:100%">
      内容
    </van-popup>
  </div>
</template>

<script>
import TButton from '@/components/button/TButton'
import TIcon from '@/components/icon/Icon'
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
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    toputin() {
      this.$router.push('/putin')
    },
    addressList() {
      this.$router.push('/address')
    },
    openMenu() {
      this.seting = true
    },
    toGoods() {
      this.$router.push('/goods')
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.order-card{
  width: 95%;
  margin:6px auto;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  padding: 8px;
  min-height: 80px;
  line-height: 1.5;
  box-sizing: border-box;
  border-radius: 4px;
  &:after{
    content: '';
    height: 0;
    display: block;
    overflow: hidden;
    clear: both;
  }
  .desc{
    font-size: 12px;
    color: #999;
    text-align: left;
  }
  .go{
    float: right;
    background: #eee;
    border-radius: 22px;
    padding:3px 6px;
  }
}
.grid_box {
  p {
    font-size: 12px;
    color: #777;
    margin: 4px;
  }
}
</style>

