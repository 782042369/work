<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 10:49:39
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-30 10:54:05
 * @Description: 途听天下
-->
<template>
  <div class="share">
    <!-- <portrait-page/>途听天下 -->
    <div @click="handleDownLoadApp">下载</div>
    <div @click="handleOpen">分享</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wxshareguide: false, // 微信分享指导
      wxshareguidetxt: null, // 微信提示文字
      wxshow: false // 微信微博打开
    };
  },
  created() {
    if (this.$wxBrowser === 'weixin') {
      this.wxshow = true;
    }
  },
  methods: {
    handleOpen() {
      this.wxshareguide = true;
      this.wxshareguidetxt = 2;
    },
    handleDownLoadApp() {
      this.wxshareguide = true;
      this.wxshareguidetxt = 1;
    }
  }
};
</script>
