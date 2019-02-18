<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 10:49:39
 * @LastEditors: yanghognxuan
 * @Description: 途听天下
-->
<template>
  <main>
    <portrait-page v-if="wxportraitshow"/>
    <header>
      <div @click="handleLookRule">
        <span>活动规则</span>
      </div>
      <div @click="handleLookRecording">
        <span>领取记录</span>
      </div>
      <p class="left_label">
        免费领取7天会员体验卡
        <em>会员卡天数可叠加</em>
      </p>
      <div class="activity_img">
        <div>
          <a href="javascript:;">全用户可享</a>
          <a href="javascript:;">7天会员体验卡</a>
          <a
            :class="{'btndisabled': btndisabled}"
            @click="getStatus(1)"
            href="javascript:;"
          >{{ wantTxt }}</a>
        </div>
      </div>
    </header>
    <p class="left_label">
      听30s，再得3天/月会员
      <em>会员卡天数可叠加，自领取之日起自动生效。</em>
    </p>
    <music-box :videoslist="videoslist" @getStatus="getStatus"/>
    <p class="left_label">你可能喜欢</p>
    <ul class="join">
      <li @click="handleJoin(17)">
        <img src="../images/half.png">
      </li>
      <li @click="handleJoin(18)">
        <img src="../images/year.png">
      </li>
    </ul>
    <footer>
      <img alt src="../images/fuli.png">
      <img alt src="../images/more.png">
    </footer>
    <dialog-main
      :dialogbtnstatus="dialogbtnstatus"
      :dialogflag="dialogflag"
      :dialogimgsrc="dialogimgsrc"
      :dislogstatus="dislogstatus"
      :phonenum="phonenum"
      :rewardList="rewardList"
      @getReceiveReward="getReceiveReward"
      @handleCloseDialog="dialogflag = false"
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
  </main>
</template>

