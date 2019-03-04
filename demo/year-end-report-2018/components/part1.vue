<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-03 20:38:02
 * @Description: part1
-->
<template>
  <div class="section">
    <main :class="loadinganiend ? 'loadingend': ''" v-show="show">
      <div class="center-center">
        <img src="../images/part1/ditie.png">
      </div>
      <span class="center-center">
        <em>{{num}}</em>%
      </span>
    </main>
    <main v-show="!show">
      <img alt src="../images/part1/biaoti.png">
      <img
        :class="movecar ? 'move': ''"
        alt
        class="ani-speed"
        ref="movecar"
        src="../images/part1/ditie.png"
      >
      <div class="ani-speed center-main">
        <p @click="handleGoPart2">立即<br>查看</p>
        <span></span>
      </div>
      <span class="icon-box"></span>
      <span class="icon-box"></span>
      <span class="icon-box"></span>
      <span class="icon-box"></span>
      <span class="icon-box"></span>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    prograss: Number
  },
  data() {
    return {
      num: 0, // 加载数字
      show: true, // loading和 第一屏加载动画
      loadinganiend: false, // loading完毕
      movecar: false // 火车移动开关
    };
  },
  created() {
    this.numAnimation({
      time: 1000,
      finalNum: 99, // 100 代表接口完毕
      regulator: 50
    });
  },
  methods: {
    handleGoPart2() {
      // 加载第二屏幕动画
      if (this.movecar === false) {
        this.movecar = true;
        let seeAnimation = () => {
          this.movecar = false;
          this.$refs.movecar.removeEventListener(
            'animationend',
            seeAnimation,
            false
          );
        };
        setTimeout(() => {
          this.$jice.track('click33');
          this.$emit('handlegopart');
        }, 800);
        this.$refs.movecar.addEventListener(
          'animationend',
          seeAnimation,
          false
        );
      }
    },
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
          // this.$emit('loadingend'); // loading 关闭后显示音乐盒
        }, 998);
      }
    }
  }
};
</script>
