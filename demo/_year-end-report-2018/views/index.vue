<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 10:49:39
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-18 14:27:44
 * @Description: 2018年终乘车报告
-->
<template>
  <div style="background: linear-gradient(0deg, #FFF1EB 0%, #ACE0F9 100%);height:100%;">
    <!-- <div class="musicbox ani-speed" v-show="musicshow" @click="audioState" :class="!play?'no':'yes'"></div>
    <audio
      src="http://111.202.85.145/amobile.music.tc.qq.com/C400002k54uD2crl9L.m4a?guid=7870216905&vkey=07D63A9138239BC4323B2434F769CFF3F0BAEFFD51743AE3D0C7AF123B331A73934CDD15225F958670AA9469488C43EA288C13D7C80657CC&uin=1281&fromtag=66"
      ref="player"
    ></audio>-->
    <h5 class="portrait" v-show="portrait">请刷新后竖屏观看</h5>
    <full-page :options="options" id="fullpage" ref="fullpage" v-show="!portrait">
      <!-- @loadingend="musicshow = true" -->
      <part1 :prograss="prograss" @handlegopart="handleGoPart2"/>
      <part2 :val="userarr.userId" v-if="show"/>
      <part3 :val="userarr.register_dt" v-if="show"/>
      <part4 :val="userarr.total_number" v-if="show"/>
      <part5 :val="userarr.earliest_time" v-if="show"/>
      <part6 :val="userarr.latest_time" v-if="show"/>
      <part7 :val="userarr.station_list" v-if="show"/>
      <part8 :val="userarr.total_mileage" :val1="userarr.mileage_to_value" v-if="show"/>
      <share :keyword="userarr.keyword" v-if="show"/>
      <part9 v-if="!show"/>
    </full-page>
    <login-in
      :isKeep="isKeep"
      :loginErrInfo="loginErrInfo"
      @watchIsKeep="watchIsKeep"
      @WeChatWebLoginAgain="WeChatWebLoginAgain"
      ref="loginbox"
    ></login-in>
  </div>
</template>

