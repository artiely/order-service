<template>
  <div id="order">
    <van-tabs :active="active">
      <van-tab v-for="(sub,i) in comboOrderList" :key="i"  :title="sub.title+'('+sub.data.length+')'">
         <van-cell-swipe :right-width="60" v-for="(item,i) in sub.data" :key="i">
      <van-cell-group>
        <van-cell :value="item.instancy">
          <div slot="title">
            <span class="van-cell-text" v-if="item.userinfo&&item.userinfo.username">({{item.userinfo.username}}){{item.userinfo.telphone}}</span>
            <van-tag type="danger">{{item.serviceType}}</van-tag>
            <div slot="label">{{item.desc}}</div>
            <van-button size="small" v-if="item.userinfo&&item.userinfo.type == 1&&item.status==0&&userInfo.type==1">等待接单</van-button>
            <div size="small" v-if="item.userinfo&&item.userinfo.type == 2&&item.status==1" @click="acceptOrder(item)">已接单</div>
            <div size="small" v-if="item.userinfo&&item.userinfo.type == 1&&item.status==0&&userInfo.type==2" @click="acceptOrder(item)">接单</div>
            <div size="small" v-if="item.userinfo&&item.userinfo.type == 2&&item.status==1" @click="acceptOrder(item)">已接单</div>
            <div size="small" v-if="item.userinfo&&item.userinfo.type == 1&&item.status==1" @click="acceptOrder(item)">已由（{{item.engInfo.username}}）接单 
              <span v-if="userInfo.type==1" @click="toChat(item.engInfo)">联系接单工程师</span>
              <span v-if="userInfo.type==2" @click="toChat(item.userinfo)">联系客户</span>
              </div>
          </div>
        </van-cell>
      </van-cell-group>
      <span slot="right" class="del">删除</span>
    </van-cell-swipe>
      </van-tab>
    </van-tabs>
   
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
    return {
      active: 0
    }
  },
  computed: {
    orderList() {
      return this.$store.state.user.orderList
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    comboOrderList() {
      return this.$store.getters.comboOrderList
    }
  },
  methods: {
    acceptOrder(item) {
      // 发送信息 谁接的单,接的哪一条单
      const data = {
        oid: item._id,
        engInfo: this.$store.state.user.userInfo
      }
      socket.emit('acceptorder', data)
    },
    toChat(item) {
      this.$store.dispatch('targetUser', { _user: item })
      this.$router.push(`/chat/${item._id}`)
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