<script>
import { getUserId, goLogin, exitBrowser, toast } from 'rpjssdk'; // 获取信息
import shareWx from '@/mixins/shareWx';
import wxapi from '@/lib/share-wx.js';
import { browser } from '@/lib/utils';
import shareApp from '@/mixins/shareApp';
import api from '@/lib/api-listen';
import { getParmas } from '@/lib/utils';
import { WXAPPID } from '@/lib/consts';
import Cookies from 'js-cookies';
import { VUE_APP_MALL } from '@/lib/consts'; // 分享
import MONTH from '../images/month.png'; // 月卡
import SENVEN from '../images/seven.png'; // 七天
import THREE from '../images/three.png'; // 三天
import OBTAIN from '../images/obtain.png'; // 三天
import RECORDING from '../images/recording.png'; // 领取记录
import { DOWNLOAD_APP } from '@/lib/consts'; // 下载页面
export default {
  mixins: [shareWx, shareApp],
  data() {
    return {
      wxShareParams: {
        title: '戳→蜻蜓FM会员免费领',
        desc: '限时收听付费精选节目音频，领月会员。',
        imgUrl:
          'https://static.ruubypay.com/activities-v2/images/share/listen-to-the-world/icon.jpeg',
        link: location.href
      },
      shareConfig: {
        type: 3,
        title: '戳→蜻蜓FM会员免费领',
        desc: '限时收听付费精选节目音频，领月会员。',
        link: location.href,
        channel: [],
        iconUrl:
          'https://static.ruubypay.com/activities-v2/images/share/listen-to-the-world/icon.jpeg'
      },
      btndisabled: false, // 禁用按钮
      wantTxt: '我想要', // 领取七天会员文案
      dialogflag: false, // dialog 开关
      dialogimgsrc: null, // dialog 图片
      dislogstatus: null, // dialog 1领取查看 2激活 3 领取 3 30 天展示
      dialogbtnstatus: null, // dialog 1 -- 7 免费领取 2 -- 领取会员 3 -- 3 30 领取会员
      rewardList: [], // 领取列表
      wxshareguide: false, // 微信分享指导
      wxshareguidetxt: null, // 微信提示文字
      wxshow: false, // 微信微博打开
      wxportraitshow: false, // 微信ios 横竖屏提示
      phonenum: null, // 电话号
      wxParam: {
        // 微信授权配置
        APPID: WXAPPID,
        REDIRECT_URI: encodeURIComponent(location.href),
        SCOPE: 'snsapi_userinfo'
      },
      wxTooken: '', // 微信分享
      loginErrInfo: {}, // 微信未关联返错信息
      userID: '', // 用户id
      isKeep: false, // 微信是否打开登陆
      videoslist: [{}, {}, {}, {}, {}, {}, {}, {}, {}] // 音频列表
    };
  },
  created() {
    if (this.$wxBrowser === 'none') {
      window.location.href = `${DOWNLOAD_APP}?url=${location.href}`;
    }
    if (this.$wxBrowser === 'yitongxing') {
      this.getMain();
      let ua = navigator.userAgent.toLowerCase();
      // 微信 app判断
      if (ua.split('yitongxing/')[1] === '2.6.0') {
        this.shareConfig.channel = ['wechat', 'wechatTimeline'];
      } else {
        this.shareConfig.channel = ['WechatSession', 'WechatTimeLine'];
      }
    }
    if (this.$wxBrowser === 'weixin') {
      this.wxshow = true;
      this.wxTooken = Cookies.getItem('wxTooken');
      this.getWxUser();
    }
    if (browser.versions.ios && this.$wxBrowser === 'weixin') {
      this.wxportraitshow = true;
    }
    this.getVideos(); // 获取音频
    this.$jice.track('pageview', {
      title: 'A1',
      url: document.title,
      category: '营销活动页'
    });
  },
  methods: {
    // 查询app内是否登陆
    getMain() {
      getUserId()
        .then(res => {
          this.userID = res;
          this.getPhoneNum();
          this.getStatus(1, 'first');
        })
        .catch(() => {
          this.goLoginMain();
        });
    },
    // 未登录调登录
    goLoginMain() {
      goLogin()
        .then(() => {
          this.getMain();
        })
        .catch(() => {
          exitBrowser();
        });
    },
    // 获取电话号码
    getPhoneNum() {
      let arr = {};
      let thing = '';
      if (this.$wxBrowser === 'yitongxing') {
        arr.userID = this.userID.userId;
        thing = api.phonenum;
        thing(arr)
          .then(res => {
            this.phonenum = res.phoneNum;
          })
          .catch(res => {
            this.toast(res.resMessage);
          });
      }
      // else if (this.$wxBrowser === 'weixin') {
      //   arr.userID = Cookies.getItem('userID');
      //   thing = api.wxphonenum;
      // } else {
      //   return;
      // }
    },
    // 获取音频列表
    getVideos() {
      api
        .videoslist()
        .then(res => {
          this.videoslist = res.videoList;
        })
        .catch(res => {
          this.toast(res.resMessage);
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
    // 激活会员
    getReceiveReward(num) {
      let thing = '';
      let arr = {};
      if (this.$wxBrowser === 'yitongxing') {
        thing = api.receiveReward;
        arr.userId = this.userID.userId;
      } else if (this.$wxBrowser === 'weixin') {
        thing = api.wxreceiveReward;
        arr.userId = Cookies.getItem('userID');
        arr.token = Cookies.getItem('wxTooken');
      }
      arr.channel = num.channel; // 用户领取方式(1-直接领取，2-播放领取)
      arr.phone = num.phone;
      this.$loading.show();
      thing(arr)
        .then(res => {
          this.phonenum = num.phone;
          let imgsrcarr = [null, null, THREE, MONTH]; // 中奖显示图片
          let dialogtype = [2, 3]; // 中奖type
          if (dialogtype.includes(res.type)) {
            this.dialogimgsrc = imgsrcarr[res.type];
            this.dislogstatus = 3;
            this.dialogbtnstatus = 3;
            this.dialogflag = true;
          } else {
            this.toast('领取成功');
            this.getStatus(1, 'first');
          }
        })
        .catch(res => {
          this.toast(res.resMessage || '领取失败');
        })
        .finally(() => {
          this.$loading.hide();
        });
    },
    // 查询是否领取会员
    getStatus(num, flag = true) {
      let thing = '';
      let arr = {};
      if (this.$wxBrowser === 'yitongxing') {
        thing = api.qtstatus;
        arr.userId = this.userID.userId;
      } else if (this.$wxBrowser === 'weixin') {
        thing = api.wxqtstatus;
        arr.userId = Cookies.getItem('userID');
        arr.token = Cookies.getItem('wxTooken');
      }
      arr.channel = num; // 用户领取方式(1-直接领取，2-播放领取)
      thing(arr)
        .then(res => {
          console.log('getStatusre1: ', res);
          // status 用户是否领取奖励(0-未领取，1-已领取)
          if (res.status === 0 && flag !== 'first') {
            if (num === 1) {
              this.Want();
            } else {
              this.dialogimgsrc = OBTAIN;
              this.dislogstatus = 2;
              this.dialogbtnstatus = 2;
              this.dialogflag = true;
            }
          } else if (res.status === 1 && num === 1) {
            // 七天会员已经领取过
            this.wantTxt = '已领取';
            this.btndisabled = true;
          }
        })
        .catch(res => {
          console.log('getStatusre2: ', res);
          if (num === 1) {
            this.btndisabled = true;
            this.toast(res.resMessage);
          }
        });
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
          this.wxTooken = res.token;
          this.$refs.loginbox.resetphone();
          this.getStatus(1, 'first');
        })
        .catch(res => {
          // 没注册过返临时id，mac，填写手机号再调该接口
          this.isKeep = true;
          if (res.resCode == 'A240') {
            this.loginErrInfo = res.resData;
          } else {
            this.toast(res.resMessage);
          }
        });
    },
    // 我想要
    Want() {
      this.$jice.track('click46');
      if (this.$wxBrowser === 'yitongxing' || this.$wxBrowser === 'weixin') {
        this.dialogimgsrc = SENVEN;
        this.dislogstatus = 2;
        this.dialogbtnstatus = 1;
        this.dialogflag = true;
      }
    },
    // 查看领取记录
    handleLookRecording() {
      this.$jice.track('click48');
      let arr = {};
      let thing = '';
      if (this.$wxBrowser === 'yitongxing') {
        thing = api.list;
        arr.userId = this.userID.userId;
      } else if (this.$wxBrowser === 'weixin') {
        thing = api.wxlist;
        arr.userId = Cookies.getItem('userID');
        arr.token = Cookies.getItem('wxTooken');
      }
      thing(arr)
        .then(res => {
          res.rewardList && (this.rewardList = res.rewardList);
          this.dialogimgsrc = RECORDING;
          this.dislogstatus = 1;
          this.dialogflag = true;
        })
        .catch(res => {
          this.toast(res.resMessage);
        });
    },
    // 微信暂无用户
    getWxUser() {
      if (location.search && getParmas().code) {
        this.WeChatWebLogin();
      } else {
        this.fetchAuthAllow();
      }
    },
    // 查看活动规则
    handleLookRule() {
      this.$jice.track('click47');
      this.dislogstatus = 0;
      this.dialogimgsrc = null;
      this.dialogflag = true;
    },
    // 喜欢商品跳转埋点
    handleJoin(goodsid) {
      this.$jice.track('click51', { goods_title: goodsid });
      if (this.$wxBrowser === 'weixin') {
        this.wxshareguide = true;
        this.wxshareguidetxt = 2;
      }
      if (this.$wxBrowser === 'yitongxing') {
        window.location.href = `${VUE_APP_MALL}/#/goods-detail?id=${goodsid}`;
      }
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
  }
};
</script>
