<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 10:49:39
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-10 10:18:24
 * @Description: 途家活动页面
-->
<template>
  <div>
    <div class="banner">
      <img alt src="../images/tujiabanner.png">
    </div>
    <div id="box">
      <find-key @handleGo="handleGo"/>
      <h5 class="shadowbox">
        <span>集齐钥匙可打开宝箱</span>
      </h5>
      <key-box :ketlist="ketlist" :keynum="keynum"></key-box>
      <h5 class="shadowbox"></h5>
      <reward :coupons="coupons" @look="handleLook"/>
      <h5 class="shadowbox">活动规则</h5>
      <div class="rule mainbox">
        <p>1、易通行用户均可参与本次活动；</p>
        <p>2、活动时间：2019年1月10日-2019年1月24日；</p>
        <p>3、可通过找钥匙直接获得优惠券或集齐金、银、铜3把钥匙解锁途家民宿优惠券；</p>
        <p>4、券兑换截止日期：2019年2月28日；</p>
        <p>5、兑换方式：复制兑换码，至“途家”App【我的】→【红包】点击“兑换红包”兑换；</p>
        <p>6、优惠券不兑现，过期自动作废，使用详情请至途家APP或官网查看。</p>
      </div>
      <tj-dailog
        :couponCode="couponCode"
        :dialognum="dialognum"
        :dialogopen="dialogopen"
        :gohref="gohref"
        :list="dialoglist"
        :ZJimgsrc="zjimgsrc"
        @choose="handleChoose"
        @handleClose="handleClose"
      ></tj-dailog>
    </div>
  </div>
</template>
<script>
import { getUserId, share, toast, setRightButton, goLogin } from 'rpjssdk'; // 获取信息
import JYS from '../images/tujiajys.png'; // 收集钥匙 金
import YYS from '../images/tujiayys.png'; // 收集钥匙 银
import TYS from '../images/tujiatys.png'; // 收集钥匙 铜
import NOKEY from '../images/nokey.png'; // 收集钥匙 暂无
import TKEY from '../images/tujiadiat.png'; // 点击挖宝 中奖 钥匙 铜
import YKEY from '../images/tujiadiay.png'; // 点击挖宝 中奖 钥匙 银
import JKEY from '../images/tujiadiaj.png'; // 点击挖宝 中奖 钥匙 金
export default {
  data() {
    return {
      keynum: 0, // 打开几个宝箱
      dialogopen: false, // 弹窗
      dialognum: null, // 弹窗显示 0 没中 123 得钥匙 4 激活优惠券 5 兑换优惠券
      userId: '', // 用户id
      couponCode: null, // 用户选择查看 券
      coupons: [], // 券列表
      gohref: '', // 活动地址
      zjimgsrc: '', // 抽到钥匙的图片
      choosenum: null, // 要激活对优惠券
      dialoglist: [
        {
          name: '94折券',
          type: 1,
          zything: [
            '1.国内外通用',
            '2.兑换有效期至2019年2月28日',
            '3.最高可一次抵扣500元'
          ]
        },
        {
          name: '50元优惠券',
          type: 2,
          zything: ['1.限国外通用', '2.兑换有效期至2019年2月28日']
        },
        {
          name: '100元优惠券',
          type: 3,
          zything: ['1.限国外通用', '2.兑换有效期至2019年2月28日']
        }
      ], // 优惠券信息
      ketlist: [
        {
          name: '铜',
          imgsrc: NOKEY
        },
        {
          name: '银',
          imgsrc: NOKEY
        },
        {
          name: '金',
          imgsrc: NOKEY
        }
      ] // 我的钥匙盒
    };
  },
  created() {
    // jice 途家活动
    setRightButton({
      title: '分享',
      eventId: 'eventId'
    });
    this.$jice.track('pageview', {
      title: 'A1',
      url: '途家活动'
    });
    this.getMain(); // 进入页面获取用户id
  },
  mounted() {
    // 分享
    document.addEventListener('eventId', () => {
      // 途家活动-点击分享
      this.$jice.track('click31', {
        title: '送你一份旅行大礼'
      });
      share({
        type: 1,
        iconUrl:
          'https://static.ruubypay.com/activities-v2/images/share/tujiaicon.png',
        imageUrl:
          'https://static.ruubypay.com/activities-v2/images/share/tujiashare.png'
      });
    });
  },
  methods: {
    async getMain() {
      this.userId = await getUserId();
      this.getList();
    },
    goLogin() {
      goLogin()
        .then(res => {
          this.userId = res;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      this.$API
        .main({
          userId: this.userId.userId
        })
        .then(res => {
          this.keynum = res.boxNumber;
          if (res.isWin || res.stage === 3) {
            // isWin 为true 代表有券没有激活
            // res.stage === 3 代表凑够了钥匙可以激活
            // 有优惠券没有去激活得
            this.dialogopen = true;
            this.dialognum = 4;
          }
          this.gohref = res.tjUrl;
          this.coupons = res.coupons;
          // 钥匙收集阶段 0无 1铜  2铜 银  3铜 银 金
          const actions = {
            '1': [TYS],
            '2': [TYS, YYS],
            '3': [TYS, YYS, JYS],
            '0': [NOKEY, NOKEY, NOKEY]
          };
          actions[res.stage].forEach((element, index) => {
            this.ketlist[index].imgsrc = element;
          });
        })
        .catch(res => {
          toast({
            content: res.resMessage
          });
        });
    },
    async handleGo() {
      // jice途家活动-点击地图
      this.$jice.track('click32');
      /** 抽奖 结果 0无 1铜 2银 3金 4中奖 动画执行1600ms */
      try {
        this.userId = await getUserId();
        await this.$API
          .apply({
            userId: this.userId.userId
          })
          .then(res => {
            this.dialogopen = true;
            this.dialognum = res.result;
            if (res.result !== 0) {
              this.zjimgsrc = {
                '3': JKEY,
                '2': YKEY,
                '1': TKEY
              }[res.result];
            }
          })
          .catch(res => {
            toast({
              content:
                res.resCode === 'A078' ? '今日机会已用完' : res.resMessage
            });
          });
      } catch (err) {
        this.goLogin();
      }
    },
    handleLook(val) {
      // 查看优惠券信息 jice途家活动-点击优惠券查看
      this.$jice.track('click29');
      this.couponCode = val;
      this.dialogopen = true;
      this.dialognum = 5;
    },
    handleChoose(val) {
      // 选择 优惠券信息
      this.choosenum = val;
    },
    handleClose() {
      // 关闭弹窗 dialognum=== 4 代表有激活对优惠券 调用 兑换接口
      if (this.dialognum === 4 && this.choosenum !== null) {
        this.handleexchange();
      } else {
        this.dialogopen = false;
        this.getList();
      }
    },
    handleexchange() {
      this.$API
        .exchange({
          userId: this.userId.userId,
          type: this.choosenum
        })
        .catch(res => {
          this.dialogopen = false;
          toast({
            content: res.resMessage
          });
        })
        .then(res => {
          this.getList();
          this.dialogopen = false;
          console.log(res);
        });
    }
  }
};
</script>
