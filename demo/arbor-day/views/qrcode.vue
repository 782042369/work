<!--
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 中奖二维码
 * @Date: 2019-02-27 18:21:13
 * @LastEditTime: 2019-03-07 12:50:23
-->
<template>
  <!-- <div @click="$router.back(-1)">中奖二维码</div> -->
  <div class="qrcode" flex="dir:top">
    <div class="tree"></div>
    <h5>柠条 兑换二维码</h5>
    <img :src="decodeURIComponent($route.query.codeurl)" alt class="code">
    <h5>树苗领取步骤</h5>
    <p>
      1.
      <i>截图保存</i>至相册
    </p>
    <p>2. 用微信“扫一扫”扫描二维码，参与种树</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$jice.track('pageview', {
      title: 'A1',
      url: '让地球更绿_树苗兑换二维码页截图',
      category: '营销活动页'
    });
  }
};
</script>

<style scoped lang='scss'>
@import '../style/qrcode.scss'; // 重置浏览器
</style>
