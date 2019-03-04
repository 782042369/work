<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2018-12-28 17:04:01
 * @Description: part5
-->
<template>
  <div class="section">
    <p class="txtbox ani-speed">
      <em>
        <span>{{val | DateFilters}}</span>
      </em>
      <em>是你坐地铁最早的一次</em>
      <em>这一天对你来说</em>
      <em>应该有什么重要的事吧</em>
    </p>
    <img alt class="ani-speed" src="../images/part5/3.png">
    <img alt class="ani-speed" src="../images/part5/4.png">
    <img alt class="ani-speed" src="../images/part5/5.png">
    <img alt src="../images/part5/2.png">
    <img alt src="../images/part4/2.png">
  </div>
</template>

<script>
export default {
  props: {
    val: String
  }
};
</script>
