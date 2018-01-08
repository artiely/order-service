import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateGoods from '@/components/CreateGoods'
import GoodsList from '@/components/GoodsList'
import GoodsType from '@/components/GoodsType'
import OrderList from '@/components/OrderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/create_goods',
          name: 'CreateGoods',
          component: CreateGoods
        },
        {
          path: '/goods_list',
          name: 'GoodsList',
          component: GoodsList
        },
        {
          path: '/goods_type',
          name: 'GoodsType',
          component: GoodsType
        },
        {
          path: '/order_list',
          name: 'OrderList',
          component: OrderList
        }
      ]
    }
  ]
})
