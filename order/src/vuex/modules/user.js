import * as types from '../mutation-types'
import api from '@/api/api'
import Cookies from 'js-cookie'

// initial state
const state = {
  userInfo: { // 登录用户信息
    _id: null
  },
  users: [], // 所有用户
  targetUser: {}, // 当前聊天对象
  msgList: [], // 消息列表
  orderList: []
}

// getters
const getters = {
  // 全部的未读消息
  unreadMsgList: state => {
    // 获取未读的消息 根据当期登录用户的_id 和to的_id比较 如果一致就是未读
    // 当期登录的id
    let currentUserId = state.userInfo._id
    // 所有的消息列表
    let allMsgList = state.msgList
    // 未读的消息列表
    let unreadMsgList = allMsgList.filter(v => {
      if (v.read === false && v.to === currentUserId) {
        return v
      }
    })
    return unreadMsgList
  },
  // 当前可聊天的用户
  chatUserList: state => {
    // 当前登录用户的类型
    let currentType = state.userInfo.type
    return state.users.filter(v => {
      if (v.type !== currentType) {
        return v
      }
    })
  },
  msgListByUser: (state, getters) => {
    let chatInfo = []
    getters.chatUserList.map(v => {
      // 遍历出可聊天对象的消息
      let _msg = state.msgList.filter(item => {
        if (v._id === item.from) {
          return item
        }
      })
       // 遍历出可聊天对象的未读消息
      let _unmsg = getters.unreadMsgList.filter(item => {
        if (v._id === item.from) {
          return item
        }
      })
      chatInfo.push({
        _user: v,
        _msg: _msg,
        _unmsg: _unmsg
      })
    })
    // 排序 时间戳最大的排下面
    chatInfo = chatInfo.sort((a, b) => {
      var bt = b._msg.length === 0 ? 0 : b._msg[b._msg.length - 1].create_time
      var at = a._msg.length === 0 ? 0 : a._msg[a._msg.length - 1].create_time
      return bt - at
    })
    return chatInfo
  },
  // 待接单列表
  unAccept: state => {
    return state.orderList.filter(v => {
      if (v.status === 0) {
        return v
      }
    })
  },
  // 已接单的列表
  accepted: state => {
    return state.orderList.filter(v => {
      if (v.status === 1) {
        return v
      }
    })
  },
  // 我的接单 工程师返回自己的接单
  myAccepted: state => {
    return state.orderList.filter(v => {
      if (v.status === 1 && v.engInfo._id === state.userInfo._id) {
        return v
      }
    })
  },
  // 分状态组合的工单
  comboOrderList: (state, getters) => {
    // 当前登录的是工程师
    if (state.userInfo.type === '2') {
      return [{data: getters.unAccept, title: '未接单'}, {data: getters.myAccepted, title: '我的接单'}]
    } else {
      return [{data: getters.unAccept, title: '未接单'}, {data: getters.accepted, title: '已接单'}]
    }
  }
}

// mutations
const mutations = {
  [types.GET_USER_INFO](state, payload) {
    Cookies.set('_userId', {
      _id: payload._id
    }, {
      expires: 7
    })
    state.userInfo = { ...state.userInfo,
      ...payload
    }
  },
  [types.GET_MSG_LIST](state, payload) {
    state.msgList = payload
  },
  [types.RECV_MSG](state, payload) {
    state.msgList = [...state.msgList,
      payload
    ]
  },
  [types.RECV_ORDER](state, payload) {
    if (Object.prototype.toString.call(payload) === '[object Array]') {
      // 数据是数组证明是接口第一次请求数据 直接赋值
      state.orderList = payload
    } else {
      // 否则就是对象 1.下单的对象直接拼接 2.接单的对象需合并
      let onoff = false
      state.orderList = state.orderList.map(item => {
        if (item._id === payload._id) { // id相同就是接单应该合并
          onoff = true
          item = Object.assign({}, item, payload)
        }
        return item
      })
      if (!onoff) {
        state.orderList = [...state.orderList,
          payload
        ]
      }
    }
  },
  [types.SET_USER_ID](state, payload) {
    state.userInfo._id = payload
  },
  [types.GET_USERS](state, payload) {
    state.users = payload
  },
  [types.TARGET_USER](state, payload) {
    state.targetUser = payload
    Cookies.set('targetUser', payload)
  },
  [types.READ_MSG](state, payload) {
    state.msgList = state.msgList.map(item => {
      if (item.from === payload.from && state.userInfo._id === payload.userid) {
        item.read = true
      }
      return item
    })
  }
}

// actions
const actions = {
  getUserInfo({
    commit
  }, payload) {
    if (payload) {
      commit(types.GET_USER_INFO, payload)
    }
    api.GET_INFO().then(res => {
      if (res.code === 0) {
        commit(types.GET_USER_INFO, res.data)
        api.ORDER_LIST().then(resp => {
          if (resp.code === 0) {
            commit(types.RECV_ORDER, resp.data)
          }
        })
      } else if (res.code === 1) {
        Cookies.remove('_userId')
      }
    })
  },
  setUserId({
    commit
  }, payload) {
    if (payload) {
      commit(types.SET_USER_ID, payload)
    }
  },
  getMsgList({
    commit
  }, payload) {
    api.GET_MSG_LIST().then(res => {
      if (res.code === 0) {
        commit(types.GET_MSG_LIST, res.data)
        commit(types.GET_USERS, res.users)
      }
    })
  },
  recvMsg({
    commit
  }, payload) {
    commit(types.RECV_MSG, payload)
  },
  recvOrder({
    commit
  }, payload) {
    commit(types.RECV_ORDER, payload)
  },
  targetUser({
    commit
  }, payload) {
    commit(types.TARGET_USER, payload)
  },
  readMsg({commit}, payload) {
    commit(types.READ_MSG, payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
