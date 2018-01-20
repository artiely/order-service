// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { userReducer } from './user.redux'
import { chatReducer } from './chat.redux'
export default combineReducers({userReducer,chatReducer})