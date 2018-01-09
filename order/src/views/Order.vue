<template>
  <div id="order">
    <van-tabs :active="active">
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
                    <van-tag type="danger">{{item.serviceType}}</van-tag>
                  </td>
                  <td class="label">紧急程度:</td>
                  <td class="value">{{item.instancy}}</td>
                </tr>
                <tr>
                  <td class="label">故障描述:</td>
                  <td class="value" colspan="3">{{item.desc}}</td>
                </tr>
                <tr>
                  <td class="label">工单状态</td>
                  <td class="value" colspan="3">
                    <div v-if="item.userinfo&&item.userinfo.type == 1&&item.status==0&&userInfo.type==1">等待接单</div>
                    <div size="small" v-if="item.userinfo&&item.userinfo.type == 2&&item.status==1" @click="acceptOrder(item)">已接单</div>
                    <van-button size="small" v-if="item.userinfo&&item.userinfo.type == 1&&item.status==0&&userInfo.type==2" @click="acceptOrder(item)">接单</van-button>
                    <div size="small" v-if="item.userinfo&&item.userinfo.type == 2&&item.status==1" >已接单</div>
                    <div size="small" v-if="item.userinfo&&item.userinfo.type == 1&&item.status==1" >已由（{{item.engInfo.username}}）接单
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="4"> 
                    <span v-if="userInfo.type==1&&item.status==0" @click="delOrder(item)"><van-button size="small">取消工单</van-button></span>
                    <div size="small" v-if="item.userinfo&&item.userinfo.type == 1&&item.status==1" >
                      <span v-if="userInfo.type==1" @click="toChat(item.engInfo)"><van-button size="small">联系接单工程师</van-button></span>
                      <span v-if="userInfo.type==2" @click="toChat(item.userinfo)"><van-button size="small">联系客户</van-button></span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </van-cell>
        </van-cell-group>
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
