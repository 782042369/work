<!--
 * @Author: yanghognxuan
 * @Date: 2018-12-03 10:49:39
 * @LastEditors: yanghognxuan
 * @LastEditTime: 2019-01-22 10:35:41
 * @Description: 流浪地球
-->
<template>
  <div class="warp">
    <portrait-page/>
    <loading :prograss="prograss" v-if="prograss !== 100"/>
    <pagebox :pagenum="pagenum" v-else/>
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
import { DOWNLOAD_APP } from '@/lib/consts'; // 下载页面
export default {
  mixins: [shareWx],
  data() {
    return {
      pagenum: 11, // 屏幕数
      wxShareParams: {
        title: '10元观影券0.45元购福利邀请',
        desc: '内含10元观影券，不限影院，不限场次，全国通用。',
        imgUrl:
          'https://static.ruubypay.com/activities-v2/images/share/the-wandering-earth/icon.jpeg',
        link: location.href
      },
      prograss: 0, // 图片完成给loading回调
      option: [
        '/earth-1.png',
        '/earth-3.png',
        '/earth-4.png',
        '/earth-ball.png',
        '/earth-bg.jpg',
        '/earth-haibao.jpeg',
        '/earth-title.png'
      ]
    };
  },
  created() {
    if (this.$wxBrowser === 'none') {
      window.location.href = DOWNLOAD_APP;
    }
    setRightButton({
      title: '分享',
      eventId: 'eventId'
    });
    this.$jice.track('pageview', {
      title: 'A1',
      url: '流浪地球',
      category: '营销活动页'
    });
    if (this.$wxBrowser === 'yitongxing') {
      this.getMain();
    }
  },
  mounted() {
    // 分享
    document.addEventListener('eventId', () => {
      share({
        type: 3,
        title: '10元观影券0.45元购福利邀请',
        desc: '内含10元观影券，不限影院，不限场次，全国通用。',
        link: location.href,
        iconUrl:
          'https://static.ruubypay.com/activities-v2/images/share/the-wandering-earth/icon.jpeg'
      });
    });
    var ios = navigator.userAgent.indexOf('iphone'); //判断是否为ios
    if (ios == -1) {
      //ios下运行
      this.iosTrouchFn(); //你需要滑动的dom元素
    }
    this.imgloading();
  },
  methods: {
    // 资源预加载
    imgloading() {
      let that = this,
        currentIndex = 0;
      for (let i = 0; i < this.option.length; i++) {
        var url =
          'https://static.ruubypay.com/activities-v2/images/the-wandering-earth' +
          this.option[i];
        var image = new Image();
        image.onload = function() {
          currentIndex++;
          currentIndex === that.option.length && (that.prograss = 100);
        };
        image.src = url;
      }
    },
    getMain() {
      getUserId()
        // .then(res => {
        //   localStorage.setItem('mallStorage', res.userId);
        // })
        .catch(() => {
          this.goLoginMain();
        });
    },
    // 未登录调登录
    goLoginMain() {
      goLogin()
        // .then(res => {
        //   localStorage.setItem('mallStorage', res.userId);
        // })
        .catch(() => {
          exitBrowser();
        });
    },
    //  禁止ios 默认上下弹簧效果
    iosTrouchFn(el) {
      document.body.addEventListener(
        'touchmove',
        function(e) {
          if (!e.isSCROLL) {
            e.preventDefault(); //阻止默认事件(上下滑动)
          } else {
            //需要滑动的区域
            var top = el.scrollTop; //对象最顶端和窗口最顶端之间的距离
            var scrollH = el.scrollHeight; //含滚动内容的元素大小
            var offsetH = el.offsetHeight; //网页可见区域高
            var cScroll = top + offsetH; //当前滚动的距离
            //被滑动到最上方和最下方的时候
            if (top == 0) {
              top = 1; //0～1之间的小数会被当成0
            } else if (cScroll === scrollH) {
              el.scrollTop = top - 0.1;
            }
          }
        },
        { passive: false }
      ); // passive防止阻止默认事件不生效
    }
  }
};
</script>
