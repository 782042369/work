<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-02 18:40:51
 * @Description: 分享页
-->
<template>
  <div class="section share">
    <h1 class='zhidao' @click="zhidao=false" v-show="zhidao">
      邀请好友查看报告
      <span>（你的报告不会被泄漏）</span>
    </h1>
    <div class="mask">
      <p class="center-center" ref="loading" v-show="showmain">正在生成您的专属关键词...</p>
      <main class="center-center" v-show="!showmain">
        <img :src="imageUrl" alt>
        <h2 v-if='wxshow'>长按保存2018易通行年度关键词</h2>
        <button @click="handleOneSee">再看一次</button>
        <button @click="handleShare">分享给好友</button>
      </main>
    </div>
  </div>
</template>

<script>
import { share } from 'rpjssdk'; // 分享
export default {
  props: {
    keyword: String // 分享图片关键字 前端自己转
  },
  data() {
    return {
      showmain: true,
      imageUrl: '',
      wxshow: false, // 微信打开
      zhidao: false // 微信分享指导
    };
  },
  created() {
    if (this.$wxBrowser === 'weixin') {
      this.wxshow = true;
    }
    let arr = {
      逛吃: '1',
      文艺是一种生活态度: '2',
      最靓的崽: '3',
      逛园子: '4',
      远方: '5',
      千人天团: '6',
      听说你住得有点远: '7',
      搬砖: '8',
      睡了假觉: '9',
      放荡不羁爱自由: '10',
      挤: '11',
      随缘: '12',
      家里有矿: '13'
    }[this.keyword];
    this.imageUrl = `https://static.ruubypay.com/activities-v2/images/share/2018-year-report/result/${arr}.jpg`;
  },
  mounted() {
    let seeAnimation = () => {
      this.showmain = false;
      this.$refs.loading.removeEventListener(
        'animationend',
        seeAnimation,
        false
      );
    };
    this.$refs.loading.addEventListener('animationend', seeAnimation, false);
  },
  methods: {
    handleShare() {
      this.$jice.track('click36');
      if (this.$wxBrowser === 'weixin') {
        this.zhidao = true;
      } else {
        share({
          // app 分享按钮
          type: 1,
          iconUrl: this.imageUrl,
          imageUrl: this.imageUrl
        });
      }
    },
    handleOneSee() {
      this.$jice.track('click37');
      window.location.hash = '';
      window.location.reload();
    }
  }
};
</script>
