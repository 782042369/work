<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-24 11:11:49
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-03 11:05:38
 * @Description: part7
-->
<template>
  <div class="section">
    <div id="main" ref="main">
      <wordcloud
        :color="color"
        :data="chezhanarr"
        :fontSize="[11, 22]"
        :rotate="{from: 0, to: 90}"
        :wordPadding="2"
        nameKey="station_name"
        valueKey="number"
      ></wordcloud>
    </div>
    <p class="txtbox">
      <em>这一年你去过<span>{{chezhanlength}}</span>站</em>
      <em>有<span>{{370 - chezhanlength}}</span>站你还未去过</em>
      <em>北京很大，还有很多需要你探索的地方</em>
    </p>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud';
export default {
  props: {
    val: Array // 去过车站
  },
  data() {
    return {
      chezhanarr: [], // 去过的车站只保存前20
      chezhanlength: null, // 去过多少站
      color: ['#2E6EA3'],
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    };
  },
  components: {
    wordcloud
  },
  created() {
    let brr = this.val.sort((a, b) => b.number - a.number);
    this.chezhanlength = brr.length;
    this.chezhanarr = brr.splice(0, 20);
  }
};
</script>
