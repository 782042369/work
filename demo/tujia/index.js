/* css reset */
import 'reset-css';
import Vue from 'vue';
import VueJice from 'vue-jice';
import Index from './views/index.vue';
import './components/componentRegister';
import './style/index.scss';
import api from '@/lib/api-tujia.js';
Vue.prototype.$API = api;
Vue.config.productionTip = false;
Vue.use(VueJice, {
  appId: 'aaf047db3dc94178ad434de5d2ebb290',
  debug: true
});
new Vue({
  render: h => h(Index)
}).$mount('#app');
