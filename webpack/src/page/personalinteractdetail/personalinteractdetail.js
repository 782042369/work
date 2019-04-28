import './personalinteractdetail.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'
import carousel from '../../common/js/servicecomponent/carousel'

import '../../common/js/servicecomponent/downselect'
import 'layui-layer/layer.js'


$(function(){
    let arr = window.location.search.split('?');
    let intourl = arr[1].split('&')[0];//判断从那个页面进入 建议公开0 投诉公开1
    
    // 传参
    let interactionIdNum = arr[1].split('&')[1];
    // let interactionIdNum = "1";

    // 地址
    let portal = "";   
    //  显示文案
    let differentHtml = ""
    if(intourl == "proposal"){//建议详情
        portal=api.getProposalDetail;
        differentHtml = "建议";
    }else if(intourl == "message"){//咨询详情
        portal=api.getMessageDetail;
        differentHtml = "咨询";
    }else{//投诉详情
        portal=api.getComplaintDetail;
        differentHtml = "投诉";
    }
    getData(differentHtml,portal,{interactionId:interactionIdNum});


    function getData(differentHtml,portal,params) {
        http(portal,params).then((res) => {
            if(res.status >= 0){
                console.log(res);
                if(res.data != ''){
                    $(".details").html(differentHtml+"内容");
                    getInteraction(differentHtml,res.data);
                    getReplies(res.data.replies);
    
                    $(".img_box").on('click','img',function(){
                        let imgWrap = $(this).parent().children();
                        let imgSrcList = [];
                        for(let i=0;i<imgWrap.length;i++){
                            imgSrcList.push(imgWrap.eq(i).attr('src'))
                        }
                        let liW = 900;
                        let idx = $(this).index();
                        $(".wrap").show();
                        $('#carousel_wrap').carousel({
                            imgSrcList: imgSrcList,
                            liW: liW,
                            idx: idx
                        });
                    })

                    $(".nodata").hide();
                } else {
                    $(".nodata").show();
                }
            } else {
                layer.msg(differentHtml + '详情数据请求失败');
            }
        },(error) => {
            layer.msg(differentHtml + '详情数据请求失败');
        })
   }
  function getInteraction(differentHtml,res) {//内容  
    console.log(res);
    let arr = "";
    let imgarr = "";
    let data = res.interaction;
		$.each(data, function(i, comment) {
      $.each(data[i].attachmentList, function(j, comment) {
          imgarr +='<img class="thumbnail_1" src="'+data[i].attachmentList[j].fileAddress+'" alt="">'
      });
      arr+= `<div class="detail_mid">
              <div class="mid_top">
                <p class="details">${differentHtml}内容</p>
              </div></div>
            <div class="mid_mid">
              <div class="div_top clearfix">
                <p class="p1 fl ">${differentHtml}标题</p>
                <p class="p2 fl">${data[i].title}</p>
              </div><div class="div_mid clearfix">
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
    let arr = "";
    let imgarr = "";
    let data = "";
    let srr = "";
    $.each(res, function(i, comment) {
        $.each(res[i].attachments, function(j, comment) {
            imgarr +='<img class="thumbnail_1" src="'+res[i].attachments[j].fileAddress+'" alt="">';
        });
        i== 0 ? srr = "回复内容" : srr = "追加回复";
        arr+= `<div class="detail_mid">
                <div class="mid_top reply_top">
                <p class="details">${srr}</p>
                </div></div>
                <div class="mid_mid">
                <div class="div_top clearfix">
                    <p class="p1 fl ">回复人员 </p>
                    <p class="p2 fl">${res[i].userName}</p>
                </div><div class="div_top clearfix">
                    <p class="p1 fl ">回复单位</p>
                    <p class="p2 fl">${res[i].departmentName}</p>
                </div><div class="div_mid clearfix">
                    <p class="p1 fl ">回复内容</p>
                    <div class="fl div_div">
                    <p class="p2">${res[i].replyContent}</p><div class="img_box">${imgarr} 
                    </div></div>
                </div><div class="div_top clearfix">
                    <p class="p1 fl">提交时间</p>
                    <p class="p2 fl">${res[i].replyTime}</p>
                </div>
                </div>`
    });
    $(".reply").html(arr);
  }
})