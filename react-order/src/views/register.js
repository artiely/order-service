import React, {Component} from 'react';
import {connect} from 'react-redux'
import {login, logout, register} from '../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {
  Button,
  List,
  InputItem,
  WhiteSpace,
  WingBlank,
  Radio
} from 'antd-mobile';
const RadioItem = Radio.RadioItem;
@connect(state => state.userReducer, {login, logout, register})
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repassword: '',
      type: 1
    }
  }
  handerRegister() {
    console.log(this.state)
    this.props.register(this.state)
  }
  handlerChange(k, v) {
    this.setState({[k]: v})
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handlerChange("username", v)} labelNumber={1} placeholder="用户名">
              <i className="iconfont icon-icon"></i>
            </InputItem>
            <InputItem onChange={v => this.handlerChange("password", v)} labelNumber={1} type="password" placeholder="密码">
              <i className="iconfont icon-14"></i>
            </InputItem>
            <InputItem onChange={v => this.handlerChange("repassword", v)} labelNumber={1} type="password" placeholder="确认密码">
              <i className="iconfont icon-14"></i>
            </InputItem>
            <RadioItem checked={this.state.type === 1} onChange={() => this.handlerChange("type", 1)}>我要服务</RadioItem>
            <RadioItem checked={this.state.type === 2} onChange={() => this.handlerChange("type", 2)}>我是工程师</RadioItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={() => this.handerRegister()}>注册</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default Register;
