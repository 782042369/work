<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2018-12-28 17:04:06
 * @Description: part6
-->
<template>
  <div class="section">
    <p class="txtbox ani-speed">
      <em>
        <span>{{val | DateFilters}}</span>
      </em>
      <em>是你坐地铁最晚的一次</em>
      <em>不要害怕</em>
      <em>有小易陪着你</em>
    </p>
    <div class="center-main">
      <span></span>
    </div>
    <img alt class="center-main" src="../images/part6/2.png">
    <img alt src="../images/part6/4.png">
  </div>
</template>

<script>
export default {
  props: {
    val: String
  }
};
</script>
