<!--
import { map } from 'async';
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 领取记录
 * @Date: 2019-02-27 18:20:48
 * @LastEditTime: 2019-03-22 18:46:40
-->
<template>
  <!-- <div @click="$router.back(-1)">领取记录</div> -->
  <div class="box">
    <header>
      <h5>
        <em></em>
        我当前拥有
        <em></em>
      </h5>
      <ul flex="main:center cross:center">
        <li flex="main:center cross:bottom">
          <span>{{jifenTotalAmount}}</span>
          <em>积分</em>
        </li>
        <li flex="main:center cross:bottom">
          <span>{{useAmount}}</span>
          <em>棵柠条</em>
        </li>
      </ul>
    </header>
    <main>
      <div class="title">树苗记录</div>
      <div class="nodate" v-if="seedExchangeTreeList.length === 0">
        暂无柠条记录
        <br>在活动首页可种下树苗获得～
      </div>
      <ul v-else>
        <li :key="index" flex="main:center wrap:wrap" v-for="(item,index) in seedExchangeTreeList">
          <h6>柠条 +1</h6>
          <em>{{item.createDate | WeekFilters}}</em>
          <span @click="handleLookCode(item.qrImgUrl) " class="title-txt">兑换实体柠条</span>
          <em>{{item.createDate | DateFilters}}</em>
        </li>
      </ul>
      <div class="title">积分记录</div>
      <div class="nodate" v-if="seedExchangeJifenList.length === 0">
        暂无积分领取记录
        <br>种树苗有机会获取积分哦～
      </div>
      <ul v-else>
        <li :key="index" flex="main:center wrap:wrap" v-for="(item,index) in seedExchangeJifenList">
          <h6>积分+{{item.jifenAmount}}</h6>
          <em>{{item.createDate | WeekFilters}}</em>
          <span style="color:#999999;">参与“种树苗”获得</span>
          <em>{{item.createDate | DateFilters}}</em>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Cookies from 'js-cookies';
import { getUserId, toast } from 'rpjssdk'; // 获取信息
export default {
  data() {
    return {
      userID: '', // 用户id
      useAmount: 0, //用户兑换柠条数量
      jifenTotalAmount: 0, // 用户拥有积分数量
      seedExchangeTreeList: [], // 兑换树列表
      seedExchangeJifenList: [] // 积分列表
    };
  },
  created() {
    if (this.$wxBrowser === 'yitongxing') {
      this.handleGetUserId();
    }
    if (this.$wxBrowser === 'weixin') {
      this.getUserAmountDetail();
    }
  },
  filters: {
    // 星期几
    WeekFilters(timestamp) {
      let myDate = new Date(timestamp);
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      var date = new Date(year, parseInt(month - 1), day);
      var week = String(date.getDay())
        .replace('0', '日')
        .replace('1', '一')
        .replace('2', '二')
        .replace('3', '三')
        .replace('4', '四')
        .replace('5', '五')
        .replace('6', '六');
      return `星期${week}`;
    },
    // 时间过滤 10月18日18:05
    DateFilters(timestamp) {
      let zero = function(time) {
        let arr = time < 10 ? '0' + time : time;
        return arr;
      };
      let myDate = new Date(timestamp);
      // let year = myDate.getFullYear();
      let month = zero(myDate.getMonth() + 1);
      let day = zero(myDate.getDate());
      let hour = zero(myDate.getHours());
      let minite = zero(myDate.getMinutes());
      return `${month}月${day}日 ${hour}:${minite}`;
    }
  },
  methods: {
    // 查看二维码
    handleLookCode(url) {
      this.$jice.track('click64');
      this.$router.push({
        path: 'qrcode',
        query: { codeurl: encodeURIComponent(url) }
      });
    },
    // 获取用户id
    handleGetUserId() {
      getUserId().then(res => {
        this.userID = res;
        this.getUserAmountDetail();
      });
    },
    // 未登录调登录
    getUserAmountDetail() {
      let thing = '';
      let arr = {};
      if (this.$wxBrowser === 'yitongxing') {
        thing = this.$API.recordDetail;
        arr.userId = this.userID.userId;
      } else if (this.$wxBrowser === 'weixin') {
        thing = this.$API.wxRecordDetail;
        arr.userId = Cookies.getItem('userID');
        arr.token = Cookies.getItem('wxTooken');
      }
      this.$loading.show();
      thing(arr)
        .then(res => {
          this.$loading.hide();
          this.useAmount = res.useAmount; //用户兑换柠条数量
          this.jifenTotalAmount = res.jifenTotalAmount; // 用户拥有积分数量
          this.seedExchangeTreeList = res.seedExchangeRecordList; // 兑换树列表
          this.seedExchangeJifenList = res.seedExchangeJifenList; // 积分列表
        })
        .catch(res => {
          this.toast(res.resMessage);
          this.$loading.hide();
        });
    },
    toast(res) {
      if (this.$wxBrowser === 'yitongxing') {
        toast({
          content: res
        });
      } else {
        this.$toast.show({
          message: res,
          duration: 1000
        });
      }
    }
  }
};
</script>
<style scoped lang='scss'>
@import '../style/receiving-records.scss'; // 重置浏览器
</style>
