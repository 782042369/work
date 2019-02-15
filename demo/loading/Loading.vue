<!--
 * @Author: yanghognxuan
 * @Date: 2019-02-12 14:50:15
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-02-12 16:29:20
 * @Description: loading
--> 
<template>
  <div id="loading" v-show="show">
    <div class="loading_icon"></div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
};
</script>
<style lang='scss' scoped>
.loading_icon {
  width: 100px;
  height: 100px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: url('../../../assets/images/loading.png') no-repeat;
  background-size: contain;
  animation: ball-spin-fade-loader 4s infinite linear;
}

@keyframes ball-spin-fade-loader {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 140px;
  height: 140px;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 9997;
  border-radius: 20px;
}
</style>
