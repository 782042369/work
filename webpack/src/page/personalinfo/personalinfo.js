import './personalinfo.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'

import 'layui-layer/layer.js'

$(function(){
	let cus = sessionStorage.getItem('cusToken') || 1;
	//数据列表
	getList(cus);
	//设置调回页面标示
	sessionStorage.setItem('second','个人空间');
	//删除初始化缓存
	sessionStorage.removeItem('online');
	sessionStorage.removeItem('main_title');
	sessionStorage.removeItem('success');
	sessionStorage.removeItem('affairName');
	sessionStorage.removeItem('yuyue_success');
	
	//操作跳转
	function getList(cus){

        http(api.getPersonalSpace,{cusToken:cus}).then((res) => {
            if(res.status>0){
                let dat = res.data;
                getListStr(dat);

                $("td").on('click','a',function(e){
                    e.preventDefault();
                    let aff;  // affairProssisId 办件唯一编号
                    let hrf = $(this).attr('href'); // 跳转地址
                    let datId = $(this).parents('tr').data('id');  // 办件编号
                    let con;//  弹出框文案
                    let reqaddress;// 请求接口
                    let params;// 参数
                    let errorStr;// 失败显示文案

                    if($(this).html() == '取消预约' || $(this).html() === '删除'){
                        aff = $(this).data('code');
                        if($(this).html() == '取消预约') {
                            reqaddress = api.cancelAffairOrder;
                            con = '<div class="tan_qt">您一天只有一次取消机会，<br />确定取消此事项预约？</div>';
                            params = {affairCode:aff,cusToken:cus};
                            errorStr = '取消预约失败';
                        } else if($(this).html() === '删除') {
                            reqaddress = api.delAffairsAppending;
                            con = '<div class="tan_qt">您确定要删除该记录么？</div>';
                            params = {affairProcessId:aff};
                            errorStr = '删除失败';
                        }
                        modal(con,reqaddress,params,errorStr)
                    } else if ($(this).html() === '去申报' || $(this).html() === '去预约' || $(this).html() === '补齐补正') {
                        sessionStorage.setItem('online','预约');
                        window.location.href = hrf + '?affairProcessId=' + datId;
                        if($(this).html() === '补齐补正') sessionStorage.setItem('affairName',$(this).parents('tr').children().eq(1).text());
                    } else {
                        sessionStorage.setItem('second','个人空间');
                        window.location.href = hrf + '?affairProcessId=' + datId;
                    }
                })

            }else{
                layer.msg('个人办事信息数据请求失败')
                $(".nodata").show();
            }
        },(error) => {
            layer.msg('个人办事信息数据请求失败')
        })
    }
    
    // 列表显示
    function getListStr(dat){
        $.each(dat, function(i,d) {
            //草稿箱
            if(d.name === 'draft'){
                let list = d.data.slice(0,6);
                $("#draft").text(d.count);
                let dat_str = ``;
                $.each(list, function(i,d1) {
                    dat_str += `<tr data-id="${d1.affairProcessId}"><td>${i+1}</td><td><p>${d1.affairName}</p></td><td>${d1.affairRequestTimeFmt}</td><td>${d1.affairAcceptOffice}</td><td>${d1.statusName}</td><td class="td_caogao"><a href="../../html/page/yy_txcailiao.html" rel="${d1.affairRequestTypeName}">去申报</a></td></tr>`;
                    let affairCode = d1.affairCode;

                    http(api.queryWorkGuide,{doCode:affairCode}).then((res) => {
                        affairOffice = res.data.actualizeBillVo.acceptOffice || '';
                    },(error) => {
                        layer.msg('获取办理单位失败');
                    })
                });
                $("#caogaoxiang").html(dat_str);
            }else if(d.name === 'inProcess'){
                //办理中
                let list2 = d.data.slice(0,6);
                $("#inProcess").text(d.count);
                let dat_str = '';
                let findDetailStr = `<a href="../page/personalapply.html" class="look">查看</a>`;
                $.each(list2, function(i,d2) {
                    dat_str += `<tr data-id="${d2.affairProcessId}"><td>${i+1}</td><td><p>${d2.affairName}</p></td><td>${d2.affairRequestTimeFmt}</td><td>${d2.affairAcceptOffice}</td><td>${d2.statusName}</td><td class="td_padding">`;
                    switch (d2.statusName) {
                        case '待补齐补正' : (dat_str += `<a href="../../html/page/buqibuzheng.html">补齐补正</a>${findDetailStr}`);break;
                        case '待预约' : (dat_str += `<a href="javascript:;">去预约</a>${findDetailStr}`);break;
                        case '预约成功' : (dat_str += `<a data-code="${dat[i].affairCode}">取消预约</a>${findDetailStr}`);break;
                        case '受理' : (dat_str += `${findDetailStr}`);break;
                        case '审批' : (dat_str += `${findDetailStr}`);break;
                        case '待预审' : (dat_str += `${findDetailStr}`);break;
                        case '准予许可' : (dat_str += `${findDetailStr}`);break;
                        case '不予受理' : (dat_str += `${findDetailStr}`);break;
                        case '预约取消' : (dat_str += `${findDetailStr}`);break;
                        case '不准予许可' : (dat_str += `${findDetailStr}`);break;
                        case '不予受理' : (dat_str += `${findDetailStr}`);break;
                        case '预约过期' : (dat_str += `${findDetailStr}`);break;
                        case '待受理' : (dat_str += `${findDetailStr}`);break;
                        case '办结' : (dat_str += `${findDetailStr}`);break;
                        case '草稿' : (dat_str += `<a href="../html/page/yy_txcailiao.html">去申报</a>${findDetailStr}`);break;
                        default : (dat_str += `${findDetailStr}`);break;
                    }
                    dat_str +='</td></tr>';
                });
                $("#process").html(dat_str);
            }else if(d.name === 'end'){
                //已办结
                let list3 = d.data.slice(0,6);
                $("#through").text(d.count);
                let dat_str = '';
                $.each(list3, function(i,d3) {
                    dat_str += `<tr data-id="${d3.affairProcessId}"><td>${i+1}</td><td><p>${d3.affairName}</p></td><td>${d3.affairRequestTimeFmt}</td><td>${d3.affairAcceptOffice}</td><td>${d3.statusName}</td><td class="td_ded">
                                <a href="../../html/page/apply.html" rel="${d3.affairRequestTypeName}">查看</a><a href="../../html/page/appraise.html">评价</a><a href=""  data-code="${d3.affairCode}" class="remove">删除</a></td></tr>`;
                });
                $("#over").html(dat_str);
            }
        });
    }

    // 弹出框
	function modal(con,reqaddress,params,errorStr){
		layer.open({
			type: 1,
			title: "温馨提示",
			content: con,
			area:['300px','190px'],
			btn: ["确定","取消"],
			move: false,
			resize: false,
			yes: function(index, layero) { //这里写最后的逻辑和传参
                layer.close(index);
				http(reqaddress,params).then((res) => {
                    if(res.status >= 0){
                        getList(cus);
                    } else {
                        layer.msg(errorStr)
                    }
                },(error) => {
                    layer.msg(errorStr)
                })
			},
			btn2: function(index){ 
				return true;
			 },
			shade: 0.3,
			maxmin: false
		})
	}
});
