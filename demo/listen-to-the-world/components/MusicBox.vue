<!--
 * @Author: yanghognxuan
 * @Date: 2019-01-28 14:52:14
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-02-12 13:49:37
 * @Description: 播放音乐
-->
<template>
  <ul class="music-box">
    <template v-for="(item,index) in videoslist">
      <li :class="{active : index===activemusic}" :key="index" @click="handleOpenMusic(index)">
        <img :src="item.image" alt>
        <audio
          :src="item.video"
          @canplay="canplay(index, $event)"
          @timeupdate="onTimeupdate"
          class="player"
        ></audio>
        <div :class="!play?'no':'yes'" @click="musicFlag(index)" class="music-mask">
          <svg>
            <defs>
              <linearGradient id="linear" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="10%" stop-color="#FFF4DB"></stop>
                <stop offset="100%" stop-color="#AC8964"></stop>
              </linearGradient>
            </defs>
            <circle
              cx="22"
              cy="22"
              fill="transparent"
              r="20"
              stroke="url(#linear)"
              stroke-width="2"
            ></circle>
          </svg>
          <p>{{nowaudiotxt}}/{{audiotxt[index]}}</p>
          <span></span>
          <em></em>
        </div>
        <p>{{item.desc}}</p>
      </li>
    </template>
  </ul>
</template>

<script>
import { pageVisibility } from '../tool';
export default {
  props: {
    videoslist: Array // 音频列表
  },
  data() {
    return {
      activemusic: null, // 激活音乐盒
      play: false,
      audiotxt: [], // 总进度
      nowaudiotxt: '00:00', //当前进度
      musicflag: true // 领取奖励开关
    };
  },
  created() {
    for (let i = 0; i < this.videoslist.length; i++) {
      this.audiotxt.push('00:00');
    }
  },
  mounted() {
    this.bindVisibilityChangeEvent();
  },
  methods: {
    handleOpenMusic(num) {
      this.$jice.track('click45', { title: num });
      const music = document.querySelectorAll('.player'); // 音频所在对象
      if (this.activemusic !== num) {
        this.nowaudiotxt = '00:00'; // 重置进度
        this.activemusic !== null && music[this.activemusic].pause(); // 暂停前一个音乐
        // http://www.cnblogs.com/RuMengkai/p/9923680.html 微信中遇到的IOS获取不到duration
        music[num].play(); // 开启点击的音乐
        this.play = true;
      }
      this.activemusic = num;
    },
    canplay(res, $event) {
      this.audiotxt[res] = this.secondToMin($event.target.duration);
    },
    secondToMin(s) {
      var MM = Math.floor(s / 60);
      var SS = s % 60;
      if (MM < 10) MM = '0' + MM;
      if (SS < 10) SS = '0' + SS;
      var min = MM + ':' + SS;
      return min.split('.')[0];
    },
    onTimeupdate($event) {
      this.nowaudiotxt = this.secondToMin($event.target.currentTime);
      if ($event.target.currentTime > 30 && this.musicflag) {
        this.$emit('getStatus', 2);
        this.musicflag = false;
      }
    },
    bindVisibilityChangeEvent() {
      pageVisibility.visibilitychange(() => {
        this.visibilityChangeHandler(pageVisibility.hidden);
      });
    },
    visibilityChangeHandler(hidden) {
      // 音频所在对象
      const music = document.querySelectorAll('.player');
      // 切换页面后 暂停音乐
      if (hidden && this.activemusic !== null) {
        music[this.activemusic].pause();
        this.activemusic = null;
        this.play = !this.play;
      }
    },
    musicFlag(num) {
      this.play = !this.play;
      const music = document.querySelectorAll('.player'); // 音频所在对象
      if (this.play) {
        music[num].play(); // 播放音乐
      } else {
        music[num].pause(); // 暂停音乐
      }
    }
  }
};
</script>
