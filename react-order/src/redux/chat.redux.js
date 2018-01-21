import axios from 'axios'

const initData = {
  chatUser: [],
  msgList: [],
  // 未接单
  unAccept: [],
  //已接单
  accepted: [],
  // 未确认
  unConfrim: [],
  // 未评价
  unEvaluate: [],
  // 完成
  completed: []
}

const GET_CHAT_USERS = '获取聊天用户'
const GET_MSG_LIST = '获取聊天信息'
const SET_UNACCEPT = '转换未接单'
const SET_ACCEPTED = '转换已接单'
const SET_UNCONFRIM = '转换未确认'
const SET_UNEVALUATE = '转换未评论'
const SET_COMPLETED = '转换已完成'

export function chatReducer(state = initData, action) {
  switch (action.type) {
    case GET_CHAT_USERS:
      return {
        ...state,
        chatUser: [
          ...state.chatUser,
          ...action.payload
        ]
      }
    case GET_MSG_LIST:
      return {
        ...state,
        msgList: [
          ...state.msgList,
          ...action.payload
        ]
      }
    case SET_UNACCEPT:
      return {
        ...state,
        unAccept: [
          ...state.unAccept,
          ...action.payload
        ]
      }
    case SET_ACCEPTED:
      return {
        ...state,
        accepted: [
          ...state.accepted,
          ...action.payload
        ]
      }
    case SET_UNCONFRIM:
      return {
        ...state,
        unConfrim: [
          ...state.unConfrim,
          ...action.payload
        ]
      }
    case SET_UNEVALUATE:
      return {
        ...state,
        unEvaluate: [
          ...state.unEvaluate,
          ...action.payload
        ]
      }
    case SET_COMPLETED:
      return {
        ...state,
        completed: [
          ...state.completed,
          ...action.payload
        ]
      }
    default:
      return state
  }
}

function _getChatUser(data) {
  return {type: GET_CHAT_USERS, payload: data}
}

function _getMsgList(data) {
  return {type: GET_MSG_LIST, payload: data}
}

function _setUnaccept(data) {
  return {type: SET_UNACCEPT, payload: data}
}

export function getChatUser(type) {
  return dispatch => {
    axios({
      url: '/api/user/list',
      method: 'get',
      params: {
        type: type
      }
    }).then(res => {
      if (res.data.code === 0) {
        dispatch(_getChatUser(res.data.data))
        let resData = res.data.data
        var unaccept = resData.filter(v => {
          return v.state === 0
        })
        dispatch(_setUnaccept(unaccept))
      } else {
        console.log(res)
      }
    })
  }
}

export function getMsgList(type) {
  return dispatch => {
    axios({url: '/api/user/msglist', method: 'get'}).then(res => {
      if (res.data.code === 0) {
        dispatch(_getMsgList(res.data.data))
      } else {
        console.log(res)
      }
    })
  }
}
