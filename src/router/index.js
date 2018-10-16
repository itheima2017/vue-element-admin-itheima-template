import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import Layout from '@/pages/layout'

const _import = require('./import_' + process.env.NODE_ENV) // 懒加载 导包

// 配置
Vue.use(Router)
NProgress.configure({showSpinner: false}) // NProgress Configuration

/**
 * 基础路由
 * 
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  // 登录 , hidden 菜单隐藏
  {
    path: '/login',
    component: _import('login'),
    hidden: true
  },
  {path: '/404', component: _import('404'), hidden: true},
  {path: '/401', component: _import('401'), hidden: true},
  // 面板
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard'),
        name: 'dashboard',
        meta: {title: '首页', icon: 'dashboard', noCache: true}
      }
    ]
  },
  // 业务
  {
    path: '/list',
    component: Layout,
    redirect: 'noredirect',
    name: 'list',
    meta: {
      title: '列表管理',
      icon: 'table'
    },
    children: [
      {
        path: 'table-list',
        component: _import('table-list'),
        name: 'table-list',
        meta: {title: '表格列表'}
      },
      {
        path: 'basic-list',
        component: _import('table-list'),
        name: 'basic-list',
        meta: {title: '基础列表'}
      },
      {
        path: 'card-list',
        component: _import('table-list'),
        name: 'card-list',
        meta: {title: '卡片列表'}
      }
    ]
  }
]

/**
 * 配置路由
 **/
let router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export let asyncRouterMap = [
  {path: '*', redirect: '/404', hidden: true}
]
