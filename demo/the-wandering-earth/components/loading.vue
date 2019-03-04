<!--
 * @Author: yanghognxuan
 * @Date: 2019-01-14 10:41:54
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-17 11:57:04
 * @Description: loading
-->
<template>
  <section class="laoding">
    <img alt src="../images/earth-loading.png">
    <em>{{num}}&nbsp;%</em>
  </section>
</template>

<script>
export default {
  props: {
    prograss: Number // 进度条
  },
  data() {
    return {
      num: 0 // 加载数字
    };
  },
  created() {
    this.numAnimation({
      time: 1500,
      finalNum: 99, // 100 代表接口完毕
      regulator: 50
    });
  },
  methods: {
    numAnimation(options) {
      // time 总时间--毫秒为单位
      // finalNum 要显示的真实数值
      // regulator 调速器，改变regulator的数值可以调节数字改变的速度
      let { time, finalNum, regulator } = options;
      var step = finalNum / (time / regulator);
      var count = 0; //计数器
      var initial = 0;
      var timer = setInterval(() => {
        count = count + step;
        if (count >= finalNum) {
          clearInterval(timer);
          count = finalNum;
        }
        var t = Math.floor(count);
        if (t == initial) return;
        initial = t;
        this.num = initial;
      }, 30);
    }
  },
  watch: {
    prograss(newal) {
      // loading动画完毕
      if (newal === 100) {
        this.num = 100;
        this.loadinganiend = true;
        setTimeout(() => {
          this.show = false;
          this.$emit('loadingend'); // loading 关闭后显示音乐盒
        }, 998);
      }
    }
  }
};
</script>
