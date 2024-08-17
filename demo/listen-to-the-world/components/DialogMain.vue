<!--
 * @Author: yanghognxuan
 * @Date: 2019-01-28 20:43:20
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-02-13 16:53:58
 * @Description: 弹窗
-->
<template>
  <div class="dialog" v-show="dialogflag">
    <div
      :class="['dialog_main', {'activedialog':(dislogstatus === 2 && dialogbtnstatus === 2), 'successdialog' : dislogstatus === 3,'ruledialog' : dislogstatus === 0}]"
    >
      <!-- 1领取查看 2激活 -->
      <div class="rule" v-show="dislogstatus===0">
        <a href="javascript:;">活动规则：</a>
        <p :key="index" v-for="(item,index) in rulejson">{{item.p}}</p>
        <a @click="handleCloseDialog(0)" href="javascript:;">确定</a>
      </div>
      <div
        :class="dislogstatus===1  ?'recording' :'activation'"
        v-show="dislogstatus==1 || dislogstatus==2"
      >
        <img :src="dialogimgsrc" alt>
      </div>
      <div class="main" v-show="dislogstatus!==0">
        <!-- 领取记录 -->
        <div class="txt" v-show="dislogstatus===1">
          <p class="nocard" v-if="rewardList.length === 0">暂未获得体验卡</p>
          <template v-else v-for="item in rewardList">
            <p :key="item.type">{{item.type | cardtypeFilters}}会员体验卡</p>
            <p :key="item.type + item.phone">{{item.phone | iphoneFilters}}</p>
          </template>
        </div>
        <!-- 领取 -->
        <div class="txt" v-show="dislogstatus===2">
          <div class="input_box">
            <input maxlength="11" placeholder="请输入手机号" type="tel" v-model="phone">
          </div>
          <span>1 会员权益将会与您输入的手机号绑定；</span>
          <span>2 领取成功后，可用此手机号登录蜻蜓FM App享受会员权益；</span>
          <span>3 会员卡天数可叠加，自领取之日起自动生效。</span>
        </div>
        <!-- 中奖了 -->
        <div class="txt" v-show="dislogstatus===3">
          <img :src="dialogimgsrc" alt>
          <em>可在「领取记录」查看</em>
        </div>
        <div class="bg"></div>
        <div class="btn">
          <button
            @click="handleCloseDialog(0)"
            v-show="dislogstatus === 1 || dislogstatus === 0 "
          >确定</button>
          <button @click="handleCloseDialog" v-show="dislogstatus === 3">确定</button>
          <button
            :class="{'btndisabled': btndisabled}"
            @click="handleCloseDialog(1)"
            v-show="dislogstatus === 2 && dialogbtnstatus === 1"
          >免费领取</button>
          <button
            :class="{'btndisabled': btndisabled}"
            @click="handleCloseDialog(2)"
            v-show="dislogstatus === 2 && dialogbtnstatus === 2"
          >领取会员</button>
          <span
            @click="handleCloseDialog(0)"
            v-show="dislogstatus === 2 && dialogbtnstatus === 2"
          >暂不领取</span>
        </div>
      </div>
      <img
        @click="handleCloseDialog(0)"
        class="close"
        src="../images/close.png"
        v-show="dislogstatus === 2 && dialogbtnstatus === 1"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialogflag: Boolean, // 开关
    rewardList: Array, // 领取列表
    phonenum: String, // 电话
    dialogimgsrc: String, // 七天 三天 月 会员 图片
    dislogstatus: Number, // dialog 1领取查看 2激活 3 领取 3 30 天战死
    dialogbtnstatus: Number // dialog 1 -- 7 免费领取 2 -- 领取会员 3 -- 3 30 领取会员
  },
  data() {
    return {
      phone: '', // 电话
      btndisabled: true, // 按钮禁用
      rulejson: [
        {
          p: '1、易通行用户均可参与本次活动；'
        },
        {
          p: '2、活动时间：2019年2月18日——2019年3月4日；'
        },
        {
          p: '3、节目音频收听30s触发3天/1月会员奖励，每个ID限一次中奖机会；'
        },
        {
          p: '4、7天会员限时领取，每ID限领取一次；'
        },
        {
          p:
            '5、会员领取后即生效，过期失效，请及时登录“蜻蜓FM”App享受会员权益；'
        },
        {
          p: '6、3天、7天及1月会员领取可叠加，有效日自领取之日起算。'
        }
      ]
    };
  },
  methods: {
    handleCloseDialog(num) {
      let arr = {
        phone: this.phone,
        channel: num
      };
      if (num === 1) {
        // 免费领取
        this.$jice.track('click49');
        this.$emit('getReceiveReward', arr);
      }
      if (num === 2) {
        // 领取会员
        this.$jice.track('click50');
        this.$emit('getReceiveReward', arr);
      }
      this.$emit('handleCloseDialog');
    }
  },
  watch: {
    phonenum(newval) {
      this.phone = newval; // 默认获取的用户电话
    },
    phone(newval) {
      /^1\d{10}$/.test(newval) && (this.btndisabled = false);
      /^1\d{10}$/.test(newval) || (this.btndisabled = true);
    }
  }
};
</script>
