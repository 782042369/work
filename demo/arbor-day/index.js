import 'reset-css';
import Vue from 'vue';
import VueJice from 'vue-jice';
import Index from './app.vue';
import './style/reset.scss'; // css 重置
import './style/animation.scss'; // scss 动画
import './style/flex.scss'; // scss flex
import './components/componentRegister';
import 'weixin-js-sdk';
import router from './router/index.js';
import toast from '@/components/base/toast';
import loading from '@/components/base/loading';
import { browser } from '@/lib/utils';
import api from '@/lib/api-arbor-day';

let wxBrowser = null;
// 微信 app判断
if (browser.versions.yitongxing) {
  wxBrowser = 'yitongxing';
} else if (browser.versions.MicroMessenger) {
  wxBrowser = 'weixin'; // 微信分享
} else {
  wxBrowser = 'none'; // 其他端跳下载页面
}
Vue.prototype.$wxBrowser = wxBrowser;
Vue.prototype.$toast = toast;
Vue.prototype.$API = api;
Vue.config.productionTip = false;
Vue.use(loading);
Vue.use(VueJice, {
  appId: process.env.VUE_APP_JCAPPID,
  debug: true
});
new Vue({
  router,
  render: h => h(Index)
}).$mount('#app');
