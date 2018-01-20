import React from 'react'
import {connect} from 'react-redux'
import {getChatUser} from '../redux/chat.redux'
import {List} from 'antd-mobile';

const Item = List.Item;
@connect(state => state.chatReducer, {getChatUser})
class Msg extends React.Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <div>
        <List>
          {this.props.chatUser.map(v=>{
            return(
              <Item key={v._id} thumb={<div style={{background:v.avatar,height:20,width:20}}></div>}>{v.username}</Item>
            )
          })}
        </List>
      </div>
    )
  }
}
export default Msg