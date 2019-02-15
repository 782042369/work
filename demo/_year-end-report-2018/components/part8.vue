<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2018-12-29 11:55:41
 * @Description: part8
-->
<template>
  <div class="section">
    <p class="txtbox ani-speed">
      <em>
        <span>这一年里</span>
      </em>
      <em>你乘地铁出行的里程
        <span>{{val}}公里</span>
      </em>
      <em>相当于画了
        <span>{{val1}}个</span>北京城
      </em>
    </p>
    <p class="txtbox ani-speed">
      <em>（以六环公里数计算）</em>
      <span>
        <em>你的每次出行</em>
        <em>小易都放在心上</em>
      </span>
    </p>
    <div>
      <span class="center-center"></span>
      <svg viewBox="-10 -10 220 220">
        <path
          d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z"
          stroke-dashoffset="629"
        ></path>
      </svg>
    </div>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
    <span class="icon-box"></span>
    <span class="center-main huadong">向上滑动生成
      <br>你的出行关键词
    </span>
  </div>
</template>

<script>
export default {
  props: {
    val: Number, // 多少公里
    val1: Number // 多少个北京城
  }
};
</script>
