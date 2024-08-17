import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let _import = file => () => import('../views/' + file + '.vue');
const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: _import('index'),
    name: '坐地铁，让地球更绿',
    meta: {
      index: 0
    }
  },
  {
    path: '/receiving-records',
    component: _import('receiving-records'),
    name: '我的记录',
    meta: {
      index: 1
    }
  },
  {
    path: '/qrcode',
    component: _import('qrcode'),
    name: '坐地铁，让地球更绿',
    meta: {
      index: 1
    }
  }
];

export default new VueRouter({
  routes
});
