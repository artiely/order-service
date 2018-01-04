import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateGoods from '@/components/CreateGoods'

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
        }
      ]
    }
  ]
})
