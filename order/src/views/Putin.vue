<template>
  <div id="putin">
    <van-nav-bar  leftText="返回" @click-left="back" leftArrow fixed style="z-index:99">
    </van-nav-bar>
    <van-cell-group style="margin-top:50px;">
  <van-field
    label="手机号"
    placeholder="请输入手机号"
    @click.native="handlerTel"
    v-model="orderInfo.userinfo.telphone"
  />
  <van-field
    label="故障描述"
    placeholder="请输入故障描述方便工程师更快更准确的定位和解决问题"
    v-model="desc"
    rows="2"
    required
    type="textarea"
    autosize
  />
  <van-field
    label="服务方式"
    placeholder="请选择服务方式"
    @click.native="handlerActionShow"
    v-model="orderInfo.serviceType"
  />
  <van-field
    label="紧急程度"
    placeholder="请选择服务方式"
    @click.native="handlerActionShow_instancy"
    v-model="orderInfo.instancy"
  />
</van-cell-group>
<van-button size="large" @click="createOrder" bottom-action>提交工单</van-button>
<van-actionsheet v-model="actionshow" title="支持以下服务方式">
 <van-radio-group v-model="serviceType">
  <van-cell-group>
    <van-cell><van-radio name="远程协助">远程协助</van-radio></van-cell>
    <van-cell><van-radio name="电话协助">电话协助</van-radio></van-cell>
    <van-cell><van-radio name="上门服务">上门服务</van-radio></van-cell>
  </van-cell-group>
</van-radio-group>
</van-actionsheet>
<van-actionsheet v-model="actionshow_instancy" title="工单紧急程度">
 <van-radio-group v-model="instancy">
  <van-cell-group>
    <van-cell><van-radio name="紧急">紧急 <em>工程师会立即处理</em> </van-radio></van-cell>
    <van-cell><van-radio name="闲时">闲时 <em>工程师会闲时处理 价格优惠20%</em></van-radio></van-cell>
  </van-cell-group>
</van-radio-group>
</van-actionsheet>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
export default {
  name: 'putin',
  components: {
  },
  data() {
    return {
      actionshow: false,
      actionshow_instancy: false,
      serviceType: '',
      instancy: '',
      desc: ''
    }
  },
  computed: {
    orderInfo() {
      return {
        userinfo: this.$store.state.user.userInfo,
        desc: this.desc,
        serviceType: this.serviceType,
        instancy: this.instancy
      }
    }
  },
  methods: {
    handlerActionShow() {
      this.actionshow = !this.actionshow
    },
    handlerActionShow_instancy() {
      this.actionshow_instancy = !this.actionshow_instancy
    },
    back() {
      this.$router.go(-1)
    },
    createOrder() {
      socket.emit('sendorder', this.orderInfo)
      console.log('提交的工单信息', this.orderInfo)
    }
  }
}
</script>