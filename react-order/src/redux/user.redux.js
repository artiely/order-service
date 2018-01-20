import axios from 'axios'
import Cookies from 'js-cookie'

const initData = {
  auth: false,
  username: 'artiely'
}

const LOGIN = '登录'
const REGISTER = '注册'
const LOGOUT = '注销'
const SETINFO = '获取用户信息'
const ERROR = '错误提示'

export function userReducer(state = initData, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: true,
        redirectTo: '/index',
        msg:'',
        ...action.payload
      }
    case REGISTER:
      return {
        ...state,
        auth: true,
        msg:'',
        redirectTo: '/index',
        ...action.payload
      }
    case SETINFO:
      return {
        ...state,
        auth: true,
        ...action.payload
      }
    case LOGOUT:
      return {
        ...state,
        redirectTo: '/login',
        auth: false
      }
    case ERROR:
      return {
        ...state,
        msg:action.payload
      }
    default:
      return state
  }
}


function _login(data) {
  return {type: LOGIN, payload: data}
}
function _register(data) {
  return {type: REGISTER, payload: data}
}

function error(data) {
  return {type: ERROR, payload: data}
}

export function setInfo(data) {
  return {type: SETINFO, payload: data}
}

export function login(data) {
  let {username,password} = data
  if(!username||!password){
    return error('用户名和密码不能为空')
  }
  return dispatch => {
    axios({url: '/api/user/login', method: 'post', data}).then(res => {
      if (res.data.code === 0) {
        dispatch(_login(res.data.data))
      }else{
        dispatch(error(res.data.msg))
      }
    })
  }
}

export function register({password,repassword,username,type}) {
  if(!username||!password||!type){
    return error('用户名和密码不能为空')
  }
  if(password!==repassword){
    return error('两次密码不一致')
  }
  return dispatch => {
    axios({url: '/api/user/register', method: 'post', data:{password,repassword,username,type}}).then(res => {
      if (res.data.code === 0) {
        dispatch(_register(res.data.data))
      }else{
        dispatch(error(res.data.msg))
      }
    })
  }
}
export function logout() {
  Cookies.remove('userid')
  return {type: LOGOUT}
}