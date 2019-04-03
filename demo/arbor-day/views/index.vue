<!--
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 坐地铁，让地球更绿
 * @Date: 2019-02-27 17:36:48
 * @LastEditTime: 2019-03-22 20:13:04
-->
<template>
  <div>
    <portrait-page v-if="wxportraitshow"/>
    <header>
      <div :class="{bubbleToUp:bubbleflag}" class="bubble" ref="addbubble">树 +1</div>
      <img :class="{'moretreeop1':treenum>5 }" class="moretree" src="../images/moretree.png">
      <ul>
        <li @click="handleLookRule"></li>
        <li @click="handelReceivingRecords"></li>
        <li @click="handelDialogTitle(1)">
          <i>{{jifenAmount}}</i>
        </li>
        <li @click="handelDialogTitle(0)">
          <i>{{useAmount}}</i>
        </li>
      </ul>
      <div class="treebox">
        <img
          :class="{'addtreeani':treenum}"
          :key="index"
          :src="item"
          v-for="(item,index) in treebox"
        >
      </div>
      <a
        :class="{'addbtnani':addflag}"
        @click="handleAddTree"
        class="addtreebtn"
        href="javascript:;"
        ref="addbtn"
      ></a>
    </header>
    <main>
      <div class="title" flex="main:between">
        <h5>积分兑换商品</h5>
        <span @click="handleJoin(57)">更多</span>
      </div>
      <img @click="handleJoin(1, 21)" alt class="jifen" src="../images/goods1.jpg">
      <img @click="handleJoin(2, 20)" alt class="jifen" src="../images/goods2.jpg">
      <h5 class="title">积分认种稀有树苗</h5>
      <div class="goods" flex="main:between cross:center wrap:wrap">
        <img @click="handleJoin(3, 43)" alt src="../images/goods3.jpg">
        <img @click="handleJoin(4, 37)" alt src="../images/goods4.jpg">
        <img @click="handleJoin(5, 38)" alt src="../images/goods5.jpg">
      </div>
    </main>
    <dialog-main
      :dislogstatus="dislogstatus"
      :dislogstxt="dislogstxt"
      :jifenCount="jifenCount"
      :qrImgUrl="qrImgUrl"
      @handleCloseDialog="dialogflag = false"
      @handleJoin="handleJoin"
      @handleLookCode="handleLookCode"
      v-if="dialogflag"
    />
    <share-mask
      :wxshareguide="wxshareguide"
      :wxshareguidetxt="wxshareguidetxt"
      @handleCloseShareMask="wxshareguide = false"
      v-if="wxshow"
    />
    <login-in
      :isKeep="isKeep"
      :loginErrInfo="loginErrInfo"
      @watchIsKeep="watchIsKeep"
      @WeChatWebLoginAgain="WeChatWebLoginAgain"
      ref="loginbox"
      v-if="wxshow"
    />
  </div>
</template>

