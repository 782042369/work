<!--
 * @Author: yanghognxuan
 * @Date: 2019-01-14 12:35:59
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2019-02-15 17:17:30
 * @Description:3part过渡背景三个屏幕大  45 part合一因为动画 78 part合一因为动画
-->
<template>
  <div style="height:100%;position: relative;z-index: 1;">
    <div :class="!play?'no':'yes'" @click="audioState" class="musicbox" v-show="musicshow"></div>
    <audio
      ref="player"
      src="https://static.ruubypay.com/activities-v2/music/the-wandering-earth/bgm.mp3"
    ></audio>
    <div class="box" ref="movebox" style="transform: translate3d(0,0,0);">
      <part1 :class="{Load: Load===1}" class="part ani-item"/>
      <part2 :class="{Load: Load===2}" class="part ani-item"/>
      <part3 :class="{Load: Load===3 || Load===4}" class="part sun ani-item"/>
      <div class="part">
        <div :class="{Load: Load===5}" class="ani-item">
          <span>比起坐以待毙，</span>
          <span>人们选择挣扎到底。</span>
        </div>
        <div :class="{Load: Load===6}" class="ani-item">
          <span>人造环境无法承受</span>
          <span>漫长的逃脱之旅。</span>
        </div>
        <div
          :class="['plane', {'planend': !showplane, 'anipaused': paused , 'anirunning' : !paused}]"
          ref="plane"
          v-show="Load===6 || Load===5"
        ></div>
      </div>
      <part6
        :class="{'anipaused': paused , 'anirunning' : !paused,Load: Load===7,guodu: Load===7}"
        class="part ani-item"
      />
      <div class="part">
        <div :class="{Load: Load===8}" class="ani-item">
          <span>代价是高昂的。</span>
          <span>艺术、伦理、常识，</span>
          <span>一件又一件曾经</span>
          <span>无比熟悉的特色从人性中消失。</span>
          <span>疑惑和猜忌一度在人类</span>
          <span>当中引发叛乱之火</span>
          <span>然而太阳最后的灭亡瞬间</span>
          <span>平息了一切</span>
          <span>人类终于怀揣希望</span>
          <span>踏上漫长的流浪之旅。</span>
        </div>
        <div :class="{Load: Load===9}" class="ani-item">
          <span>我们要活下去</span>
        </div>
        <div :class="{Load: Load===10}" class="ani-item">
          <span>“地球啊，我的流浪地球啊。”</span>
          <span>人类挣扎到底，结局究竟如何？</span>
          <span>这一次，轮到中国人拯救地球，</span>
          <span>结局，在电影院里等你揭开！</span>
        </div>
        <div
          :class="['ball', {'ballend': !showplane, 'anipaused': paused , 'anirunning' : !paused}]"
          ref="plane"
          v-show="Load===9 || Load===10|| Load===8"
        ></div>
      </div>
      <share :class="{Load: Load===11,guodu: Load===11}" class="part ani-item"/>
    </div>
    <button class="active-btn" ref="moveright" v-show="btnremove">
      <span v-show="txtshow">“按住开始逃脱之旅”</span>
    </button>
  </div>
</template>

<script>
import { pageVisibility } from '../tool.js';
export default {
  props: {
    pagenum: Number // 屏幕数
  },
  data() {
    return {
      // active: 12, // 运行到class
      play: false, // 音乐播放开关
      musicshow: true, // 显示活动页展示音乐图标开关
      Load: 1, // 加载完class
      txtshow: true, // 提示文字
      showplane: true, // 控制飞机
      paused: true, // 控制动画
      btnremove: true // 移除按钮
    };
  },
  mounted() {
    let rollingnum = 0, // 判断下标记
      activenum = 2, // 从第二part 开始添加class
      rollingarr = [0, 0], // 判断屏幕宽度添加class
      clientWidth = document.body.clientWidth, // 一屏宽度
      otheraniarr = [6, 7, 8, 9, 5], // 特殊操作动画part
      remaining = clientWidth / 3, // 最后一 part 过度距离判断
      speed = 0;
    this.$refs.movebox.style.width = `${this.pagenum * 100}vw`; // 设置盒子宽度
    for (let i = 0; i < this.pagenum; i++) {
      rollingarr.push(clientWidth * i - clientWidth / 2);
    }
    let pagerolling = setInterval(() => {
      // 进入下一part 不需要暂时注释
      if (rollingnum > rollingarr[activenum]) {
        this.active = activenum;
      }
      // 加载完当前part
      if (rollingnum >= rollingarr[activenum + 1]) {
        this.Load = activenum;
        activenum++;
      }
      // 跳到最后part
      if (rollingnum >= (this.pagenum - 2) * clientWidth + remaining) {
        this.Load = this.pagenum;
        this.$nextTick(() => {
          this.$refs.movebox.style.transform = `translate3d(${(-this.pagenum +
            1) *
            clientWidth}px, 0, 0)`;
          this.$refs.player.pause();
          this.play = false;
          this.btnremove = false;
        });
        clearInterval(pagerolling);
        return;
      }
      // 设置停止
      // if (rollingnum === clientWidth * (this.pagenum - 1)) {
      //   clearInterval(pagerolling);
      //   this.btnremove = false;
      //   return;
      // }
      // 当i=1时右移开始
      if (speed === 1) {
        rollingnum += 1;
        // 点击开始动画 抬起关闭动画
        if (otheraniarr.includes(this.Load)) {
          // 动画开启
          this.paused = false;
        }
        this.$nextTick(() => {
          this.$refs.movebox.style.transform = `translate3d(${-rollingnum}px, 0, 0)`;
        });
      }
    }, 10);
    // 需要监听到dom
    let flag = true;
    this.$refs.moveright.addEventListener(
      'touchstart',
      () => {
        this.$jice.track('click39');
        speed = 1;
        this.txtshow = false;
        if (flag) {
          this.audioState();
          flag = false;
        }
      },
      false
    );
    // 移除长按监听
    this.$refs.moveright.addEventListener('touchend', () => {
      speed = 0;
      this.txtshow = true;
      if (otheraniarr.includes(this.Load)) {
        // 动画暂停
        this.paused = true;
      }
    });
    // 飞机动画
    let planedom = document.getElementsByClassName('plane')[0];
    let seeAnimation = () => {
      this.showplane = false;
      planedom.removeEventListener('animationend', seeAnimation, false);
    };
    planedom.addEventListener('animationend', seeAnimation, false);
    // 音乐循环播放
    this.$refs.player.addEventListener(
      'ended',
      () => {
        this.$refs.player.play();
      },
      false
    );
    this.bindVisibilityChangeEvent();
  },
  methods: {
    bindVisibilityChangeEvent() {
      pageVisibility.visibilitychange(() => {
        this.visibilityChangeHandler(pageVisibility.hidden);
      });
    },
    visibilityChangeHandler(hidden) {
      if (hidden) {
        this.$refs.player.pause();
        this.play = false;
      }
    },
    audioState() {
      this.play = !this.play; // 更改播放暂停按钮状态
      const music = this.$refs.player; // 音频所在对象
      if (this.play) {
        music.play(); // 播放音乐
      } else {
        music.pause(); // 暂停音乐
      }
    }
  }
};
</script>
