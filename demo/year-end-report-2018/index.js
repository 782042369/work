/* eslint-disable */
import 'reset-css';
import Vue from 'vue';
import VueJice from 'vue-jice';
import Index from './views/index.vue';
import './style/index.scss';
import './components/componentRegister';
import VueFullPage from 'vue-fullpage.js';
import 'weixin-js-sdk';
import toast from '@/components/base/toast';
Vue.prototype.$toast = toast;
let ua = navigator.userAgent.toLowerCase();
let wxBrowser = null;
let shareWay = [];
// 微信 app判断
if(ua.match(/yitongxing/i) == 'yitongxing'){
  // app中
  wxBrowser = 'yitongxing';
  if (ua.split('yitongxing/')[1] === '2.6.0') {
    shareWay = ['wechat', 'wechatTimeline'];
  } else {
    shareWay = ['WechatSession', 'WechatTimeLine'];
  }
} else {
  wxBrowser = 'weixin'; // 微信中
}
Vue.prototype.$wxBrowser = wxBrowser;
Vue.prototype.$shareWay = shareWay;
Vue.config.productionTip = false;
Vue.use(VueFullPage);
Vue.use(VueJice, {
  appId: 'aaf047db3dc94178ad434de5d2ebb290',
  debug: true
});
/**
 * timestamp 2018-07-13 19:05:11
 * formats formats || 'Y年m月d日' 过滤正则
 */
Vue.filter('DateFilters', function (timestamp, formats) {
  // IOS 系统 时间转换有bug https://mp.weixin.qq.com/s/pNEDAleSknyRXJmRlyKHCQ
  // '2018/07/13 19:05:11'
  // '2018-07-13 19:05:11'
  if (timestamp) {
    let zero = function (time) {
      let arr = time < 10 ? '0' + time : time
      return arr
    }
    let myDate = timestamp ? new Date(timestamp.replace(/-/g, "/")) : new Date()
    let year = myDate.getFullYear()
    let month = zero(myDate.getMonth() + 1)
    let day = zero(myDate.getDate())
    let hour = zero(myDate.getHours())
    let minite = zero(myDate.getMinutes())
    let second = zero(myDate.getSeconds())
    let val = formats || 'm月d日,H:i'
    return val.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
        Y: year,
        m: month,
        d: day,
        H: hour,
        i: minite,
        s: second
      })[matches]
    })
  }
});
new Vue({
  render: h => h(Index)
}).$mount('#app');
