import './personalapply.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import api from '../../common/js/api'
import http from '../../common/js/http'
import utils from '../../common/js/utils'

let arrow = require('../../common/images/portal/arrow.png');
let arrow2 = require('../../common/images/portal/arrow2.png');

$(function(){
	let index = null;
	$("#nav").on('click','a',function(){
		$(this).addClass('sele').parent().parent().siblings().find('a').removeClass('sele');
		index = $(this).parent().parent().index();
		$("#cont").children().eq(index).show().siblings().hide();
		//切换选项卡 获取 内容区1 高度
	})
	
	if(sessionStorage.getItem('enquiries')){
		let dat = JSON.parse(sessionStorage.getItem('enquiries'));
        $("#main_title").text(dat.info.affairName);

        // 获取基本信息
		let info = dat.info;
        getInfoStr(info);
		
		//获取材料
        let material = dat.materialList;
        getMaterialStr(material);

		//办理过程
//		$("#cont3").html('')
		
		//通知单
        let notices = dat.notices;
        getNoticeStr(notices);
		
	}else{
		let affId = utils.getQueryStringHr('affairProcessId');
		getInfo(affId);
	}
	
	function getInfo(param){
        http(api.getAffairAppendingInfos,{affairProcessId:param}).then((res) => {
            console.log(res);
            if(res.status >= 0){
                $("#main_title").text(info.affairName);
                //基本信息
                let info = res.data.info;
                getInfoStr(info);
                // 材料名称
                let material = data.data.materialList;
                getMaterialStr(material);
                // 通知单
                let notices = data.data.notices;
                getNoticeStr(notices);


                
            } else {
                layer.msg('数据获取失败')
            }
        },(error) => {
            layer.msg('数据获取失败')
        })
	}
	
	setTimeout(function(){
		//展示详情
		$("thead").on('click','span',function(){
			$(this).parents('td').toggleClass('col');
			$(this).parents('thead').next().toggle(200);
			$(this).parents('table').siblings('table').find('tbody').slideUp(200);
            $(this).parents('table').siblings('table').find('thead').find('td').removeClass('col');
			if($(this).find('img').attr('src') == arrow){
				$(this).find('img').attr('src',arrow2);
				$(this).parents('table').siblings('table').find('thead').find('img').attr('src',arrow2);
			}else{
				$(this).find('img').attr('src',arrow);
			}
		})
		//打印
		$(".print").on('click',function(){
			alert(1)
		})
	},500)
	
	function prints(){
		alert(1);
    }
    
    // 基本信息
    function getInfoStr(info){
        let info_str = '';
		info_str += `<table border="2" cellspacing="0"><tr><th>申请人</th><td>${info.cusName}</td><th>办理状态</th><td>${info.statusName}</td></tr>`;
		info_str += `<tr><th>申报时间</th><td>${info.affairRequestTimeFmt}</td><th>受理部门</th><td>${info.affairAcceptOffice}</td></tr>`;
		info_str += `<tr><th>申报号</th><td>${info.affairProcessId}</td><th>查询密码</th><td>${info.affairCheckPassword}</td></tr>`;
		info_str += `<tr><th>法定办结时间</th><td>${info.affairStatutoryTimeLimit}</td><th>承诺办结时间</th><td>${info.affairCommitmentTimeLimit}</td></tr>`;
		info_str += `<tr><th>代理人</th><td>${info.pName}</td><th>代理人身份证号</th><td>${info.pIdCode}</td></tr>`;
		info_str += `<tr><th>代理人联系方式</th><td colspan="3">${info.affairPhone}</td></tr></table>`;
		$("#cont1").html(info_str);
    }
    // 材料名称
    function getMaterialStr(material){
        let material_str = `<table cellspacing="0"><thead><tr><td width="60%">材料名称</td><td>是否收取</td><td>接收方式</td></tr></thead><tbody>`;
		for(let i=0;i<material.length;i++){
			material_str += `<tr><td>${material[i].name}</td><td>`;
			material_str += (material[i].submitState=='true') ? `是` : `否`;
			material_str += `</td><td>${material[i].uploadMode}</td></tr>`;
		}
		material_str += `</tbody></table>`;
		$("#cont2").html(material_str)
    }
    // 通知单
    function getNoticeStr(notices){
        let notice_str = '';
		for(let j=0;j<notices.length;j++){
			if(j == 0){
				notice_str += `<!--startprint${j}--><table border="1" cellspacing="0">`;
			}else{
				notice_str += `<table border="1" cellspacing="0" class="tab">`;
			}
			notice_str += `<thead><tr><td colspan="4"><span>2017.09.12&nbsp;<img src="${arrow}" alt="" /></span>${notices[j].noticeType}通知单</td></tr></thead>`;
			notice_str += `<tbody><tr><th>办件编号</th><td>${notices[j].affairProcessId}</td><th>受理时间</th><td>${notices[j].acceptanceTime}</td></tr>`;
			notice_str += `<tr><th>受理部门</th><td>${notices[j].acceptDept}</td><th>窗口人员</th><td>${notices[j].windowUser}</td></tr>`;
			notice_str += `<tr><th>承诺时限</th><td colspan="3">${notices[j].commitmentTimeLimit}</td></tr>`;
			notice_str += `<tr><th>需补齐补正材料</th><td colspan="3">${notices[j].noticesMaterialList}</td></tr>`;
			notice_str += `<tr><th>补齐补正告知原因</th><td colspan="3">${notices[j].reason}</td></tr>`;
			notice_str += `<tr><td colspan="4">查询及投诉电话：${notices[j].complaintPhone}</td></tr>`;
			notice_str += `<tr><td colspan="4" class="td_padding0"><a class="print" >打印</a></td></tr></tbody></table><!--endprint${j}-->`;
		}
		
		$("#cont4").html(notice_str);
    }
 
});