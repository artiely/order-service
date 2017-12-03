import * as types from '../mutation-types'
import api from '@/api/api'

// import io from 'socket.io-client'
// import {
//   type
// } from 'os'
// const socket = io('ws://localhost:9093')

// initial state
const state = {
  userInfo: { // 用户信息
    _id: null
  },
  users: [],
  targetUser: {}, // 当前聊天对象
  msgList: [], // 消息列表
  unRead: '0' // 未读消息
}

// getters
const getters = {

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
  getMsgList({
    commit
  }, payload) {
    api.GET_MSG_LIST().then(res => {
      if (res.code === 0) {
        commit(types.GET_MSG_LIST, res.data)
        let unRead = res.data.filter(v => {
          return v.read === false
        })
        commit(types.SET_UN_READ, unRead.length.toString())
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

// mutations
const mutations = {
  [types.GET_USER_INFO](state, payload) {
    console.log('this is payload', payload)
    console.log('this is state', state)
    state.userInfo = { ...state.userInfo,
      ...payload
    }
  },
  [types.GET_MSG_LIST](state, payload) {
    state.msgList = payload
  },
  [types.RECV_MSG](state, payload) {
    state.msgList = [ ...state.msgList,
      payload
    ]
  },
  [types.SET_UN_READ](state, payload) {
    state.unRead = payload
  },
  [types.GET_USERS](state, payload) {
    state.users = payload
  },
  [types.TARGET_USER](state, payload) {
    state.targetUser = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
