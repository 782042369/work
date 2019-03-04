<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 19:11:08
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-10 10:24:24
 * @Description: 钥匙盒子
-->
<template>
  <main class="key mainbox">
    <ul class="key-box">
      <li :key="index" v-for="(item, index) in ketlist">
        <img :src="item.imgsrc" alt>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <span>已打开{{keynum}}个宝箱</span>
  </main>
</template>

<script>
export default {
  props: {
    keynum: Number, // 打开宝箱数
    ketlist: Array // 钥匙显示
  }
};
</script>
