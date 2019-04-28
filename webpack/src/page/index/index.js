import './index.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import '../../common/js/servicecomponent/layer.js'

$(function () {
	// 主题悬浮
	$(".meau_ul li").mouseover(function () {
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(".inlist").hide().eq(index).show();
	})
	$(".search .top_head ul li").mouseover(function () {
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(".chaxun").hide().eq(index).show();
	})
	init();
	function init() {
		//服务对象(1自然人2法人)res[i].dict_id
		theme(1);
		faren(2);

		// service();
		// genre();
		// department();

	}
	var personalportalval = "";
	var docode = "";
	// 清楚缓存
	sessionStorage.removeItem('online');
	sessionStorage.removeItem('success');
	sessionStorage.removeItem('main_title');
	//公共服务
	function service() {

		http(api.publicService,params).then((res) => {
			if (res.status > 0) {
				var data = res.data.themeList;
				var arr = "";
				for (i in data) {
					arr += `<li data-id="${data[i].id}"><img src="../../common/images/portal/new_yuandian.png" alt=""><a href="html/page/mything.html?personalportal=4_0">${data[i].name}</a></li>`;
				}
				arr += `<a href="html/page/mything.html?personalportal=4_0"><img src="../../common/images/portal/new_more.png" alt="" class="jiahao" id="img5"></a>`;
				$("#inlist5").html(arr);
			} else {
				layer.msg('行政省批事项列表请求失败')
			}
		},(error) => {
			layer.msg('行政省批事项列表请求失败')
		})

	}
	//行政审批  
	function genre() {
		var params = {
			categoryOne: 42
		}
		http(api.queryCategory,params).then((res) => {
			if (res.status > 0) {
				var data = res.data.categoryList;
				var arr = '';
				for (i in data) {
					arr += `<li data-id="${data[i].dict_id}"><img src="../../common/images/portal/new_yuandian.png" alt=""><a href="html/page/mything.html?personalportal=3_0">${data[i].dict_field_name}</a></li>`;
				}
				arr += `<a href="html/page/mything.html?personalportal=3_0"><img src="../../common/images/portal/new_more.png" alt="" class="jiahao" id="img4"></a>`;
				$("#inlist4").html(arr);
				personalportalval = 3;
			} else {
				layer.msg('行政省批事项列表请求失败')
			}
		},(error) => {
			layer.msg('行政省批事项列表请求失败')
		})

	}
	//个人主题 办事
	function theme(serviceObject) {
		
		var params = {
			cityId: '3944',
			serviceObject: serviceObject //服务对象(1自然人2法人)res[i].dict_id
		}

		http(api.queryTheme,params).then((res)=>{
			if (res.status > 0) {
				var data = res.data.themeList;
				var arr = '';
				for (i in data) {
					arr += `<li data-id="${data[i].id}"><img src="../../common/images/portal/new_yuandian.png" alt=""><a href="html/page/mything.html?personalportal=1_0">${data[i].name }</a></li>`;
				}
				arr += `<a href="html/page/mything.html?personalportal=1_0"><img src="../../common/images/portal/new_more.png" alt="" class="jiahao" id="img1"></a>`;
				$("#inlist1").html(arr);
				personalportalval = 1;
			} else {
				layer.msg('个人主题事项列表请求失败')
			}
		}, (error)=>{
			layer.msg('个人主题事项列表请求失败')
		})

	}

	//法人办事
	function faren(serviceObject) {
		var params = {
			cityId: '3944',
			serviceObject: serviceObject //服务对象(1自然人2法人)res[i].dict_id
		}

		http(api.queryTheme,params).then((res)=>{
			if (res.status > 0) {
				var data = res.data.themeList;
				var arr = '';
				for (i in data) {
					arr += `<li data-id="${data[i].id}"><img src="../../common/images/portal/new_yuandian.png" alt=""><a href="html/page/mything.html?personalportal=2_0">${data[i].name}</a></li>`;
				}
				arr += `<a href="html/page/mything.html?personalportal=2_0"><img src="../../common/images/portal/new_more.png" alt="" class="jiahao" id="img2"></a>`;
				$("#inlist2").html(arr);
				personalportalval = 2;
			} else {
				layer.msg('法人办事事项列表请求失败')
			}
		}, (error)=>{
			layer.msg('法人办事事项列表请求失败')
		})

	}

	//个人部门  数据渲染
	function department() {
		var params = {
			cityId : ''
		}
		http(api.queryDepartment,params).then((res) => {
			if (data.status > 0 && data.data != null) {
				console.log(2)
			} else {
				console.log(3)
				layer.msg('个人部门事项列表请求失败')
			}
		},(error) => {
			layer.msg('个人部门事项列表请求失败')
		})
	}
	// 点击政务公开 投诉公开
	// $('.item4').on('click',function(){
	// 	sessionStorage.setItem('personalportal',5)
	// })
	// $('.item5').on('click',function(){
	// 	sessionStorage.setItem('personalportal',6)
	// })
	// 点击菜单跳转主题、部门 用indexnum传
	// $('.inlist').on('click', function () {
	// 	var index = $(this).index();
	// 	var indexnum = '';
	// 	switch (index) {
	// 		case 0:
	// 			indexnum = "1_0";
	// 			break;
	// 		case 1:
	// 			indexnum = "2_0";
	// 			break;
	// 		case 2:
	// 			indexnum = "1_1";
	// 			break;
	// 		case 3:
	// 			indexnum = "3_0";
	// 			break;
	// 		case 4:
	// 			indexnum = "4_0";
	// 			break;
	// 	}
	// 	sessionStorage.setItem('personalportal', indexnum);
	// })

	$('.inlist').on('click', 'li', function () {
		var id = $(this).data('id')
		sessionStorage.setItem('doCode', id);
	})
	//办事进度查询
	$("#sub").on('click', function (e) {
		e.preventDefault();
		var hrf = $(this).attr('href');
		var params = {
			affairProcessId: $("#numb").val().replace(/(^\s+)|(\s+$)/g, ""),
			affairCheckPassword: $("#pas").val().replace(/(^\s+)|(\s+$)/g, "")
		}

		http(api.searchTAffairsByCheckPassword,params).then((res) => {
			if (res.status > 0) {
				sessionStorage.setItem('enquiries', JSON.stringify(res.data));
				location.href = hrf;
			} else {
				layer.msg('办件编号或密码输入错误')
			}
		}, (error) => {
			layer.msg('办件编号或密码输入错误')
		})
	})

	// $("#quyu").click(function () {
	// 	if ($('#sele').is(':hidden')) {
	// 		$('#sele').slideDown('fast');
	// 	} else {
	// 		$('#sele').slideUp('fast');
	// 	}
	// });

	//弹窗
	// var register = document.getElementById("register");
	// var mask = document.getElementById("mask");
	// var login = document.getElementById("login");
	// register.onclick = function () {
	// 	mask.style.display = "block";
	// 	login.style.display = "block";
	// };
	// var close_login = document.getElementById("close_login");
	// close_login.onclick = function () {
	// 	mask.style.display = "none";
	// 	login.style.display = "none";
	// };

})