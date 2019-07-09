import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/index')
        },
        {
          path: 'person',
          name: 'person',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/layout/person')
        },
        {
          path: 'learn',
          name: 'learn',
          meta: {
            title: '我的学习'
          },
          component: () => import('@/views/layout/learn')
        }
      ]
    },
    {
      path: '/header',
      name: 'header',
      component: () => import('@/views/header'),
      children: [
        {
          path: '/revise',
          name: 'revise',
          meta: {
            title: '修改个人信息'
          },
          component: () => import('@/views/revise')
        },
        {
          path: '/morearticles/:id',
          name: 'morearticles',
          meta: {
            title: '更多'
          },
          component: () => import('@/views/morearticles')
        },
        {
          path: '/details/:id',
          name: 'details',
          component: () => import('@/views/details'),
          meta: {
            title: '详情'
          }
        },
        {
          path: '/titles/:id',
          name: 'titles',
          meta: {
            title: '目录'
          },
          component: () => import('@/views/titles')
        },
        {
          path: '/article/:id',
          name: 'article',
          meta: {
            title: '文章详情'
          },
          component: () => import('@/views/article')
        },
        {
          path: '/login',
          name: 'login',
          meta: {
            title: '登录页'
          },
          component: () => import('@/views/login')
        },
        {
          path: '/register',
          name: 'register',
          meta: {
            title: '注册页'
          },
          component: () => import('@/views/register')
        },
        {
          path: '/changenikename',
          name: 'nikename',
          meta: {
            title: '修改昵称'
          },
          component: () => import('@/views/change/nikename')
        },
        {
          path: '/changedesc',
          name: 'changedesc',
          meta: {
            title: '修改个性签名'
          },
          component: () => import('@/views/change/desc')
        },
        {
          path: '/changepsw',
          name: 'changepsw',
          meta: {
            title: '修改密码'
          },
          component: () => import('@/views/change/password')
        },
        {
          path: '/collect',
          name: 'collect',
          meta: {
            title: '收藏书籍'
          },
          component: () => import('@/views/collect')
        },
        {
          path: '/like',
          name: 'like',
          meta: {
            title: '喜欢'
          },
          component: () => import('@/views/like')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})

export default router
