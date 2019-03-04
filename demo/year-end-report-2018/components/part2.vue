<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2018-12-26 19:16:09
 * @Description: part2
-->
<template>
  <div class="section">
    <img alt src="../images/part2/1.png">
    <p class="txtbox ani-speed">
      <em>欢迎来到小易的星球</em>
      <em>你是第&nbsp;
        <span>{{val}}</span>&nbsp;位
      </em>
      <em>入住易星球的老铁</em>
    </p>
    <img alt src="../images/part2/2.png">
    <div class="ani-speed">
      <img alt src="../images/part2/3.png">
    </div>
    <img alt src="../images/part2/4.png">
    <img alt src="../images/part2/5.png">
  </div>
</template>

<script>
export default {
  props: {
    val: Number
  }
};
</script>
