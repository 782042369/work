<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-21 10:21:20
 * @Description: 分享页
-->
<template>
  <div class="share">
    <h1 @click="zhidao=false" class="zhidao" v-show="zhidao">
      <img alt src="../images/share.png" v-show="txt === 1">
      <img alt src="../images/open.png" v-show="txt === 2">
    </h1>
    <main>
      <ul @click="handleOpen">
        <li>
          <span>10元观影券</span>
          <span>全国通用，不限场次，有效期至2019.3.31 23:59</span>
        </li>
        <li>
          <span>0.45元购买</span>
        </li>
      </ul>
      <span @click="handleShare">邀请好友一起薅羊毛</span>
    </main>
  </div>
</template>

<script>
import { share } from 'rpjssdk'; // 分享
import { VUE_APP_MALL } from '@/lib/consts'; // 分享
export default {
  data() {
    return {
      wxshow: false, // 微信打开
      zhidao: false, // 微信分享指导
      txt: null // 微信提示文字
    };
  },
  created() {
    if (this.$wxBrowser === 'other') {
      this.wxshow = true;
    }
  },
  methods: {
    handleShare() {
      this.$jice.track('click40');
      if (this.$wxBrowser === 'other') {
        this.zhidao = true;
        this.txt = 1;
      } else {
        share({
          type: 3,
          title: '10元观影券0.45元购福利邀请',
          desc: '内含10元观影券，不限影院，不限场次，全国通用。',
          link: location.href,
          iconUrl:
            'https://static.ruubypay.com/activities-v2/images/share/the-wandering-earth/icon.jpeg'
        });
      }
    },
    handleOpen() {
      this.$jice.track('click41');
      if (this.$wxBrowser === 'other') {
        this.zhidao = true;
        this.txt = 2;
      }
      if (this.$wxBrowser === 'yitongxing') {
        window.location.href = `${VUE_APP_MALL}/#/goods-detail?id=16`;
      }
    }
  }
};
</script>