<script>
import { getUserId, goLogin, exitBrowser, toast } from 'rpjssdk'; // 获取信息
import shareWx from '@/mixins/shareWx';
import wxapi from '@/lib/share-wx.js';
import shareApp from '@/mixins/shareApp';
import { browser, getParmas } from '@/lib/utils';
import Cookies from 'js-cookies';
import { WXAPPID, VUE_APP_MALL, DOWNLOAD_APP } from '@/lib/consts'; // 商品页面 下载页面
import TREEA from '../images/Slice_0_41.png';
import TREEB from '../images/Slice_0_53.png';
import TREEC from '../images/Slice_0_67.png';
export default {
  mixins: [shareWx, shareApp],
  data() {
    return {
      wxShareParams: {
        title: '乘一次地铁种一棵树，我的积分已经够换地铁月卡啦！',
        desc: '用乘车次数绿化地球，一次出行=环保+划算',
        imgUrl:
          'https://static.ruubypay.com/activities-v2/images/share/arbor-day/icon.png',
        link: location.href
      },
      shareConfig: {
        type: 3,
        title: '乘一次地铁种一棵树，我的积分已经够换地铁月卡啦！',
        desc: '用乘车次数绿化地球，一次出行=环保+划算',
        link: location.href,
        channel: [],
        iconUrl:
          'https://static.ruubypay.com/activities-v2/images/share/arbor-day/icon.png'
      },
      treenum: 0, // 当前种植了几棵树
      treebox: [], // 前五个树点动画
      addflag: false, // 树木动画
      bubbleflag: false, // 气泡动画
      btnflag: true, // 按钮开关
      wxshareguide: false, // 微信分享指导
      wxshareguidetxt: null, // 微信提示文字
      wxshow: false, // 微信微博打开
      isKeep: false, // 微信是否打开登陆
      wxportraitshow: false, // 微信ios 横竖屏提示
      dislogstatus: null, // 0 规则 1 树苗 积分提醒弹窗 2恭喜你 3 无库存
      dislogstxt: null, // 0 树苗 1积分 2 无树苗 3 无库存
      dialogflag: false, // 弹窗
      jifenAmount: 0, // 用户积分数量
      useAmount: 0, // 用户树苗数量
      qrImgUrl: '', // 兑换二维码链接
      jifenCount: 0, //获取积分值
      wxParam: {
        // 微信授权配置
        APPID: WXAPPID,
        REDIRECT_URI: encodeURIComponent(location.href),
        SCOPE: 'snsapi_userinfo'
      },
      loginErrInfo: {}, // 微信未关联返错信息
      userID: '' // 用户id
    };
  },
  created() {
    document.title = this.$route.name;
    if (this.$wxBrowser === 'none') {
      window.location.href = `${DOWNLOAD_APP}?url=${location.href}`;
    }
    if (this.$wxBrowser === 'yitongxing') {
      this.handleGetUserId();
      let ua = navigator.userAgent.toLowerCase();
      // 微信 appthis
      if (ua.split('yitongxing/')[1] === '2.6.0') {
        this.shareConfig.channel = ['wechat', 'wechatTimeline'];
      } else {
        this.shareConfig.channel = ['WechatSession', 'WechatTimeLine'];
      }
    }
    if (this.$wxBrowser === 'weixin') {
      this.wxshow = true;
      this.getWxUser();
    }
    if (browser.versions.ios && this.$wxBrowser === 'weixin') {
      this.wxportraitshow = true;
    }
    this.$jice.track('pageview', {
      title: 'A1',
      url: document.title,
      category: '营销活动页'
    });
  },
  methods: {
    // 查询app内是否登陆
    handleGetUserId() {
      getUserId()
        .then(res => {
          this.userID = res;
          this.getUserList();
        })
        .catch(() => {
          this.goLoginMain();
        });
    },
    // 未登录调登录
    goLoginMain() {
      goLogin()
        .then(() => {
          this.handleGetUserId();
        })
        .catch(() => {
          exitBrowser();
        });
    },
    // 弹窗 区分app 还是 其他
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
    },
    // 用户中心登陆接口
    WeChatWebLoginAgain(linkParam) {
      this.WeChatWebLogin(linkParam);
    },
    // 用户中心登陆接口
    WeChatWebLogin(linkParam) {
      let loginParams = {
        authCode: getParmas().code,
        appFlag: 18110110
      };
      if (linkParam) {
        loginParams = Object.assign({
          authCode: '',
          appFlag: 18110110,
          phoneNum: linkParam.phone,
          messageCode: linkParam.code,
          tempID: this.loginErrInfo.tempID,
          mac: this.loginErrInfo.newMackey
        });
      }
      wxapi
        .WeChatWebLogin(loginParams)
        .then(res => {
          // 注册过易通行
          this.isKeep = false;
          let time = new Date();
          time.setTime(time.getTime() + res.expire * 1000);
          Cookies.setItem('wxTooken', res.token, time);
          Cookies.setItem('userID', res.userID, Infinity);
          this.$refs.loginbox.resetphone();
          this.getUserList();
        })
        .catch(res => {
          // 没注册过返临时id，mac，填写手机号再调该接口
          this.isKeep = true;
          if (res.resCode === 'A240') {
            this.loginErrInfo = res.resData;
          } else {
            this.toast(res.resMessage);
          }
        });
    },
    // 微信用户 授权 判断
    getWxUser() {
      if (Cookies.getItem('wxTooken')) {
        this.getUserList();
      } else if (location.search && getParmas().code) {
        this.WeChatWebLogin();
      } else {
        this.fetchAuthAllow();
      }
    },
    // 查看活动规则
    handleLookRule() {
      this.dialogflag = true;
      this.dislogstatus = 0;
    },
    // 用户信息
    getUserList() {
      let thing = '';
      let arr = {};
      if (this.$wxBrowser === 'yitongxing') {
        thing = this.$API.amountDetail;
        arr.userId = this.userID.userId;
      } else if (this.$wxBrowser === 'weixin') {
        thing = this.$API.wxAmountDetail;
        arr.userId = Cookies.getItem('userID');
        arr.token = Cookies.getItem('wxTooken');
      }
      this.$loading.show();
      thing(arr)
        .then(res => {
          this.$loading.hide();
          this.treenum = res.useExchangeAmount; // 用户种了多少树
          this.jifenAmount = res.jifenAmount; //	用户积分数量
          this.useAmount = res.useAmount; //	用户树苗数量
        })
        .catch(res => {
          this.toast(res.resMessage);
          this.$loading.hide();
        });
    },
    // 提醒弹窗
    handelDialogTitle(num) {
      this.$jice.track(num === 0 ? 'click55' : 'click54');
      this.dialogflag = true;
      this.dislogstatus = 1;
      this.dislogstxt = num;
    },
    // 查看二维码
    handleLookCode() {
      this.$router.push({
        path: 'qrcode',
        query: { codeurl: encodeURIComponent(this.qrImgUrl) }
      });
    },
    // 查看领取记录
    handelReceivingRecords() {
      this.$jice.track('click53');
      this.$router.push({ path: 'receiving-records' });
    },
    // 喜欢商品跳转埋点
    handleJoin(jicenum, goodsid = null) {
      jicenum === 57 && this.$jice.track('click57');
      let jicearr = {
        goods_title: {
          21: '京东月卡权益券',
          20: '京东周卡权益券',
          43: '花棒',
          37: '沙柳',
          38: '小美旱杨'
        }[goodsid],
        goods_id: goodsid
      };
      if (jicenum === 1 || jicenum === 2) {
        jicearr.goods_location = jicenum;
        this.$jice.track('click58', jicearr);
      }
      if (jicenum === 3 || jicenum === 4 || jicenum === 5) {
        this.$jice.track('click59', jicearr);
      }
      if (this.$wxBrowser === 'weixin') {
        this.wxshareguide = true;
        this.wxshareguidetxt = 2;
      }
      if (this.$wxBrowser === 'yitongxing') {
        window.location.href = goodsid
          ? `${VUE_APP_MALL}/#/goods-detail?id=${goodsid}`
          : VUE_APP_MALL;
      }
    },
    // 兑换树木
    handleAddTree() {
      this.$jice.track('click56');
      this.handlebtnani(); // 点击按钮动画
      if (this.btnflag) {
        this.btnflag = false;
        let thing = '';
        let arr = {};
        if (this.$wxBrowser === 'yitongxing') {
          thing = this.$API.exchange;
          arr.userId = this.userID.userId;
        } else if (this.$wxBrowser === 'weixin') {
          thing = this.$API.wxExchange;
          arr.userId = Cookies.getItem('userID');
          arr.token = Cookies.getItem('wxTooken');
        }
        this.$loading.show();
        thing(arr)
          .then(res => {
            this.$loading.hide();
            this.getUserList();
            this.qrImgUrl = res.qrImgUrl; // 兑换码地址
            this.jifenCount = res.jifenAmount; //获取积分值
            this.bubbleflag = true; // 气泡 +1 开关
            let seeAnimation = () => {
              // 移除监听
              this.bubbleflag = false;
              this.dialogflag = true;
              this.dislogstatus = 2;
              setTimeout(() => {
                this.btnflag = true;
              }, 1000);
              this.$refs.addbubble.removeEventListener(
                'animationend',
                seeAnimation,
                false
              );
            };
            this.$refs.addbubble.addEventListener(
              'animationend',
              seeAnimation,
              false
            );
            this.treebox.length < 6 && this.treenum++;
          })
          .catch(res => {
            this.btnflag = true;
            if (res.resCode === 'A090' || res.resCode === 'A093') {
              this.dislogstxt = res.resCode === 'A090' ? 2 : 3;
              this.dislogstatus = 3; // 3 无库存 无树苗提示
              this.dialogflag = true; // 3 无库存 无树苗提示
            } else {
              this.toast(res.resMessage);
            }
            this.getUserList();
            this.$loading.hide();
          });
      }
    },
    // 按钮动画
    handlebtnani() {
      this.addflag = true;
      let seeAnimation = () => {
        // 移除监听
        this.addflag = false;
        this.$refs.addbtn.removeEventListener(
          'animationend',
          seeAnimation,
          false
        );
      };
      this.$refs.addbtn.addEventListener('animationend', seeAnimation, false);
    },
    // 关闭蒙层
    watchIsKeep() {
      this.isKeep = false;
      window.scroll(0, 0);
    },
    // 授权
    fetchAuthAllow() {
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.wxParam.APPID
      }&redirect_uri=${this.wxParam.REDIRECT_URI}&response_type=code&scope=${
        this.wxParam.SCOPE
      }#wechat_redirect`;
      location.href = url;
    }
  },
  watch: {
    // 五棵树长得不一样 所有监听一下 push不同的树
    treenum(newval) {
      this.treebox = [];
      let arr = [TREEA, TREEB, TREEC, TREEC, TREEA];
      for (let i = 0; i < newval; i++) {
        i < 5 && this.treebox.push(arr[i]);
      }
    }
  }
};
</script>
<style scoped lang='scss'>
@import '../style/index.scss'; // 重置浏览器
</style>
