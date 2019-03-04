/* eslint-disable */
import 'reset-css';
import Vue from 'vue';
import VueJice from 'vue-jice';
import Index from './views/index.vue';
import './style/index.scss';
import './components/componentRegister';
import 'weixin-js-sdk';
import toast from '@/components/base/toast';
let ua = navigator.userAgent.toLowerCase();
let wxBrowser = null;
// 微信 app判断
if (ua.match(/yitongxing/i) == 'yitongxing' || ua.indexOf('yitongxing') != -1) {
  // app中
  wxBrowser = 'yitongxing';
} else if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.indexOf('MicroMessenger') !== -1 || ua.match(/WeiBo/i) == 'weibo' || ua.indexOf('weibo') !== -1) {
  wxBrowser = 'other'; // 微信微博分享
} else {
  wxBrowser = 'none'; // 其他端跳下载页面
}
Vue.prototype.$wxBrowser = wxBrowser;
Vue.prototype.$toast = toast;
Vue.config.productionTip = false;
Vue.use(VueJice, {
  appId: 'aaf047db3dc94178ad434de5d2ebb290',
  debug: true
});
new Vue({
  render: h => h(Index)
}).$mount('#app');
