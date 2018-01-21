import React from 'react'
import {connect} from 'react-redux'
import {setInfo} from '../redux/user.redux'
import {NavBar, TabBar} from 'antd-mobile'
import Msg from '../views/msg'
import Order from '../views/order'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
@connect(state => state.userReducer, {setInfo})
@withRouter
class HomeRouter extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const Index = function () {
      return <h1>Index</h1>
    }
    const User = function () {
      return <h1>User</h1>
    }
    const navList = [
      {
        text: '首页',
        icon: 'icon-homepage',
        sicon: 'icon-homepage_fill',
        path: '/index',
        component: Index
      }, {
        text: '消息',
        icon: 'icon-message',
        sicon: 'icon-message_fill',
        path: '/msg',
        component: Msg
      }, {
        text: '订单',
        icon: 'icon-activity',
        sicon: 'icon-activity_fill',
        path: '/order',
        component: Order
      }, {
        text: '我的',
        icon: 'icon-people',
        sicon: 'icon-people_fill',
        path: '/user',
        component: User
      }
    ]
    var pathname = this.props.location.pathname
    console.log('path1',pathname)
    var pathArr = navList.map(v=>{
      return v.path
    })

    if(pathArr.indexOf(pathname)===-1){
      pathname='/index'
    }
    console.log('path',pathname)
    return (
      <div className="page-wrapper">
        <NavBar>{navList.find(v => v.path === pathname).text}</NavBar>
        <div className="page-content">
          <Switch>
            {navList.map(v => {
              return (
                <Route key={v.path} path={v.path} component={v.component}></Route>
              )
            })}
            <Route component={Index}></Route>
          </Switch>
        </div>
        <TabBar className="footer">
          {navList.map(v => {
            return (
              <TabBar.Item
                title={v.text}
                key={v.text}
                icon={< div > <i className={'iconfont ' + v.icon}></i> < /div>}
                selectedIcon={< div > <i className={'iconfont ' + v.sicon}></i> < /div>}
                selected={pathname === v.path}
                onPress={() => {
                this.props.history.push(v.path)
              }}></TabBar.Item>
            )
          })}
        </TabBar>
      </div>
    )
  }
}

export default HomeRouter