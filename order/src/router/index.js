import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import store from '../vuex'
import LoginRegister from '@/views/Login_register'
import Login from '@/views/Login'
import Init from '@/views/Init'
const Register = () => import('@/views/Register')
const Index = () => import('@/views/Index')
const Home = () => import('@/views/Home')
const Msg = () => import('@/views/Msg')
const Order = () => import('@/views/Order')
const User = () => import('@/views/User')
const Chat = () => import('@/views/Chat')
const Goods = () => import('@/views/Goods')
const Putin = () => import('@/views/Putin')
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Init',
    component: Init,
    redirect: '/index',
    children: [
      {
        path: '/loginregister',
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
        redirect: '/index',
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
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/putin',
        name: 'Putin',
        component: Putin,
        meta: {
          requiresAuth: true
        }
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
        path: '/loginregister',
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
