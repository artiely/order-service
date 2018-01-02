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
  msgList: [] // 消息列表
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
  }
}

// mutations
const mutations = {
  [types.GET_USER_INFO](state, payload) {
    console.log('this is payload', payload)
    Cookies.set('_userId', {
      _id: payload._id
    }, {
      expires: 7
    })
    console.log('this is state', state)
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
  [types.SET_USER_ID](state, payload) {
    state.userInfo._id = payload
  },
  [types.GET_USERS](state, payload) {
    state.users = payload
  },
  [types.TARGET_USER](state, payload) {
    state.targetUser = payload
    Cookies.set('targetUser', payload)
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
  targetUser({
    commit
  }, payload) {
    commit(types.TARGET_USER, payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
