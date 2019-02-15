<template>
  <div class="portrait" v-if="portrait">
    <h5>请刷新后竖屏观看</h5>
    <div class="iphone"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      portrait: true // 横屏开关
    };
  },
  created() {
    let mql = window.matchMedia('(orientation: portrait)');
    // 打印日志
    this.handleOrientationChange(mql);
    // 监听屏幕模式的变化
    mql.addListener(this.handleOrientationChange);
  },
  methods: {
    // 横屏竖屏判断
    handleOrientationChange(mql) {
      mql.matches ? (this.portrait = false) : (this.portrait = true);
    }
  }
};
</script>

<style lang='scss' scoped>
.portrait {
  text-align: center;
  font-size: 30px;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: #3f3f3f;
  z-index: 11111111;
  padding-top: 220px;
  h5 {
    font-size: 20px;
    color: #fff;
  }
  .iphone {
    position: absolute;
    top: 70px;
    left: 360px;
    height: 100px;
    width: 60px;
    animation: ani 3s linear infinite;
    transform-origin: 0% 100%;
    &::after {
      content: '';
      box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999,
        0 0 30px 0px rgba(0, 0, 0, 0.7);
      border: 2px solid #d9dbdc;
      background: #f8f8f8;
      padding: 2px;
      border-radius: 5px;
      height: 100px;
      width: 60px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &::before {
      content: '';
      background: #3f3f3f;
      border: 1px solid #fff;
      height: 88px;
      width: 50px;
      margin: 0 auto;
      border: 2px solid rgba(0, 0, 0, 0.9);
      position: absolute;
      top: 6px;
      left: 5px;
      z-index: 2;
    }
  }
}

@keyframes ani {
  50% {
    transform: rotate(-90deg);
  }
}
</style>
