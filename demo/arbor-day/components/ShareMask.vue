<template>
  <div @click="closeshaermask" class="zhidao" v-show="wxshareguide">
    <em class="bg"></em>
    <span class="bg" v-show="wxshareguidetxt === 1"></span>
    <span class="bg" v-show="wxshareguidetxt === 2"></span>
  </div>
</template>

<script>
export default {
  props: {
    wxshareguide: Boolean, // 微信分享指导
    wxshareguidetxt: Number // 微信提示文字
  },
  methods: {
    closeshaermask() {
      this.$emit('handleCloseShareMask');
    }
  }
};
</script>

<style style lang='scss' scoped>
.zhidao {
  position: fixed;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .bg {
    background-image: url('../images/share_sprites.png');
    background-size: 422px 178px;
    background-repeat: no-repeat;
    position: absolute;
  }
  .bg:nth-child(1) {
    width: 116px;
    height: 105px;
    background-position: -10px -10px;
    right: 42px;
    top: 32px;
  }
  .bg:nth-child(2),
  .bg:nth-child(3) {
    top: 174px;
    right: 26px;
  }
  .bg:nth-child(2) {
    width: 266px;
    height: 37px;
    background-position: -146px -10px;
  }
  .bg:nth-child(3) {
    width: 268px;
    height: 33px;
    background-position: -10px -135px;
  }
}
</style>
