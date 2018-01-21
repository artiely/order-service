import axios from 'axios'

const initData = {
  orderList: [],
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

const GET_ORDER_LIST = '获取订单列表'
const SET_UNACCEPT = '转换未接单'
const SET_ACCEPTED = '转换已接单'
const SET_UNCONFRIM = '转换未确认'
const SET_UNEVALUATE = '转换未评论'
const SET_COMPLETED = '转换已完成'

export function orderReducer(state = initData, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return {
        ...state,
        orderList: [
          ...state.orderList,
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

function _getOrderList(data) {
  return {type: GET_ORDER_LIST, payload: data}
}
function _setUnaccept(data) {
  return {type: SET_UNACCEPT, payload: data}
}
function _setAccept(data) {
  return {type: SET_ACCEPTED, payload: data}
}
function _setUnConfrim(data) {
  return {type: SET_UNCONFRIM, payload: data}
}

function _unEvaluate(data) {
  return {type: SET_UNEVALUATE, payload: data}
}

function _completed(data) {
  return {type: SET_COMPLETED, payload: data}
}

export function getOrderList(type) {
  return dispatch => {
    axios({url: '/api/order/list/1/100', method: 'get'}).then(res => {
      if (res.data.code === 0) {
        dispatch(_getOrderList(res.data.data))
        var resData = res.data.data
        var unaccept = resData.filter(v => {
          return v.status === 0
        })
        var accepted = resData.filter(v => {
          return v.status === 1
        })
        var unConfrim = resData.filter(v => {
          if (type === 2) {
            return v.status === 2
          } else {
            return v.status === 3
          }

        })
        var unEvaluate = resData.filter(v => {
          return v.status === 4
        })
        var completed = resData.filter(v => {
          return v.status === 5
        })
        dispatch(_setUnaccept(unaccept))
        dispatch(_setAccept(accepted))
        dispatch(_setUnConfrim(unConfrim))
        dispatch(_unEvaluate(unEvaluate))
        dispatch(_completed(completed))
      } else {
        console.log(res)
      }
    })
  }
}
