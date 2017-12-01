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
 * 获取消息列表
 * @param {*}
 */
const GET_MSGLIST = params => {
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

const apiList = {
  LOGIN,
  REGISTER,
  GET_MSGLIST,
  POST_MSG,
  GET_USER_LIST
}

export default apiList
