import './personalmessages.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'
import paging from '../../common/js/servicecomponent/paging.js'

import 'layui-layer/layer.js'

let blue_little = require('../../common/images/portal/blue.png');
let gray_little = require('../../common/images/portal/no.png');

$(function(){
    //	let cusT = sessionStorage.getItem('cusToken');
        let cusT = 1;
        // 分页初始值
        let pagint = false;

        let curren = 1,size = 10,readF = '';
        getList(cusT,curren,size,readF);
        
        //设置返回页面判断信息
        sessionStorage.setItem('second','办件消息');
        $("#second").text('办件消息');
        //清除本地缓存
        sessionStorage.removeItem('noticeMessage');
        sessionStorage.removeItem('yuyue_success');
        sessionStorage.removeItem('affairName');
        
        
        /*初始化显示办件消息*/
        $(".msg>span").find('img').attr('src','../img/arrow2.png');
        $("#newmsg").attr('src','../img/newxx.png');
        $(".msg").next().show();
        
        function getdate(time) { //转化时间戳
            let now = new Date(time),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) ;
        }
        function getList(cusT,curren,size,readF){
            let params = {cusToken:cusT,currentPage:curren,size:size,readFlag:readF};
            console.log(params);
            http(api.getMessageNoticeList,params).then((res) => {
                if(res.status >= 0) {
                    let list = res.data;
                    console.log(list);
                    //删除本页的总数组
                    let msg_list = [];
                    // 列表数据显示
                    getListStr(list,msg_list);
                    // 分页
                    let param = {
                        pageSize:10,
                        totalRow:parseInt(list[0].totalCount),
                        totalPage:Math.ceil(list[0].totalCount/10)
                    }
                    pageinit(param,curren);

                    // 删除单条数据
                    $(document).on('click','.del',function(){
                        let delIdArr = [$(this).find('a').data('id')];
                        let con = `<div class="tan_qt">您确定要删除该记录么？</div>`
                        modal(con,delIdArr);
                    })
                    //删除本页
                    $("#delPage").on('click',function(){
                        let con = `<div class="tan_qt">您确定要删除本页所有记录么？</div>`
                        modal(con,msg_list);
                    })
                    // 查看
                    $(document).off().on('click','.rigtht_bod a',function(){
                        let affairProcessId = $(this).data('affairid'); // 办件id
                        let readFlagId = $(this).data('readflag'); // 事项id
                        let title = $(this).parents('dd').prev().find('i').html(); //弹窗标题
                        let con_cont = $(this).parents('ul').next().text(); //弹窗内容 主体信息
                        let con;
                        let btns;

                        if($(this).parents('ul').html().indexOf('去预约') > -1){
                            con = `<div class="tan_qt tan_qt1 text-left"><h2>尊敬的用户:</h2><p>您好，${con_cont}</p></div><div class="btnwrap">
                                <a class="layui-layer-close" href="../page/onlineorder.html?affairProcessId=${affairProcessId}">去预约</a>
                                <a class="layui-layer-close" href="../page/personalapply.html?affairProcessId=${affairProcessId}">办件详情</a>
                            </div>`
                        } else {
                            con =  `<div class="tan_qt tan_qt1 text-left"><h2>尊敬的用户:</h2><p>您好，${con_cont}</p></div>`;   //弹窗内容 
                        }

                        if(readFlagId == 0){
                            http(api.getMessageInfo,{id:readFlagId}).then((res) => {
                                if(res.status >= 0) {
                                    if(con.indexOf('<a') > -1){
                                        findmodal2(title,con,affairProcessId)
                                    } else {
                                        if(title.indexOf('建议') >= 0){
                                            btns = ['建议详情'];
                                        } else if (title.indexOf('投诉') >= 0) {
                                            btns = ['投诉详情'];
                                        } else if (title.indexOf('咨询') >= 0) {
                                            btns = ['咨询详情'];
                                        } else {
                                            btns = ['办件详情'];
                                        }
                                        findmodal(title,con,btns,affairProcessId);
                                    }
                                } else {
                                    console.log('消息详情查看失败')
                                }
                            }, (error) => {
                                console.log('消息详情查看失败')
                            })
                        } else {
                            if(con.indexOf('<a') > -1){
                                findmodal2(title,con,affairProcessId)
                            } else {
                                if(title.indexOf('建议') >= 0){
                                    btns = ['建议详情'];
                                } else if (title.indexOf('投诉') >= 0) {
                                    btns = ['投诉详情'];
                                } else if (title.indexOf('咨询') >= 0) {
                                    btns = ['咨询详情'];
                                } else {
                                    btns = ['办件详情'];
                                }
                                findmodal(title,con,btns,affairProcessId);
                            }
                        }
                    })
                }
            },(error) => {
                layer.msg('消息列表数据请求失败')
            })
        }

        //选项卡切换
        let index = null;
        $("#nav").on('click','li',function(){
            index = $(this).index();
            if(index == 0){
                readF = '';
            }else{
                readF = 0;
            }
            pagint = false;
            getList(cusT,1,size,readF);
            $(this).addClass('active').siblings('li').removeClass('active');
        })

    // 渲染页面
    function getListStr(list,msg_list){
        let list_str = '';
        if(list.length>0){
            console.log(list);
            //全部消息
            for(let i=0;i<list.length;i++){
                msg_list.push(list[i].id);
                let time = getdate(list[i].createTime);
                let read = "";
                list_str += `<dl  data-affairname="${list[i].affairProcessId}" class="${(list[i].readFlag == 1? "yidu" : "")}" data-index="${i}" data-id="${list[i].id}"><dt><span class="date">${time}</span><img src="${(list[i].readFlag==0?blue_little:gray_little)}"/><i>${list[i].statusName}通知</i></dt><dd><ul>`;
                switch(list[i].statusName){
                    case '待补齐补正' : (list_str += `<li><a href="../../html/page/buqibuzheng.html?affairProcessId=${list[i].affairProcessId}">去补齐补正</a></li>`);break;
                    case '待预约' : (list_str += `<li><a href="../page/onlineorder.html?affairCode=${list[i].orderList.affairsCode}&affairProcessId=${list[i].affairProcessId}">去预约</a></li>`);break;
                    case '预约成功' : (list_str += `<a data-code="${dat[i].affairCode}">取消预约</a><a href="javascript:;" class="look">查看</a>`);break;
                    case '受理' : (list_str += '');break;
                    case '审批' : (list_str += '');break;
                    case '待预审' : (list_str += '');break;
                    case '准予许可' : (list_str += '');break;
                    case '不予受理' : (list_str += '');break;
                    case '预约取消' : (list_str += '');break;
                    case '不准予许可' : (list_str += '');break;
                    case '预约过期' : (list_str += '');break;
                    case '待受理' : (list_str += '');break;
                    case '办结' : (list_str += '');break;
                    case '草稿' : (list_str += `<li><a href="../html/page/yy_txcailiao.html">去申报</a></li>`);break;
                }
                list_str += `<li class="del"><a href="javascript:;" data-id="${list[i].id}" >删除</a></li><li class="rigtht_bod"><a href="javascript:;" data-affairid="${list[i].affairProcessId}" data-id="${list[i].id}" data-readflag="${list[i].readFlag}">查看</a></li></ul>`;
                switch(list[i].statusName){
                    // case '待补齐补正' : (list_str += '<p>您好，您申报的【'+list[i].affairName+'】事项，需要补齐补正如下材料：“'+list[i].noticeMap.noticesMaterialList!=null ? list[i].noticeMap.noticesMaterialList[0].name: ""+'”</p>');break;
                    case '待预约' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已预审通过">您好，您申报的【'+list[i].affairName+'】事项，已预审通过</p>');break;
                    case '预约成功' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已预约成功">您好，您申报的【'+list[i].affairName+'】事项，已预约成功</p>');break;
                    case '受理' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，处于受理状态">您好，您申报的【'+list[i].affairName+'】事项，处于受理状态</p>');break;
                    case '审批' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，处于审批中">您好，您申报的【'+list[i].affairName+'】事项，处于审批中</p>');break;
                    case '待预审' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，需要提交材料">您好，您申报的【'+list[i].affairName+'】事项，需要提交材料</p>');break;
                    case '准予许可' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已准予许可">您好，您申报的【'+list[i].affairName+'】事项，已准予许可</p>');break;
                    case '不予受理' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，不予受理">您好，您申报的【'+list[i].affairName+'】事项，不予受理</p>');break;
                    case '预约取消' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已预约取消">您好，您申报的【'+list[i].affairName+'】事项，已预约取消</p>');break;
                    case '不准予许可' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，不准予许可">您好，您申报的【'+list[i].affairName+'】事项，不准予许可</p>');break;
                    case '预约过期' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已预约过期！望您知晓！预约时间">您好，您申报的【'+list[i].affairName+'】事项，已预约过期！望您知晓！预约时间</p>');break;
                    case '待受理' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，处于待受理状态">您好，您申报的【'+list[i].affairName+'】事项，处于待受理状态</p>');break;
                    case '办结' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已办结">您好，您申报的【'+list[i].affairName+'】事项，已办结</p>');break;
                    case '草稿' : (list_str += '<p title="您好，您申报的【'+list[i].affairName+'】事项，已保存草稿">您好，您申报的【'+list[i].affairName+'】事项，已保存草稿</p>');break;
                }
                list_str += '</dd></dl>'
            }
            $("#msg_all").html(list_str);
            
        }else{
            $("#msg_all").html('<div class="empty"><img src="../../common/images/portal/404.png" /></div>')
            $("#page").html('');
        }
    }

    //分页
    function pageinit(res,pagecur) {	
        let pagesize = res.pageSize; //一页有10条数据
        let totalSize = res.totalRow;
        let totalPage = res.totalPage;
        let currentPage = pagecur;
        if(totalPage<=1){
            $("#page").hide();
            $(".page_wrap").hide();
        } else {
            $(".page_wrap").show();
            $("#page").show();
        }
        if(!pagint){
            $("#page").paging({
                pageNo: currentPage, //当前显示第几页数据
                totalPage: totalPage, //共几页
                totalSize: totalSize, //数据总条数bluecur
                pagesize: pagesize,
                callback: function(pageNo) {
                    getList(cusT,pageNo,size,readF);
                }
            });
        }
        pagint = true;
    }

    // 模态框 删除
    function modal(con,delIdArr){
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
				http(api.updateMessageListInfo,delIdArr).then((res) => {
					if(res.status >= 0) {
						$("#office_list").children().eq(idx).remove();
					} else {
						layer.msg('消息删除失败')
					}
				}, (error) => {
					layer.msg('消息删除失败')
				})
			},
			btn2: function(){
				layer.close(index);
			},
			shade: 0.3,
			maxmin: false
		});
    }

    // 模态框 查看
    function findmodal(title,con,btns,affairProcessId){
        layer.open({
			type: 1,
			title: title,
			content: con,
			area:['600px','260px'],
			btn: btns,
			move: false,
			resize: false,
            yes: function(index, layero) { //这里写最后的逻辑和传参
                layer.close(index);
                if(btns.indexOf('建议')){
                    location.href = `../page/personalinteractdetail.html?proposal&${affairProcessId}`;
                } else if (btns.indexOf('投诉')){
                    location.href = `../page/personalinteractdetail.html?complaints&${affairProcessId}`;
                } else if(btns.indexOf('咨询')){
                    location.href = `../page/personalinteractdetail.html?advisory&${affairProcessId}`;
                } else {
                    location.href = `../page/personalapply.html?affairProcessId=${affairProcessId}`;
                }
			},
			shade: 0.3,
			maxmin: false
		});
    }

    function findmodal2(title,con,affairProcessId){
        layer.open({
			type: 1,
			title: title,
			content: con,
			area:['600px','260px'],
			move: false,
			resize: false,
			shade: 0.3,
			maxmin: false
		});
    }

    });
    