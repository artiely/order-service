<template>
  <div id="order" >
    <van-cell-swipe :right-width="60" v-for="(item,i) in orderList" :key="i">
      <van-cell-group>
        <van-cell :value="item.instancy" >
          <div slot="title">
            <span class="van-cell-text" v-if="item.userinfo&&item.userinfo.username">({{item.userinfo.username}}){{item.userinfo.telphone}}</span>
            <van-tag type="danger">{{item.serviceType}}</van-tag>
            <van-tag type="danger" v-if="item.status==0">等待接单中</van-tag>
            <div slot="label">{{item.desc}}</div>
            <van-button size="small" v-if="userInfo.type == 1" >等待接单</van-button>
            <div size="small" v-if="userInfo.type == 2&&item.status==0" @click="acceptOrder(item)">接单</div>
            <div size="small" v-if="userInfo.type == 2&&item.status==1" @click="acceptOrder(item)">已接单</div>
          </div>
        </van-cell>
      </van-cell-group>
      <span slot="right" class="del" >删除</span>
    </van-cell-swipe>
    <div style="height:120px"></div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
export default {
  name: 'order',
  components: {},
  data() {
    return {}
  },
  computed: {
    orderList() {
      return this.$store.state.user.orderList
    },
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    acceptOrder(item) {
      socket.emit('acceptorder', item._id)
    }
  }
}
</script>
<style>
#order {
  text-align: left;
}
.del {
  width: 60px;
  height: 100%;
  text-align: center;
  display: inline-block;
  background: #f00;
}
</style>
