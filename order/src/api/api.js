/**
 * Created by Artiely on 2017/7/20.
 */
import fetch from './fetch'
/**
 * 登录
 * @param {String} username
 * @param {String} password
 */
const LOGIN = params => {
  return fetch({
    url: '/api/user/login',
    method: 'post',
    data: params
  })
}
/**
 * 注册
 * @param {String} username
 * @param {String} password
 * @param {String} code
 */
const REGISTER = params => {
  return fetch({
    url: '/api/user/register',
    method: 'post',
    data: params
  })
}
/**
 * 注册
 * @param {String} username
 * @param {String} password
 * @param {String} code
 */
const GET_INFO = params => {
  return fetch({
    url: '/api/user/info',
    method: 'get',
    params: params
  })
}
/**
 * 获取消息列表
 * @param {*}
 */
const GET_MSG_LIST = params => {
  return fetch({
    url: '/api/user/msglist',
    method: 'get',
    params: params
  })
}

/**
 * 保存消息
 * @param {Object} {text:''}
 */
const POST_MSG = params => {
  return fetch({
    url: '/api/user/msg',
    method: 'post',
    data: params
  })
}
/**
 * 获取用户列表
 * @param {String} type 1客户2工程师
 */
const GET_USER_LIST = params => {
  return fetch({
    url: '/api/user/list',
    method: 'get',
    params: params
  })
}

/**
 * 消息设置为已读
 * @param {String} userid 当前登录用户
 * @param {String} from 谁发来的消息
 */
const READ_MSG = params => {
  return fetch({
    url: '/api/user/readmsg',
    method: 'post',
    data: params
  })
}

const CREATE_ORDER = params => {
  return fetch({
    url: '/api/order/add',
    method: 'post',
    data: params
  })
}
const ORDER_LIST = params => {
  return fetch({
    url: `/api/order/list`,
    method: 'get',
    params: params
  })
}

const apiList = {
  LOGIN,
  REGISTER,
  GET_INFO,
  GET_MSG_LIST,
  POST_MSG,
  GET_USER_LIST,
  READ_MSG,
  CREATE_ORDER,
  ORDER_LIST
}

export default apiList
