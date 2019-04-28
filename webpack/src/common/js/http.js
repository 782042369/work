/*
 * @Author: yanghongxuan 
 * @Date: 2018-03-29 11:02:59 
 * @功能:   yanghongxuan 
 * @最后修改时间: 2018-03-29 11:02:59 
 */

import 'babel-polyfill';
/*
 * AJAX格式化参数
 */
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  return arr.join("&");
}
/*
 * 原生AJAX请求封装
 */
function ajax(options) {
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  options.contentType = options.contentType || "application/x-www-form-urlencoded";
  let params = options.data;
  let xhr = "";
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else { // IE6及其以下版本浏览器
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(JSON.parse(xhr.responseText));
      } else {
        options.error && options.error(status);
      }
    }
  }
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + formatParams(params), true);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, true);
    xhr.setRequestHeader("Content-Type", options.contentType);

    if(options.contentType.indexOf('json') >= 0){
      params = JSON.stringify(params);
    } else {
      params = formatParams(params);
    }

    xhr.send(params);
  }
}

const httpServer = (opts, data) => {
  const http = 'http://172.28.50.186:8082/portal/';
  // const http = "";
  let promise = new Promise(function (resolve, reject) {
    ajax({
      type: opts.method,
      data: data,
      url: http + opts.url,
      dataType: 'json',
      contentType: opts.contentType,
      success: function (d) {
        resolve(d);
      },
      error: function (e) {
        reject(e);
      }
    });

  });
  return promise;
};
export default httpServer;