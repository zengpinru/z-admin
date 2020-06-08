import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../store'
import data from '../mock/menudata'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.menu.hasGetInfo) { // 没有获取用户的权限
    if (to.path !== '/login') {
      store.dispatch('menu/initMenuData', data).then(() => {
        console.log('初始化菜单成功')
      }).catch(err => {
        console.log(err)
      })
    } else {
      next()
    }
    next()
  } else {
    next()
  }
})

export default router
