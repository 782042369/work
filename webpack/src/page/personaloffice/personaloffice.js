import './personaloffice.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'
import paging from '../../common/js/servicecomponent/paging.js'

import '../../common/js/servicecomponent/downselect'
import 'layui-layer/layer.js'

$(function () {
	// 分页初始化 只加载一次
	let pagint = false;
	//初始化数据显示
	let cus = sessionStorage.getItem('cusToken');
	let currentPage = 1; //当前页
	let size = 10; //每页显示多少条数据
	let affairName = ''; //事项名称
	//查询传参
	let deptId = ''; //主管部门
	let startTime = ''; //申报时间 开始
	let endTime = ''; //申报时间 结束
	let status = ''; // 办理状态
	getList(affairName, currentPage, cus, deptId, startTime, endTime, size, status);
	//设置调回页面标示
	sessionStorage.setItem('second', '个人办件');
	//清楚缓存
	sessionStorage.removeItem('online');
	sessionStorage.removeItem('affairName');
	sessionStorage.removeItem('yuyue_success');

    // 获取办理状态 和 主管部门
	getStatusAndDept();
	
	//查询按钮
	$("#find").on('click', function () {
		affairName = $("#affairName").val();
		deptId = $("#deptId").val();
		startTime = $("#startDate").val();
		endTime = $("#endDate").val();
		getList(affairName, currentPage, cus, deptId, startTime, endTime, size, status);
	})

	//清除信息
	$("#clear").on('click', function () {
		affairName = null;$("#affairName").val('');
		deptId = null;$("#deptId").val('');
		startTime = null;$("#startDate").val('2017-07-21');
		endTime = null;$("#endDate").val('2017-08-21');
		status = null;$("#status").val('');

		getList(affairName, currentPage, cus, deptId, startTime, endTime, size, status);
	})

	//获取办件列表数据
	function getList(affairName, currentPage, cusToken, deptId, startTime, endTime, size, status) {
		//cusToken 测试 传1
		let params = {	
			affairName: affairName,
			currentPage: currentPage,
			cusToken: 1,
			affairAcceptOffice: deptId,
			startTime: startTime,
			endTime: endTime,
			size: size,
			status: status || ''
		}
		
		http(api.getAffairsAppendingList,params).then((res) => {
			if (res.status > 0) {
				let dat = res.data;
				let params = {
					pageSize:10,
					totalRow:parseInt(dat[0].totalCount),
					totalPage:Math.ceil(dat[0].totalCount/10)
				}
				getListStr(dat);
				pageinit(params,currentPage);

				$(".td_padding").on('click', 'a', function (e) {
					e.preventDefault();
					if($(this).data('target')){
						//模态框
						let aff = $(this).data('code');
						let idx = $(this).parents('tr').index();

						let con = `<div class="tan_qt">您一天只有一次取消机会，
						<br />确定取消此事项预约？ </div>`;
						modal(con,aff,idx);
					} else {
						let affairName = $(this).parents('tr').children().eq(1).text();
						if ($(this).text() == '去申报') {
							sessionStorage.setItem('online', '申报');
						} else if ($(this).text() == '去预约') {
							sessionStorage.setItem('online', '预约');
							sessionStorage.setItem('affairName', affairName);
						} else if ($(this).text() == '补齐补正') {
							sessionStorage.setItem('affairName', affairName);
						};
					}
					window.location = $(this).attr('href');
				})

			} else {
				$(".page_wrap").hide();
				$(".nodata").show();
				layer.msg('办件列表数据请求失败');
			}
		},(error) => {
			layer.msg('办件列表数据请求失败');
		})
	}

	// 办理状态 主管部门
	function getStatusAndDept(){
		http(api.getStatusAndDept).then((res) => {
			if(res.status>0){
				if( res.data.dept.length>0){
					let arr = '';//办理状态
					let srr = '';//获取主管部门
					for(let i in  res.data.dept){
						arr += '<li>'+res.data.dept[i]+'</li>';
					}	
					for(let i in  res.data.status){
						srr += '<li data-id= '+res.data.status[i].statusCode+'>'+res.data.status[i].statusName+'</li>';
					}
					$("#status_list").html(srr);	
					$("#dept_list").html(arr);	
				}
			} else {
				layer.msg('办理状态和主管部门数据获取失败')
			}
		},(error) => {
			layer.msg('办理状态和主管部门数据获取失败')
		})
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
		}else{
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
					getList(affairName, pageNo, cus, deptId, startTime, endTime, size, status);
				}
			});
		}
		pagint = true;
	}

	// 页面渲染
	function getListStr(dat){
		let dat_str = '';
		console.log(dat);
		let findDetailStr ;

		for (let i = 0; i < dat.length; i++) {
			dat_str += `<tr data-id="${dat[i].affairProcessId}"><td>${i + 1}</td><td><a class="aff_name" title="${dat[i].affairName}">${dat[i].affairName}</p></td><td>${dat[i].affairRequestTimeFmt}</td><td>${dat[i].affairAcceptOffice}</td><td>${dat[i].statusName}</td><td class="td_padding">`;
			findDetailStr = `<a href="../page/personalapply.html?affairProcessId=${dat[i].affairProcessId}" class="look">查看</a>`;
			switch (dat[i].statusName) {
				case '待补齐补正':
					(dat_str += `<a href="../page/buqibuzheng.html?affairProcessId=${dat[i].affairProcessId}">补齐补正</a>${findDetailStr}`);
					break;
				case '待预约':
					(dat_str += `<a href="../page/onlineorder.html?affairCode=${dat[i].affairCode}&affairProcessId=${dat[i].affairProcessId}">去预约</a>${findDetailStr}`);
					break;
				case '待受理':
					switch (dat[i].affairRequestTypeName) {
						case '网上预约':
							(dat_str += `<a data-target="myModal" data-code="${dat[i].affairCode}">取消预约</a>${findDetailStr}`);
							break;
						case '网上申报':
							(dat_str += `${findDetailStr}`);
							break;
					}
					break;
				case '受理':
					(dat_str += `${findDetailStr}`);
					break;
				case '审批':
					(dat_str += `${findDetailStr}`);
					break;
				case '待预审':
					(dat_str += `${findDetailStr}`);
					break;
				case '准予许可':
					(dat_str += `${findDetailStr}`);
					break;
				case '不予受理':
					(dat_str += `${findDetailStr}`);
					break;
				case '预约取消':
					(dat_str += `${findDetailStr}`);
					break;
				case '不准予许可':
					(dat_str += `${findDetailStr}`);
					break;
				case '不予受理':
					(dat_str += `${findDetailStr}`);
					break;
				case '预约过期':
					(dat_str += `${findDetailStr}`);
					break;
				case '办结':
					(dat_str += `${findDetailStr}`);
					break;
				case '草稿':
					(dat_str += `<a href="../../html/page/yy_txcailiao.html?affairProcessId=${dat[i].affairProcessId}">去申报</a>${findDetailStr}`);
					break;
				default:
					(dat_str += `${findDetailStr}`);
					break;
			}
			dat_str += `</td></tr>`;
		}
		$("#office_list").html(dat_str);
	}

	// 模态框
    function modal(con,aff,idx){
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
				http(api.cancelAffairOrder,{affairCode: aff,cusToken: cus}).then((res) => {
					if(res.status >= 0) {
						$("#office_list").children().eq(idx).remove();
					} else {
						layer.msg('取消预约失败')
					}
				}, (error) => {
					layer.msg('取消预约失败')
				})
			},
			btn2: function(){
				layer.close(index);
			},
			shade: 0.3,
			maxmin: false
		});
	}
});
