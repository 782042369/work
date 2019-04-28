import './suggestdetails.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import '../../common/js/servicecomponent/layer.js'

$(function(){
  let arr = window.location.search.split('?');
  let intourl = arr[1].split('&')[0];//判断从那个页面进入 建议公开0 投诉公开1
  let interactionIdNum = arr[1].split('&')[1];
  let publicIndex = null;
  let portal = "";
  let differentHtml = "";
  if(intourl == 0){
    portal = api.getProposalDetail;
    differentHtml = "建议";
    publicIndex = 5;
  } else {
    portal = api.getComplaintDetail;
    differentHtml = "投诉";
    publicIndex = 6;
  }
  getData(differentHtml,portal,interactionIdNum);
  $("#turn_main").children().eq(publicIndex).addClass('main_sele').siblings().removeClass('main_sele');
  
  
  function getData(differentHtml,portal,interactionIdNum) {
    http(portal,{interactionId:interactionIdNum}).then((res) => {
      console.log(res);
      if(res){
        $(".details").html(differentHtml+"内容");
        getInteraction(differentHtml,res.data);
        getReplies(res.data.replies);
      } else {
        layer.msg('详情页数据请求失败')
      }
    },(error) => {
      console.log(error);
      layer.msg('详情页数据请求失败')
    })
  }
  function getInteraction(differentHtml,res) {//内容  
  	console.log(1)
    var arr = "";
    var imgarr = "";
    var data = "" 
//  differentHtml=="投诉" ? data = res.interaction : data = res.proposals;.3
data = res.interaction
	$.each(data, function(i, comment) {
    if(data[i].attachmentList){
      $.each(data[i].attachmentList, function(j, comment) {
          imgarr +=`<img class="thumbnail_1" src="${data[i].attachmentList[j].fileAddress}" alt="">`
      });
    }else{
      imgarr = '';
    }
      arr+= `<div class="detail_mid">
              <div class="mid_top">
                <p class="details">${differentHtml}内容</p>
              </div>
            </div>
            <div class="mid_mid">
              <div class="div_top clearfix">
                <p class="p1 fl ">${differentHtml}标题</p>
                <p class="p2 fl">${data[i].title}</p>
              </div>
              <div class="div_mid clearfix">
                <p class="p1 fl ">${differentHtml}内容</p>
                <div class="fl div_div">
                  <p class="p2">${data[i].content}</p><div class="img_box">${imgarr}
                </div></div>
              </div>
              <div class="div_top clearfix">
                <p class="p1 fl">提交时间</p>
                <p class="p2 fl">${data[i].createTime}</p>
              </div>
            </div>`
    });
    $(".matter").html(arr);
  }
  function getReplies(res) {//回复
    var sarr = "";
    var imgarr = "";
    var data = "";
    var srr = "";
		$.each(res, function(i, comment) {
      $.each(res[i].attachments, function(j, comment) {
          imgarr +='<img class="thumbnail_1" src="'+res[i].attachments[j].fileAddress+'" alt="">';
      });
      i== 0 ? srr = "回复内容" : srr = "追加回复";
      sarr+= '<div class="detail_mid">'+
              '<div class="mid_top">'+
                '<p class="details">'+srr+'</p>'+
              '</div>'+
            '</div>'+
            '<div class="mid_mid">'+
              '<div class="div_top clearfix">'+
                  '<p class="p1 fl ">回复人员 </p>'+
                  '<p class="p2 fl">'+res[i].userName+'</p>'+
              '</div>'+
              '<div class="div_top clearfix">'+
                '<p class="p1 fl ">回复单位</p>'+
                '<p class="p2 fl">'+res[i].departmentName+'</p>'+
              '</div>'+
              '<div class="div_mid clearfix">'+
                '<p class="p1 fl ">回复内容</p>'+
                '<div class="fl div_div">'+
                  '<p class="p2">'+res[i].replyContent+'</p><div class="img_box">'+imgarr+ 
                '</div></div>'+
              '</div>'+
              '<div class="div_top clearfix">'+
                '<p class="p1 fl">提交时间</p>'+
                '<p class="p2 fl">'+res[i].replyTime+'</p>'+
              '</div>'+
            '</div>'
    });
    $(".reply").html(sarr);
  }
  // $('#myCarousel').carousel({//bootstrap 轮播图控制 禁止图片自动轮播
  //   pause: true,
  //   interval: false
  // });
  $(".close_icon").click(function(){
    $("#ace").hide();
  })
  $(".banner_box").on("click",".thumbnail_1",function () {//获取点击的图片index 开启轮播图组件
    var num = $(this).index() 
    var html = "";
    var arr = "";
    var imgUlr = $(this).parent().children();
    $.each(imgUlr, function(i, comment) {
      html += '<div class="item"><img class="thumbnail_1" src="'+$(this).attr("src")+'" alt=""></div>';
      arr += '<li data-target="#myCarousel" data-slide-to="'+i+'" class="icon_li"></li>';
    })
    $(".carousel-inner").html(html);//轮播图片
    $(".carousel-indicators").html(arr);//生成小圆点
    $(".carousel-inner .item").eq(num).addClass("active").siblings().removeClass('active');
    $(".carousel-indicators li").eq(num).addClass("active").siblings().removeClass('active');
    $("#ace").show();
  })
})