<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2018-12-28 17:03:55
 * @Description: part4
-->
<template>
  <div class="section">
    <p class="txtbox ani-speed">
      <em>你一共使用易通行</em>
      <em>坐了
        <span>{{val}}次</span>地铁
      </em>
      <em>你的每次出行</em>
      <em>小易都陪在你身边</em>
    </p>
    <img alt class="ani-speed" src="../images/part4/2.png">
    <hr>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
  </div>
</template>

<script>
export default {
  props: {
    val: Number
  }
};
</script>
