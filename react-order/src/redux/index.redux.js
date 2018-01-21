// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { userReducer } from './user.redux'
import { chatReducer } from './chat.redux'
import { orderReducer } from './order.redux'
export default combineReducers({userReducer,chatReducer,orderReducer})