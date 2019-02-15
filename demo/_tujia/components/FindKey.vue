<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 17:35:14
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-10 10:34:35
 * @Description: 点击钥匙
-->
<template>
  <div class="imgbox">
    <a
      :class="avtive[index] === true ? 'keyshow' : ''"
      :key="index"
      @click="handleGo(index)"
      href="javascript:;"
      v-for="(i, index) in keynum"
    >
      <span ref="item_box">找钥匙</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keynum: 6,
      avtive: [] // true 开启动画 false 关闭
    };
  },
  created() {
    // avtive 绑定动画class
    for (let i = 0; i < this.keynum; i++) {
      this.$set(this.avtive, i, false);
    }
  },
  methods: {
    // 点击钥匙后回调
    handleGo(e) {
      this.$set(this.avtive, e, true);
      let seeAnimation = () => {
        // 移除监听
        this.$set(this.avtive, e, false);
        this.$emit('handleGo');
        this.$refs.item_box[e].removeEventListener(
          'animationend',
          seeAnimation,
          false
        );
      };
      this.$refs.item_box[e].addEventListener(
        'animationend',
        seeAnimation,
        false
      );
    }
  }
};
</script>
