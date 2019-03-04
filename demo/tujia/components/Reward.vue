<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 19:11:08
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-10 10:17:29
 * @Description: 中奖情况
-->
<template>
  <ul class="reward mainbox">
    <template v-if="coupons && coupons.length>0">
      <li :key="index" class="has" v-for="(item,index) in coupons">
        <p>
          <span v-if="item.couponType===1">94折券</span>
          <span v-if="item.couponType===2">50元优惠券</span>
          <span v-if="item.couponType===3">100元优惠券</span>
          <em v-if="item.couponType===1">国内外通用</em>
          <em v-else>限国外通用</em>
          <i>兑换有效期至2019年2月28日</i>
        </p>
        <button @click="handleLook(item.couponCode)">查看</button>
      </li>
    </template>
    <li class="noway" v-else>您还没有获得宝箱，请继续努力</li>
  </ul>
</template>

<script>
export default {
  props: {
    coupons: Array // 激活对优惠券
  },
  methods: {
    handleLook(val) {
      // 查看优惠券
      this.$emit('look', val);
    }
  }
};
</script>
