import axios from 'axios'

const initData = {
  chatUser:[],
  msgList:[]
}

const GET_CHAT_USERS ='获取聊天用户'


export function chatReducer(state=initData,action){
  switch(action.type){
    case GET_CHAT_USERS:
    console.log('state',state,action.payload)
      return  {...state,chatUser:[...state.chatUser,...action.payload]}
    default:
      return state
  }
}

function _getChatUser(data){
  return {type:GET_CHAT_USERS,payload:data}
}

export function getChatUser(type) {
  return dispatch => {
    axios({url: '/api/user/list', method: 'get',params:{type:type}}).then(res => {
      if (res.data.code === 0) {
        dispatch(_getChatUser(res.data.data))
      }else{
       console.log(res)
      }
    })
  }
}
