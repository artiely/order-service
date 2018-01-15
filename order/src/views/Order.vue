<template>
  <div id="order">
    <!-- <van-nav-bar title="订单" fixed>
    </van-nav-bar> -->
    <div >
       <van-tabs :active="active" sticky :swipe-threshold="3">
      <van-tab v-for="(sub,i) in comboOrderList" :key="i" :title="sub.title+'('+sub.data.length+')'">
        <van-cell-group>
          <van-cell v-for="(item,i) in sub.data" :key="i">
            <div slot="title">
              <table style="width:100%">
                <tr>
                  <td class="label">用户:</td>
                  <td class="value">{{item.userinfo.username}}</td>
                  <td class="label">手机号:</td>
                  <td>{{item.userinfo.telphone}}</td>
                </tr>
                <tr>
                  <td class="label">服务方式:</td>
                  <td class="value">
                    <van-tag type="danger" v-if="item.serviceType=='上门服务'">{{item.serviceType}}</van-tag>
                    <van-tag type="success" v-else-if="item.serviceType=='远程协助'">{{item.serviceType}}</van-tag>
                    <van-tag type="primary" v-else>{{item.serviceType}}</van-tag>
                  </td>
                  <td class="label">紧急程度:</td>
                  <td class="value">
                    <van-tag plain type="danger" v-if="item.instancy=='紧急'">{{item.instancy}}</van-tag>
                    <van-tag plain type="primary" v-else>{{item.instancy}}</van-tag>
                  </td>
                </tr>
                <tr>
                  <td class="label">故障描述:</td>
                  <td class="value" colspan="3">{{item.desc}}</td>
                </tr>
                <tr>
                  <td class="label">工单状态</td>
                  <td class="value" colspan="3">
                    <!-- 客户 -->
                    <div v-if="userInfo.type==1&&item.userinfo&&item.userinfo.type == 1">
                      <div v-if="item.status==0">
                        <span class="dot warning"></span>等待接单</div>
                      <div v-if="item.status==1">已由（{{item.engInfo.username}}）接单</div>
                      <div v-if="item.status==2">工程师已确认完成</div>
                       <div v-if="item.status==3">待评价</div>
                       <div v-if="item.status==4">已完成</div>
                    </div>
                    <!-- 工程师 -->
                    <div v-if="userInfo.type==2">
                      <div v-if="item.status==0">
                        <span class="dot warning"></span>等待接单</div>
                      <div v-if="item.status==1">
                      <span class="dot success"></span>已接单</div>
                      <div v-if="item.status==2">待客户确认</div>
                      <div v-if="item.status==3">待客户评价</div>
                      <div v-if="item.status==4">已完成</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <!-- 客户 -->
                    <div v-if="userInfo.type==1&&item.userinfo&&item.userinfo.type == 1">
                         <van-button v-if="item.status==0" @click="delOrder(item)" size="small">取消工单</van-button>
                        <van-button v-if="item.status==1||item.status==2||item.status==3" @click="toChat(item.engInfo)" size="small">联系接单工程师</van-button>
                        <van-button v-if="item.status==2" @click="confirmBycustom(item)" size="small">确认已完成</van-button>
                        <van-button v-if="item.status==3" @click="evaluate(item)" size="small">评价</van-button>
                    </div>
                    <!-- 工程师 -->
                    <div v-if="userInfo.type==2">
                       <van-button v-if="item.status==0" @click="acceptOrder(item)" size="small">接单</van-button>
                       <van-button v-if="item.status==1||item.status==2||item.status==3" @click="toChat(item.userinfo)" size="small">联系客户</van-button> 
                       <van-button v-if="item.status==1" @click="confirmByEngineer(item)" size="small">完成工单</van-button>
                    </div>
                   
                  </td>
                </tr>
              </table>
            </div>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import {_ip} from '../api/config'
const socket = io(_ip)
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
    confirmByEngineer(data) {
      socket.emit('confirmbyengineer', data)
    },
    confirmBycustom(data) {
      socket.emit('confirmbycustom', data)
    },
    evaluate(data) {
      socket.emit('evaluate', data)
    },
    toChat(item) {
      this.$store.dispatch('targetUser', {
        _user: item
      })
      this.$router.push(`/chat/${item._id}`)
    },
    delOrder(item) {
      console.log(item)
      let data = item
      socket.emit('delorder', data)
    }
  }
}
</script>
<style>
#order {
  text-align: left;
}
.success {
  background: #06bf04;
}
.dot {
  height: 6px;
  width: 6px;
  border-radius: 50%;
  display: inline-block;
}
.warning {
  background: #f44;
  margin-right: 4px;
}
.label {
  font-size: 12px;
  color: #999;
  width: 20%;
}
.value {
  font-size: 14px;
  color: #555;
  width: 30%;
}
.del {
  width: 60px;
  height: 100%;
  text-align: center;
  display: inline-block;
  background: #f00;
}
</style>
