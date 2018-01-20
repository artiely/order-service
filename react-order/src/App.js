import React, { Component } from 'react';
import { connect } from 'react-redux'
import {login,logout} from './redux/user.redux'
import { Button, List, InputItem, WhiteSpace,WingBlank } from 'antd-mobile';

@connect(
  state=>state,
  {login,logout}
)
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'K1',
      password:'123',
    }
  }
  handerRegister(){
    console.log('点击了')
    this.props.login(this.state)
  }
  handlerChange(k,v){
    this.setState={
      [k]: v
    }
  }
  render() {
    return (
      <div>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
        <List>
            <InputItem onChange={v=>this.handlerChange("username",v)} labelNumber={3} >用户名</InputItem>
            <InputItem onChange={v=>this.handlerChange("password",v)} labelNumber={3}>密&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={()=>this.handerRegister()}>登录</Button>
        </List>
        </WingBlank>
        {/* {this.props.auth?<div>{this.props.username}已登录<Button type="primary" onClick={this.props.logout}>注销</Button></div>:<Button type="primary" onClick={()=>this.handerRegister()}>登录</Button> } */}
      </div>
    );
  }
}
export default App;
