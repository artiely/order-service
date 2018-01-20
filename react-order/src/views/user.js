import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {Card,Button} from 'antd-mobile';
@connect(state => state, {logout})
class User extends React.Component {
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Card full>
          <Card.Header
            title={this.props.username}
           />
          <Card.Body>
           {this.props.type===1?'客户':'工程师'} 
          </Card.Body>
        </Card>
        <Button onClick={this.props.logout}>注销</Button>
      </div>
    )
  }
}
export default User