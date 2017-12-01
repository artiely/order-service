import * as types from '../mutation-types'

// initial state
const state = {
  userInfo: {
    _id: null
  }
}

// getters
const getters = {

}

// actions
const actions = {
  getUserInfo({
    commit
  }, payload) {
    commit(types.GET_USER_INFO, payload)
  }
}

// mutations
const mutations = {
  [types.GET_USER_INFO](state, payload) {
    console.log('this is payload', payload)
    console.log('this is state', state)
    state.userInfo = {...state.userInfo, ...payload}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
