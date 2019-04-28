let utils = {
  sessionId: function (sessionId) {
    if (sessionId !== undefined) {
      sessionStorage.setItem('sessionId', sessionId)
    } else {
      return sessionStorage.getItem('sessionId')
    }
  },
  /**
   * @description 深拷贝
   * @param source
   * @returns {{}}
   */
  deepCopy: function (source) {
    let result = {}
    for (let key in source) {
      result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key]
    }
    return result
  },
  /**
   * @description 获取url参数
   * @param name
   * @returns {*}
   */
  getQueryStringHr: function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r === null) {
      let reg2 = /^.*?[?]/
      let r2 = window.location.hash.replace(reg2, '')
      r = r2.match(reg)
    }

    if (r != null) return decodeURIComponent((r[2]))
    return null
  },
  /**
  * yanghongxuan 
  * param url
  * @功能: 获取url参数
  */
  getURLParameters: function (url) {
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => {
      return a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a;
    }, {});
  },
  /**
   * 时间戳转为格式化时间
   * formats格式包括
  　　1. Y-M-D
  　　2. Y-M-D h:m:s
  　　3. Y年M月D日
  　　4. Y年M月D日 h时m分
  　　5. Y年M月D日 h时m分s秒
  　　示例：console.log(formatDate(1500305226034, 'Y年M月D日 h:m:s')) ==> 2017年07月17日 23:27:06
   */
  formatDate: function (timestamp, formats) {
    formats = formats || 'Y-M-D';
    let myDate = timestamp ? new Date(timestamp) : new Date();
    let year = myDate.getFullYear();
    let month = formatDigit(myDate.getMonth() + 1);
    let day = formatDigit(myDate.getDate());
    let hour = formatDigit(myDate.getHours());
    let minute = formatDigit(myDate.getMinutes());
    let second = formatDigit(myDate.getSeconds());
    return formats.replace(/Y|M|D|h|m|s/g, function (matches) {
      return ({
        Y: year,
        M: month,
        D: day,
        h: hour,
        m: minute,
        s: second
      })[matches];
    });
    // 小于10补0
    function formatDigit(n) {
      return n.toString().replace(/^(\d)$/, '0$1');
    };
  },
  setCookie: function (name, value)//两个参数，一个是cookie的名字，一个是值
  {
    let Days = 30; //此 cookie 将被保存 30 天
    let exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=77tianqi.com;"
  },
  //读取cookies 
  getCookie: function (name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;

  },
  //删除cookies 
  delCookie: function (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  // 匹配国内电话号码 移动电话
  checkMobile: function (str) {
    if (!(/^1[3|5|8][0-9]\d{4,8}$/.test(str))) {
      return false;
    }
    return true;
  },
  // 判断输入是否是有效的电子邮件
  isemail: function (str) {
    let result = str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    if (result == null) return false;
    return true;
  },
  // 匹配国内电话号码（0511-4405222 或 021-87888822)
  istell: function (str) {
    let result = str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
    if (result == null) return false;
    return true;
  },
  /*
    检测密码强度
*/
  checkPwd(str) {
    var Lv = 0;
    if (str.length < 6) {
      return Lv
    }
    if (/[0-9]/.test(str)) {
      Lv++
    }
    if (/[a-z]/.test(str)) {
      Lv++
    }
    if (/[A-Z]/.test(str)) {
      Lv++
    }
    if (/[\.|-|_]/.test(str)) {
      Lv++
    }
    return Lv;
  }

}
export default utils
