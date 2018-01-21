import React from 'react'
import {connect} from 'react-redux'
import {getChatUser} from '../redux/chat.redux'
import {Tabs,Card,Button} from 'antd-mobile';

@connect(state => {
  return {...state.orderReducer,...state.userReducer}
  }, {getChatUser})
class Order extends React.Component {
  componentDidMount() {}
  footerBtnByCustomer(v){
    if (v.status===0){
      return  <Button size="small" inline >等待接单</Button>
    }else if(v.status===1){
      return  <Button size="small" inline >联系工程师</Button>
    }else if(v.status===2){
      return  <Button size="small" inline >待确认</Button>
    }else if(v.status===4){
      return  <Button size="small" inline >待评论</Button>
    }
  }
  footerBtnByEngineer(v){
    if (v.status===0){
      return  <Button size="small" inline >抢单</Button>
    }else if(v.status===1){
      return  <Button size="small" inline >联系客户</Button>
    }else if(v.status===3){
      return  <Button size="small" inline >待确认</Button>
    }
    else if(v.status===4){
      return  <Button size="small" inline >待评论</Button>
    }
  }
  renderContent = tab => (
    <div
    >
    {tab.data.map(v=>{
      return (
        <Card full key={v._id}>
        <Card.Header
          title={v.userinfo.username}
          extra={<span>{v.userinfo.telphone}</span>}
        />
        <Card.Body>
          <div style={{marginBottom:6}}>{v.desc}</div>
          {
            this.props.type===1?<div>
             {this.footerBtnByCustomer(v)}
              </div>:<div>
              {this.footerBtnByEngineer(v)}
            </div>
          }
        </Card.Body>
      </Card>
      )
    })}
     
    </div>
  );
  render() {
    const tabs = [
      {
        title: '未接单',
        data: this.props.unAccept
      }, {
        title: '已接单',
        data: this.props.accepted
      }, {
        title: '未确认',
        data: this.props.unConfrim
      }, {
        title: '未评价',
        data: this.props.unEvaluate
      }, {
        title: '完成',
        data: this.props.completed
      }
    ];
    return (
      <div>
        <Tabs tabs={tabs} swipeable={false}>
          {this.renderContent}
        </Tabs>
      </div>
    )
  }
}
export default Order