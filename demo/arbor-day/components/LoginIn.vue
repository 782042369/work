<template>
  <div class="mask" v-show="isKeep">
    <div class="mask-content">
      <ul>
        <li>
          <input
            @blur="scollorZeroPhone"
            maxlength="11"
            placeholder="请输入手机号"
            ref="phone"
            type="tel"
            v-model="tel"
          >
        </li>
        <li>
          <input
            @blur="scollorZero"
            class="code"
            maxlength="6"
            placeholder="请输入验证码"
            ref="code"
            type="text"
            v-model="code"
          >
          <span @click="sendCodeBtn" class="send-btn" v-if="timeTick>59">{{btnName}}</span>
          <span class="send-btn doing" v-else>{{timeTick}}s</span>
        </li>
      </ul>
      <button @click="immediatelyLogin" class="goLogin">立即登录</button>
    </div>
  </div>
</template>

<script>
import api from '@/lib/share-wx';
export default {
  data() {
    return {
      tel: '',
      code: '',
      telRegx: /^1\d{10}$/,
      timeTick: 60,
      btnName: '发送验证码'
    };
  },
  props: ['loginErrInfo', 'isKeep'],
  methods: {
    sendCodeBtn() {
      if (this.telRegx.test(this.tel)) {
        this.$toast.show({
          message: '验证码已发送至手机短信',
          duration: 1000
        });
        this.timeTick = 59;
        this.fetchVerificationCode();
        let timer = null;
        timer = setInterval(() => {
          this.timeTick--;
          if (this.timeTick === 0) {
            this.timeTick = 60;
            clearInterval(timer);
          }
        }, 1000);
      } else {
        this.$toast.show({
          message: '手机号输入错误',
          duration: 1000
        });
      }
    },
    scollorZeroPhone() {
      if (this.telRegx.test(this.tel)) {
        this.$refs.code.focus();
      } else {
        this.$toast.show({
          message: '手机号输入错误',
          duration: 1000
        });
      }
    },
    scollorZero() {
      // 验证码失去焦点事件
      window.scroll(0, 0);
    },
    // 获取验证码
    fetchVerificationCode() {
      api
        .GetWeChatVerificationCode({
          phoneNum: this.tel
        })
        .then(() => {})
        .catch(err => {
          if (err.resCode === 'A009') {
            this.$toast.show({
              message: err.resMessage,
              duration: 1000
            });
          }
        });
    },
    immediatelyLogin() {
      this.$jice.track('click34');
      if (this.tel !== '' && this.code !== '') {
        this.$emit('WeChatWebLoginAgain', {
          phone: this.tel,
          code: this.code,
          status: 'again'
        });
      } else if (this.tel === '') {
        this.$toast.show({
          message: '请输入手机号',
          duration: 1000
        });
      } else if (this.code === '') {
        this.$toast.show({
          message: '请输入验证码',
          duration: 1000
        });
      }
    },
    resetphone() {
      // 验证通过后清空 手机号验证码
      this.tel = '';
      this.code = '';
    },
    closeLogin() {
      this.$emit('watchIsKeep');
    }
  }
};
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 8;
  .mask-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 70px 32px 30px;
    background: #fff;
    border-radius: 6px;
  }
  li {
    border-radius: 50px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      transform-origin: 0 0;
      transform: scale(0.5);
      border: 1px solid #bbbbbb;
      /*no*/
      z-index: -1;
      border-radius: 100px;
    }
    .send-btn,
    input {
      color: #333333;
      font-size: 28px;
    }
    input {
      outline: none;
      margin-left: 40px;
      text-align: left;
    }
    input.code {
      width: 240px;
      z-index: 9;
    }
    .send-btn {
      color: #333;
      background: rgb(238, 238, 238);
      height: 92px;
      margin: 4px;
      border-radius: 50px;
      line-height: 92px;
      width: 180px;
      text-align: center;
    }
    span.doing {
      color: #ccc;
    }
  }
  li:first-child {
    margin-bottom: 30px;
  }
  .goLogin {
    margin-top: 90px;
    width: 500px;
    line-height: 100px;
    background-image: linear-gradient(-180deg, #5f4747 0%, #312222 100%);
    border-radius: 50px;
    font-size: 40px;
    color: #fff;
    border: none;
  }
}
</style>
