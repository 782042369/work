import 'reset-css';
import Vue from 'vue';
import VueJice from 'vue-jice';
import Index from './views/index.vue';
import './style/index.scss';
import './components/componentRegister';
import 'weixin-js-sdk';
import toast from '@/components/base/toast';
import loading from '@/components/base/loading';
import { browser } from '@/lib/utils';
let wxBrowser = null;
// 微信 app判断
if (browser.versions.yitongxing) {
  wxBrowser = 'yitongxing';
} else if (browser.versions.MicroMessenger) {
  wxBrowser = 'weixin'; // 微信分享
} else {
  wxBrowser = 'none'; // 其他端跳下载页面
}
Vue.filter('iphoneFilters', function(phone) {
  // 电话加星号
  if (phone) {
    let phonenum = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    return phonenum;
  }
});
Vue.filter('cardtypeFilters', function(type) {
  // 1-七天会员 2-三天会员 3-包月会员
  if (type) {
    let typetxt = {
      1: '七天',
      2: '三天',
      3: '包月'
    }[type];
    return typetxt;
  }
});
// 类型 0-未发放奖励 1-七天会员 2-三天会员 3-包月会员
Vue.prototype.$wxBrowser = wxBrowser;
Vue.prototype.$toast = toast;
Vue.config.productionTip = false;
Vue.use(loading);
Vue.use(VueJice, {
  appId: process.env.VUE_APP_JCAPPID,
  debug: true
});
new Vue({
  render: h => h(Index)
}).$mount('#app');
