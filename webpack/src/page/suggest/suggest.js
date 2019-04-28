import './suggest.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import utils from '../../common/js/utils'

import paging from '../../common/js/servicecomponent/paging.js'
import '../../common/js/servicecomponent/layer.js'


$(function(){
	//初始化数据显示
	let url;
	// 分页加载
	let pagint = false;
	let publicIndex = utils.getQueryStringHr('personalportal');
	$("#turn_main").children().eq(publicIndex).addClass('main_sele').siblings().removeClass('main_sele');
	if(publicIndex == 6){
		$(".third").html('投诉公开');
		url = api.getComplaintListForOpen;
	}else{
		url = api.getProposalListForOpen;
		$(".third").html('建议公开');
	}
	getList(1,url);

	$("#complants_list").on("click","tr",function(){
		let a = "";
		publicIndex == 5 ? a = 0 : a = 1 ; //建议公开0 投诉公开1
		window.location.href="./suggestdetails.html?"+a+"&"+$(this).data("id");
	})
	//查询传参
	function getList(page,url){
		http(url,{page:page}).then((res) => {
			if(res){
				let data = res.data;
				let params = {
					pageSize:10,
					totalRow:data[0].count,
					totalPage:Math.ceil(data[0].count/10)
				}
				getListStr(data);
				pageinit(params,page);
			}else{
				layer.msg('列表数据请求失败')
			}
		},(error) => {
			layer.msg('列表数据请求失败')
		})
	}
	
	function getListStr(data){
		if(data.length > 0){
			let dat_str = '';
			for(let i=0;i<data.length;i++){
				dat_str += '<tr data-id="'+data[i].interactionId+'"><td><p>'+data[i].title+'</p></td><td>'+ data[i].time+'</td><td>'+data[i].replyDepartmentName+'</td></tr>';
			}
			$("#complants_list").html(dat_str);
		}else{
			let nothing = '<div style="width:100%;height:580px;"><img src="../../common/images/portal/404.png" class="nothing"/></div>';
			$("#complants_list").html(nothing);
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
				getList(pageNo,url);
			}
		});
		}
		pagint = true;
	}

})
