import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import store from '../vuex'
import LoginRegister from '@/views/Login_register'
import Login from '@/views/Login'
import Init from '@/views/Init'
import Register from '@/views/Register'
import Index from '@/views/Index'
import Home from '@/views/Home'
import Msg from '@/views/Msg'
import Order from '@/views/Order'
import User from '@/views/User'
import Chat from '@/views/Chat'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Init',
    component: Init,
    redirect: '/index',
    children: [
      {
        path: '/register',
        name: 'LoginRegister',
        component: LoginRegister
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/chat/:id',
        name: 'Chat',
        component: Chat,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '/index',
            name: 'Index',
            component: Index,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: '/msg',
            name: 'Msg',
            component: Msg,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: '/order',
            name: 'Order',
            component: Order,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: '/user',
            name: 'User',
            component: User,
            meta: {
              requiresAuth: true
            }
          }
        ]
      }
    ]
  }

]

/**
 * 登录拦截
 */
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  let _userId = Cookies.getJSON('_userId')
  let _id = _userId ? _userId._id : null

  if (!store.state.user.targetUser._user) {
    let targetUser = Cookies.getJSON('targetUser') ? Cookies.getJSON('targetUser') : {}
    store.dispatch('targetUser', targetUser)
  }
  if (_id) {
    store.dispatch('setUserId', _id)
    store.dispatch('getMsgList')
    store.dispatch('getUserInfo')
  }

  if (to.meta.requiresAuth) {
    if (_id) {
      next({
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
