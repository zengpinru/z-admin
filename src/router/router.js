import Home from '../views/home.vue'

export default [
  {
    path: '/',
    name: '/',
    component: Home
  },
  {
    path: '/test/test1',
    name: '/test/test1',
    component: () => import('../views/test-1.vue')
  },
  {
    path: '/test/test2',
    name: '/test/test2',
    component: () => import('../views/test-2.vue')
  },
  {
    path: '/test/test3',
    name: '/test/test3',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test4',
    name: '/test/test4',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test5',
    name: '/test/test5',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test6',
    name: '/test/test6',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test7',
    name: '/test/test7',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test8',
    name: '/test/test8',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test9',
    name: '/test/test9',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/test/test10',
    name: '/test/test10',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/zeng/one',
    name: '/zeng/one',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/zeng/two',
    name: '/zeng/two',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/zeng/three',
    name: '/zeng/three',
    component: () => import('../views/test-3.vue')
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/404',
    name: '/404',
    component: () => import('../views/error/404.vue')
  },
  {
    path: '/401',
    name: '/401',
    component: () => import('../views/error/401.vue')
  },
  {
    path: '*',
    name: '*',
    component: () => import('../views/error/404.vue')
  }
]
