<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 19:11:08
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-10 10:24:20
 * @Description: dialog
 * 打开弹窗 结果 0无 1铜 2银 3金 4中奖
-->
<template>
  <div class="dialog" v-if="dialogopen">
    <main class="no-prize open" v-if="dialognum === 0">
      <header>距离您打开宝藏还差一点点明天继续呦</header>
      <button @click="handleClose">确定</button>
    </main>
    <main class="haskey open" v-if="dialognum === 1 || dialognum === 2 || dialognum === 3">
      <div>
        <img :src="ZJimgsrc">
      </div>
      <button @click="handleClose">确定</button>
    </main>
    <main class="Congratulations open" v-if="dialognum === 4">
      <header>
        <img alt src="../images/tujiabx.png">
        <h4>恭喜你</h4>
        <h4>用超能力成功打开1个宝箱</h4>
        <h5>可3选1领取宝箱奖励</h5>
        <ul>
          <li :key="index" v-for="(item, index) in list">
            <span>{{item.name}}</span>
            <i :key="thingindex" v-for="(thing, thingindex) in item.zything">{{thing}}</i>
            <label class="my_protocol">
              <input
                @click="handleChoose(index, item.type)"
                class="input_agreement_protocol"
                type="checkbox"
                v-model="checked[index]"
              >
              <em></em>
            </label>
          </li>
        </ul>
      </header>
      <button @click="handleClose('jice')">确定</button>
    </main>
    <main class="exchange open" v-if="dialognum === 5">
      <header>
        <span @click="handleClose" class="close"></span>
        <h1>途家国际/国内优惠券 兑换码</h1>
        <h2>1.点击“复制兑换码”按钮</h2>
        <h2>2.点击“去使用”按钮至途家app兑换、使用优惠券</h2>
        <h2>3.在途家app【我的】→【红包】，点击“兑换红包”兑换</h2>
        <p>
          <span id="codeNum">{{couponCode}}</span>
          <a @click="copy" data-clipboard-target="#input" href="javascriper:;" id="codeBtn">复制兑换码</a>
        </p>
        <button @click="handleUse">去使用</button>
        <textarea id="input"></textarea>
      </header>
    </main>
  </div>
</template>

<script>
import { toast } from 'rpjssdk';
import ClipboardJS from 'clipboard'; // 复制引入的脚本
export default {
  props: {
    dialognum: Number, // 弹窗显示 0 没中 123 得钥匙 4 激活优惠券 5 兑换优惠券
    dialogopen: Boolean, // 弹窗开关
    list: Array, // 优惠券参数
    ZJimgsrc: String, // 中奖图片显示
    gohref: String, // 兑换奖券地址
    couponCode: String | Number // 兑换码
  },
  data() {
    return {
      checked: []
    };
  },
  created() {
    // 生成数组
    for (let i in this.list) {
      this.$set(this.checked, i, false);
    }
  },
  methods: {
    handleUse() {
      // jice途家活动优惠券兑换码-点击去使用
      this.$jice.track('click30');
      window.location.href = this.gohref;
      this.$emit('handleClose');
    },
    handleClose(val) {
      if (val === 'jice') {
        // jice途家活动-点击优惠券查看
        this.$jice.track('click28');
        this.checked.some(element => element === true)
          ? this.$emit('handleClose')
          : toast({
              content: '请先选择一个奖励'
            });
      } else {
        this.$emit('handleClose');
      }
    },
    copy() {
      // 复制
      let e = document.getElementById('codeNum').innerText;
      let t = document.getElementById('input');
      t.value = e;
      //实例化clipboard
      var clipboard = new ClipboardJS('#codeBtn');
      clipboard.on('success', function(e) {
        toast({
          content: '已复制兑换码'
        });
        e.clearSelection();
      });
      clipboard.on('error', function(e) {
        console.log(e);
      });
    },
    handleChoose(val, type = null) {
      // 优惠券单选
      this.checked.forEach((element, index) => {
        val !== index && (this.checked[index] = false);
      });
      this.$emit('choose', type);
    }
  }
};
</script>
