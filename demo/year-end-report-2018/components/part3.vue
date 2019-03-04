<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-02 19:33:53
 * @Description: part3
-->
<template>
  <div class="section">
    <p class="txtbox ani-speed">
      <em>
        <span>{{val | DateFilters('Y年m月d日')}}</span>&nbsp;这一天
      </em>
      <em>是你第一次在这里出现</em>
    </p>
    <img alt class="center-main" src="../images/part3/1.png">
    <img alt class="ani-speed" src="../images/part3/2.png">
    <img alt src="../images/part3/3.png">
    <span class="icon-box"></span>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
  </div>
</template>

<script>
export default {
  props: {
    val: String
  }
};
</script>
