<template>
  <transition name="fade">
    <div class="toast-wrapper" v-show="isShow">
      <div class="toast" v-html="message"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 2000
    },
    callback: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.callback && this.callback();
      }, this.duration);
    }
  }
};
</script>

<style lang="scss" scoped>
.toast-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10001;
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 30px;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    white-space: nowrap;
    text-align: center;
    line-height: 120%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
