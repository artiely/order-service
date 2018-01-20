import React, {Component} from 'react';
import {connect} from 'react-redux'
import {login, logout} from '../redux/user.redux'
import {Button, List, InputItem, WhiteSpace, WingBlank} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
@connect(state => state.userReducer, {login, logout})
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handerLogin() {
    console.log(this.state)
    this.props.login(this.state)
  }
  handlerChange(k, v) {
    console.log(k, v)
    this.setState({[k]: v})
  }
  handerToRegister() {
    console.log(this.props.history)
    this.props.history.push('/register')
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handlerChange("username", v)} labelNumber={1} placeholder="用户名" error={this.props.msg}>
              <i className="iconfont icon-icon"></i>
            </InputItem>
            <InputItem onChange={v => this.handlerChange("password", v)} labelNumber={1} type="password" placeholder="密码" error={this.props.msg}>
              <i className="iconfont icon-14"></i>
            </InputItem>
            <p style={{
          marginLeft: 12,
          padding: '0 3px',
          backgroundColor: '#fff',
          borderRadius: 2,
          color: '#f19736',
        }}>{this.props.msg}</p>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={() => this.handerLogin()}>登录</Button>
            <WhiteSpace></WhiteSpace>
            <Button type="ghost" onClick={() => this.handerToRegister()}>注册</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default Login;
