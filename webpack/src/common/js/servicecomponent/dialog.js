
let zwmask = $(`<div class='zw-mask'></div>`);
$.extend({
  /*
  * title  标题
  * content 内容
  * cancel true|false 是否显示取消按钮
  * success 点击确定的回调函数
  * width 弹框宽度
  * height 弹框高度
  * data 弹框数据
  */
  zwDialog: function (obj) {
    obj.title = obj.title || `提示`;
    let width = obj.width || 360;
    let height = obj.height || 190;
    let halfwidth = (width || 250) / 2;
    let halfheight = (height || 150) / 2;
    let data = obj.data || "";
    let body = $(`<div class='zw-popup-body' style="background: #fff;width:${width}px;height:${height}px;margin-left:-${halfwidth}px;margin-top:-${halfheight}px;"></div>`);
    let title = $(`<p class='zw-title'></p>`).html(obj.title + `<i class="zw-close"></i>`);
    let content = $(`<div class='zw-content'></div>`).html(obj.content);
    let option = $(`<div class='zw-option'><button class="zw-confirm">确定</button><button class='zw-cancel'>取消</button></div>`);
    if (!obj.cancel) {
      option.find('.zw-cancel').remove();
    }
    option.find('button').click(function () {
      if ($(this).index() == 0 && obj.success) {
        obj.success(data);
      }
      $('.zw-mask').remove();
      $('.zw-popup-body').remove();
    })
    title.find('.zw-close').click(function () {
      $('.zw-mask').remove();
      $('.zw-popup-body').remove();
    })  
    body.append(title).append(content).append(option);
    $('body').append(zwmask).append(body);
  },
  /*
  * time 关闭时间
  * content 内容
  */
  zwMsg: function (obj) {
    let time = obj.time || 1500;
    let width = 180;
    let height = 30;
    let halfwidth = width / 2;
    let halfheight = height / 2;
    let body = $(`<div class='zw-popup-body zw-msg-box' style="border-radius: 0;width:${width}px;height:${height}px;margin-left:-${halfwidth}px;margin-top:-${halfheight}px;"></div>`).html(obj.content);
    setTimeout("$('.zw-mask').remove(),$('.zw-popup-body').remove()", time)
    $('body').append(zwmask).append(body);
  }
})
