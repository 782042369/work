import './personalratingdetails.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'
import paging from '../../common/js/servicecomponent/paging.js'
import carousel from '../../common/js/servicecomponent/carousel'

import 'layui-layer/layer.js'

let star = require('../../common/images/portal/grade.png');

$(function(){
	//初始化数据显示
	let cus = sessionStorage.getItem('cusToken');
	//设置调回页面标示
	sessionStorage.setItem('second','个人投诉');
	//清楚缓存
	sessionStorage.removeItem('online');
	sessionStorage.removeItem('affairName');
    sessionStorage.removeItem('yuyue_success');
    
	let intoUrl = window.location.href.split("?")[1];
    getData(cus);

	function getData(cus){
		let data = {
			affairProcessId:1  //intoUrl 默认1有数据
        }
        http(api.getScoreDetail,data).then((res) => {
            if(res.status >= 0){
                console.log(res);
                getList(res.data)
                
                $(".appraiseimg").on('click','img',function(){
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
                // 轮播数组
                let imgArr = [];
            } else {
                layer.msg('评价详情数据请求失败')
            }
        },(error) => {
            layer.msg('评价详情数据请求失败')
        })
	}
	function getList(res){
		let html = "";
		let imgarr = "";//打分小星星
		let appraiseimg = "";//打分小星星
        let scoreHtml = "";//打分内容
        
		for (let i in res[0].attachments ){
			appraiseimg += `<img src="${res[0].attachments[i].fileAddress}" alt="">`
		}
		for (let i=0 ; i<res[0].score ; i++ ){
			imgarr += `<img src="${star}" alt="">`
		}
		switch(res[0].score){	
			case 1 : scoreHtml = "非常不满意";break;
			case 2 : scoreHtml = "不满意";break;
			case 3 : scoreHtml = "基本满意";break;
			case 4 : scoreHtml = "满意";break;
			case 5 : scoreHtml = "非常满意";break;
		}
		$(".info_detail h1").html(res[0].affairName || '关于政务服务的便民性发展');
		html =  `<li class="clearfix"><span>该事项跑窗口的次数</span><em>${res[0].times}
				次</em></li><li class="clearfix"><span>服务评分</span><div class="grade_main">${imgarr}
				<h5>${scoreHtml}</h5></div></li><li class="clearfix">
				<span>评价内容</span>
				<em class="grade_content">${res[0].content}<div class="appraiseimg clearfix">${appraiseimg}</div></em>
				</li><li class="clearfix"><span>评价时间</span>
				<em>${res[0].createTime}</em></li>`
		$(".info_detail ul").html(html);
    }
    

});
