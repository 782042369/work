<!--
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 坐地铁，让地球更绿弹窗
 * @Date: 2019-02-27 17:36:48
 * @LastEditTime: 2019-03-22 20:12:32
-->
<template>
  <div class="dialog">
    <!-- 规则 -->
    <div class="rule" v-if="dislogstatus === 0">
      <a href="javascript:;">活动规则</a>
      <div class="txtbox">
        <p :key="index" v-for="(item,index) in rulejson">{{item.p}}</p>
      </div>
      <a @click="handleCloseDialog" href="javascript:;">确定</a>
    </div>
    <!-- 弹窗提醒 -->
    <div class="dialog-title" flex="main:between cross:center dir:top" v-if="dislogstatus === 1">
      <h5>{{dislogstxt ===0 ? '点击“种树苗”得积分及树苗兑换二维码' : '悄悄告诉你100积分在商城可当1元钱来花！'}}</h5>
      <h6>{{dislogstxt ===0 ? '去“种树记录”兑换实体树' : '参与“种树苗”获得现金积分'}}</h6>
      <button @click="handleCloseDialog(61)" v-if="dislogstxt ===0">知道了</button>
      <button @click="handleJoin(6)" v-if="dislogstxt ===1">捡便宜</button>
      <img
        @click="handleCloseDialog"
        class="close"
        src="../images/close.png"
        v-show="dislogstxt ===1"
      >
    </div>
    <!-- 恭喜你 -->
    <div class="winning" flex="dir:top" v-if="dislogstatus === 2">
      <img alt src="../images/winning.png">
      <h5>
        获得
        <span>{{jifenCount}}</span>
        积分
        <br>1棵
        <span>柠条</span> 兑换二维码
      </h5>
      <img :src="qrImgUrl" alt>
      <p>树苗兑换步骤</p>
      <p>
        1.
        <span>截图保存</span>至相册
      </p>
      <p>2.用微信“扫一扫”扫描二维码，参与种树</p>
      <img @click="handleCloseDialog" class="close" src="../images/close.png">
    </div>
    <!-- 无库存 -->
    <div
      class="dialog-title nodata"
      flex="main:between cross:center dir:top"
      v-if="dislogstatus === 3"
    >
      <h5>{{dislogstxt ===2 ? '您的树苗已种完，去“种树记录”兑换实体树' : '活动树苗已种完，去兑换实体树'}}</h5>
      <button @click="handelReceivingRecords">去兑换</button>
      <img @click="handleCloseDialog" class="close" src="../images/close.png">
    </div>
    <!-- 幸运 -->
    <!-- <div class="lucky" flex="cross:center dir:top" v-if="dislogstatus === 3">
      <img alt src="../images/lucky.png">
      <h5>
        成功种下树苗并获得
        <br>
        <span>{{jifenCount}}积分和</span>
        <br>一棵
        <span>柠条</span> 兑换二维码
      </h5>
      <button @click="handleJoin(7)">捡便宜</button>
      <button @click="handleLookCode(63)">查看兑换二维码</button>
      <h6>继续参与种树，得大额现金积分
        <br>柠条兑换码可在活动主页“记录”中查看
      </h6>
      <img @click="handleCloseDialog" class="close" src="../images/close.png">
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    dislogstatus: Number, // 0 规则 1 树苗 积分提醒弹窗  2恭喜你 3 幸运
    dislogstxt: Number, // 0树苗 1积分弹窗提示
    jifenCount: Number, // 获取积分
    qrImgUrl: String // 树苗地址
  },
  data() {
    return {
      btndisabled: true, // 按钮禁用
      rulejson: [
        { p: '1、易通行用户均可参与本次活动；' },
        { p: '2、活动时间：2019年3月12日-2019年4月12日；' },
        {
          p:
            '3、用户使用二维码乘地铁成功后，于次日前可得一棵树苗，在活动页面参与“种树苗”后得一棵“柠条”兑换二维码，微信扫一扫兑换实体柠条；'
        },
        {
          p:
            '4、用户参与“种树苗”即有机会获得5-500积分，每个用户获取积分上限为5000；'
        },
        {
          p:
            '5、积分可在易通行App首页“捡便宜”商城使用，按“100积分=1元”比例进行抵扣，可购买商城中的商品，如积分不够，可用现金补足差额；'
        },
        { p: '6、树苗种植成功以生成兑换二维码为准，树苗有限，种完为止；' },
        { p: '7、已种下的树苗，可在活动页面“记录”中查看；' },
        { p: '8、积分使用有效期至2019年12月31日23:59；' },
        { p: '9、活动最终解释权归易通行所有。' }
      ]
    };
  },
  methods: {
    // 关闭弹窗
    handleCloseDialog(jicenum) {
      jicenum === 61 && this.$jice.track('click61');
      this.$emit('handleCloseDialog');
    },
    // 打开商品页 location:入口来源（7 积分icon弹窗 6树苗成功弹窗）
    handleJoin(num) {
      this.$jice.track('click60', {
        location: num === 7 ? '积分icon弹窗' : '树苗成功弹窗'
      });
      this.$emit('handleJoin', num);
    },
    // 查看领取记录
    handelReceivingRecords() {
      this.$router.push({ path: 'receiving-records' });
    },
    // 查看二维码
    handleLookCode(jicenum) {
      jicenum === 62 && this.$jice.track('click62');
      jicenum === 63 && this.$jice.track('click63');
      this.$emit('handleLookCode');
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../style/dialog.scss'; // 弹窗
</style>