<script>
import {
  getUserId,
  share,
  setRightButton,
  goLogin,
  exitBrowser
} from 'rpjssdk'; // 获取信息
import shareWx from '@/mixins/shareWx';
import api from '@/lib/api-yearewport.js';
import { getParmas } from '@/lib/utils.js';
import { WXAPPID } from '@/lib/consts';
import Cookies from 'js-cookies';
export default {
  mixins: [shareWx],
  data() {
    return {
      userId: '', // 用户idw
      show: false, // 暂无信息开关
      // play: false, // 音乐播放开关
      // musicshow: false, // 显示活动页展示音乐图标开关
      prograss: null, // 接口完成给loading回调
      pagenum: 0, // 埋点用户翻看几页
      wxParam: {
        // 微信授权配置
        APPID: WXAPPID,
        REDIRECT_URI: encodeURIComponent(location.href),
        SCOPE: 'snsapi_userinfo'
      },
      portrait: false, // 横竖屏控制
      wxTooken: '', // 微信分享
      loginErrInfo: {}, // 微信未关联返错信息
      isKeep: false, // 微信是否打开登陆
      userarr: {}, // 用户信息
      options: {
        // 插件参数
        menu: '#menu',
        onLeave: this.onLeave,
        anchors: [
          'part1',
          'part2',
          'part3',
          'part4',
          'part5',
          'part6',
          'part7',
          'part8',
          'part9',
          'share'
        ],
        recordHistory: false // 不让浏览器记录翻页
      }
    };
  },
  created() {
    window.location.hash = '';
    setRightButton({
      title: '分享',
      eventId: 'eventId'
    });
    this.$nextTick(() => {
      this.stopSetAllowScrolling();
    });
    this.$jice.track('pageview', {
      title: 'A1',
      url: '年底账单',
      category: '营销活动页'
    });
    if (this.$wxBrowser === 'weixin') {
      this.wxTooken = Cookies.getItem('wxTooken');
      if (this.wxTooken) {
        this.getReport();
      } else {
        if (location.search && getParmas().code) {
          this.WeChatWebLogin();
        } else {
          this.fetchAuthAllow();
        }
      }
      let mql = window.matchMedia('(orientation: portrait)');
      // 打印日志
      this.handleOrientationChange(mql);
      // 监听屏幕模式的变化
      mql.addListener(this.handleOrientationChange);
      // this.demo();
    }
    if (this.$wxBrowser === 'yitongxing') {
      this.getMain(); // app页面加载
      // this.demo();
    }
  },
  mounted() {
    document.addEventListener('eventId', () => {
      share({
        type: 3,
        title: '2018，你的易通行年度出行报告',
        desc: '点击查看你的易通行报告，生成专属年度关键词。',
        link: location.href,
        channel: this.$shareWay,
        iconUrl:
          'https://static.ruubypay.com/activities-v2/images/share/2018-year-report/icon.jpg'
      });
    });
  },
  methods: {
    handleOrientationChange(mql) {
      if (mql.matches) {
        this.portrait = false;
        setTimeout(() => {
          this.$refs.fullpage.build(); // 滚动效果
          if (
            window.location.hash === '#part1' ||
            window.location.hash === '' ||
            window.location.hash === '#part9'
          ) {
            this.stopSetAllowScrolling(false);
          } else {
            this.stopSetAllowScrolling(true);
          }
        }, 100);
      } else {
        this.portrait = true;
      }
    },
    setTooken(name, value, expire) {
      // 存cookie
      Cookies.setItem(name, value, expire);
    },
    getMain() {
      getUserId()
        .then(res => {
          this.userId = res;
          this.getReport();
        })
        .catch(() => {
          this.goLoginMain();
        });
    },
    watchIsKeep() {
      // 关闭蒙层
      this.isKeep = false;
      window.scroll(0, 0);
      this.$nextTick(() => {
        this.$refs.fullpage.build(); // 滚动效果
        this.stopSetAllowScrolling();
      });
    },
    goLoginMain() {
      // 未登录调登录
      goLogin()
        .then(res => {
          this.userId = res;
          this.getReport();
        })
        .catch(() => {
          exitBrowser();
        });
    },
    WeChatWebLoginAgain(linkParam) {
      // 用户中心登陆接口
      this.WeChatWebLogin(linkParam);
    },
    WeChatWebLogin(linkParam) {
      // 用户中心登陆接口
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
      api
        .WeChatWebLogin(loginParams)
        .then(res => {
          // 注册过易通行
          this.isKeep = false;
          let time = new Date();
          time.setTime(time.getTime() + res.expire * 1000);
          this.setTooken('wxTooken', res.token, time);
          this.setTooken('userID', res.userID, Infinity);
          this.userID = res.userID;
          this.wxTooken = res.wxTooken;
          this.getReport();
          this.$refs.loginbox.resetphone();
        })
        .catch(err => {
          // 没注册过返临时id，mac，填写手机号再调该接口
          this.isKeep = true;
          if (err.resCode == 'A240') {
            this.loginErrInfo = err.resData;
          } else {
            this.$toast.show({
              message: err.resMessage,
              duration: 1000
            });
          }
        });
    },
    getReport() {
      // 获取年度报告
      // userId	用户ID（第n个加入）
      // register_dt	注册时间
      // total_number	乘车次数（配对记录）
      // earliest_time	最早进站时间（比对每天第一次进站时间）
      // latest_time	最晚进站时间（比对每天第一次进站时间）
      // station_list	去过的车站集合(进站车站+出站车站)
      // station_name	车站名称
      // number	Number	去过次数
      // station_id	车站ID
      // total_mileage	Number	总里程
      // mileage_to_value	 几个北京城绕xx多少圈
      // keyword	年度关键词
      let thing = '';
      let arr = {};
      if (this.$wxBrowser === 'weixin') {
        thing = api.wxgetYearlyReport;
        arr.userId = Cookies.getItem('userID');
        arr.token = Cookies.getItem('wxTooken');
      } else {
        thing = api.getYearlyReport;
        arr.userId = this.userId.userId;
      }
      thing(arr)
        .then(res => {
          let noshowval = ['NOT_REALNAME', 'EMPTY_RECORD', 'NOT_OPEN_QR'];
          if (res.total_number < 6 || noshowval.includes(res.status)) {
            this.show = false;
          } else {
            this.show = true;
            this.userarr = res;
          }
          this.prograss = 100;
          this.$nextTick(() => {
            this.$refs.fullpage.build(); // 滚动效果
            this.stopSetAllowScrolling(false);
          });
        })
        .catch(() => {
          this.show = false;
          this.prograss = 100;
          this.$nextTick(() => {
            this.$refs.fullpage.build(); // 滚动效果
            this.stopSetAllowScrolling(false);
          });
        });
    },
    handleGoPart2() {
      // 点击到第二张
      this.stopSetAllowScrolling(true); // 开启翻屏动画
      this.$refs.fullpage.api.moveSectionDown(); // 滚动效果
      // this.audioState(); // 开始音频
    },
    stopSetAllowScrolling(val) {
      this.$refs.fullpage.api.setAllowScrolling(val); // 开启翻屏动画
    },
    onLeave(a, b, c) {
      // 埋点 区分用户查看了活动几页
      let num = b.anchor.split('part')[1];
      if (num > this.pagenum) {
        this.pagenum = num;
        this.$jice.track('click35', {
          label: num
        });
      }
      // 第二页回第一页关闭翻动效果只能点击跳
      if (a.anchor === 'part2' && c === 'up') {
        this.stopSetAllowScrolling(false);
      }
      if (this.show === false && b.anchor === 'part2') {
        this.$jice.track('pageview', {
          title: 'A1',
          url: '年底账单活动-未使用二维码业务页面',
          category: '营销活动页'
        });
      }
      if (b.anchor === 'part9') {
        this.stopSetAllowScrolling(false);
      }
    },
    fetchAuthAllow() {
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.wxParam.APPID
      }&redirect_uri=${this.wxParam.REDIRECT_URI}&response_type=code&scope=${
        this.wxParam.SCOPE
      }#wechat_redirect`;
      location.href = url;
    }
    // demo() {
    //   setTimeout(() => {
    //     // 本地开发使用
    //     this.userarr = {
    //       earliest_time: '2018-11-28 06:32:22',
    //       keyword: '听说你住得有点远',
    //       latest_time: '2018-11-14 22:03:52',
    //       mileage_to_value: 14.66,
    //       register_dt: '2018-07-13 19:05:11',
    //       station_list: [
    //         {
    //           number: 1,
    //           station_id: '150996281',
    //           station_name: '磁器口'
    //         },
    //         {
    //           number: 2,
    //           station_id: '150996281',
    //           station_name: '磁器口'
    //         },
    //         {
    //           number: 3,
    //           station_id: '150996281',
    //           station_name: '磁器口4'
    //         },
    //         {
    //           number: 5,
    //           station_id: '150996281',
    //           station_name: '磁器口5'
    //         }
    //       ],
    //       status: '',
    //       total_mileage: 2814,
    //       total_number: 111,
    //       userId: 1000523
    //     };
    //     this.show = true;
    //     this.prograss = 100;
    //     this.$nextTick(() => {
    //       this.$refs.fullpage.build(); // 重新构建插件
    //       this.stopSetAllowScrolling(); // 滚动效果
    //     });
    //   }, 1000);
    // }
    // audioState() {
    //   this.play = !this.play; // 更改播放暂停按钮状态
    //   const music = this.$refs.player; // 音频所在对象
    //   if (this.play) {
    //     music.play(); // 播放音乐
    //   } else {
    //     music.pause(); // 暂停音乐
    //   }
    // }
  }
};
</script>
