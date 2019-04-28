import './affairlist.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import utils from '../../common/js/utils'

import '../../common/js/servicecomponent/layer.js'

$(function () {
	//数据 主内容列表传参
	let msg = '';
	let online_do = '';
    let themeId = '';
    let order_do = '';
    let departId = '';
    let person_type = '';
    let category = '';
    let categoryTwo = '';
	let curren = 1;
	let curren_id = 3944;
	// 判断页面刷新时 或 第一次加载 取地址栏传参
	let indexCodeTurn = 1;
    let personalIndex = utils.getQueryStringHr('personalportal');
	if(personalIndex != 3){
        $(".ztbm_wrap").html('<li class="ztbmsele">按主题</li><li>按部门</li>');
	}else{
        $(".ztbm_wrap").html('<li class="ztbmsele">按部门</li><li>按类别</li>');
	}
	intourl(personalIndex);

	//类型
	let categoryNum = "";
	//获取当前选择城县街道 id 和 文字
	
	//city获取不同 主题 部门 列表数据
	$("#sele").on('click', 'li', function () {
		$("#current_city").html($(this).text());
		curren_id = $(this).data('id');
		if(personalIndex == 3 ){
			service(curren_id);
			department(curren_id);
		}else{
			theme(curren_id);
			categories();
		}
		rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren)
	})
	
    //主题部门类别切换
    setTimeout(function(){
        $(document).on('click','.ztbm_wrap li',function(){
            let idx = $(this).index();
            $(this).addClass('ztbmsele').siblings().removeClass('ztbmsele');
            $("#search_condition").children().eq(idx).show().siblings().hide();
        })
    },500)
	
	//搜索
	$("#search_1").on('focus', function () {
		$("#qxsousuo").css('display', 'block');
	})
	$("#search_btn").on('click', function () {
		msg = $('#search_1').val();
		if (!msg) {
			layer.msg('请输入您要搜索的关键字');
		} else {
			$("#theme_no").addClass('select_con').siblings('li').removeClass('select_con');
			$("#bumen_no").addClass('select_con').siblings('li').removeClass('select_con');
			$("#show_ztbm").html('关键字搜索');
			rend(curren_id, '', msg, online_do, order_do, '', person_type, category, categoryTwo, curren);
		}
	})
	//取消搜索
	$("#qxsousuo").on('click', function () {
		$("#search_1").val('');
		$(this).css('display', 'none');
		rend(curren_id, '', '', online_do, order_do, '', person_type, category, categoryTwo, curren);
	})
	
	//网上办理
	$("#online_do").on('change', function () {
		if ($(this).prop('checked')) {$(this).next().attr('src', '../../common/images/portal/xz.png');online_do = '0_';
		} else {$(this).next().attr('src', '../../common/images/portal/wxz.png');online_do = '';}
		rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren)
	})
	//预约办理
	$("#order_do").on('change', function () {
		if ($(this).prop('checked')) {$(this).next().attr('src', '../../common/images/portal/xz.png');order_do = 1;}
		else {$(this).next().attr('src', '../../common/images/portal/wxz.png');order_do = '';}
		rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren)
	})
	
	//方法封装
	function intourl(mainIndex){
		$("#turn_main").children().eq(mainIndex).addClass('main_sele').siblings().removeClass('main_sele');

		//设置跳转办事指南的返回页面汉字
		if (mainIndex == 1 || mainIndex == 2) {
			$(".ztbm_wrap").children().eq(2).hide().siblings().show();
			person_type = mainIndex;
			category = '';
			categoryTwo = '';

			if(mainIndex == 1){
				document.title = '个人办事' ;
				person_type = 0;
				
				if(utils.getQueryStringHr('personalportal') == 1){
					$(".ztbm_wrap").children().eq(1).addClass('ztbmsele').siblings().removeClass('ztbmsele');
				}else{}

			}else if(mainIndex == 2){
				document.title = '法人办事' ;
				person_type = 1;
			}
			sessionStorage.setItem('second','personalthingList');
			theme(curren_id, person_type);
			department(curren_id);
			if(sessionStorage.getItem('doCode')){
				themeId = sessionStorage.getItem('doCode');
			}else{}
			rend(curren_id, themeId, msg, online_do, order_do, departId, person_type,category, categoryTwo, curren);
		} else {
			person_type = '';
			if(mainIndex == 3){
				$("#search_condition").eq(1).show().siblings().hide();
				category = 42;
				categories();
				document.title = '行政审批' ;
			}else if(mainIndex == 4){
				$(".ztbm_wrap").children().eq(2).hide().siblings().show();
				category = 43;
				document.title = '公共服务' ;
				service(curren_id);
			}
            sessionStorage.setItem('second','personalthingList');
			department(curren_id);
			rend(curren_id, themeId, msg, online_do, order_do, departId, person_type,category, categoryTwo, curren);
		}
	}
	
	//根据点击选择个人法人
	//公共服务 主题
	function service(cityId) {
        http(api.publicService/*,{cityId : cityId}*/).then((res) => {
            if (res.status > 0) {
                console.log(res);
                let zhuti_arr = res.data.themeList;
                let zhuti_str = '';
                if (zhuti_arr.length) {
                    for (let i = 0; i < zhuti_arr.length; i++) {
                        zhuti_str += `<li data-id="1"><a href="javascript:;">${zhuti_arr[i].name}</a></li>`;
                    }
                    zhuti_str += `</ul>`;
                    $("#zt").html(zhuti_str);
                } else {
                    layer.msg('公共服务主题请求失败')
                }
            } else {
                layer.msg('公共服务主题请求失败')
            }
        },(error) => {
            layer.msg('公共服务主题请求失败')
        })

// 		$.ajax({
// 			type: "get",
// 			url: 'https://www.easy-mock.com/mock/59a8ca144006183e48ef7fad/example/zhuti',
// 			dataType: 'json',
// 			cache: false,
// //			data: {cityId : cityId},
// 			success: function (data) {
// 				if (data.status > 0) {
// 					let zhuti_arr = data.data.themeList;
// 					let zhuti_str = '';
// 					if (zhuti_arr.length) {
// 						for (let i = 0; i < zhuti_arr.length; i++) {
// 							zhuti_str += '<li data-id="1"><a href="javascript:;">' + zhuti_arr[i].name + '</a></li>';
// 						}
// 						zhuti_str += '</ul>';
// 						$("#zt").html(zhuti_str);
// 					} 
// 				} else {
// 				}
// 			},
// 			error: function () {
// 				console.log('zhuti404');
// 			}
// 		});
	}
	//行政审批 类别
	function categories() {
        http(api.queryCategory,{categoryOne:42}).then((res)=>{
            if (res.status > 0) {
                let zhuti_arr = res.data.categoryList;
                let zhuti_str = '';
                if (zhuti_arr.length > 0) {
                    for (let i = 0; i < zhuti_arr.length; i++) {
                        zhuti_str += `<li data-id="${zhuti_arr[i].dict_id}"><a href="javascript:;">${zhuti_arr[i].dict_field_name}'</a></li>`;
                    }
                    zhuti_str += `<div class="clea"></div></ul>`;
                    $("#lb").html(zhuti_str);

                    if(sessionStorage.getItem('doCode') && indexCodeTurn == 1){
                        $.each(zhuti_arr,function(i,t){
                            if(sessionStorage.getItem('doCode') == t.dict_id){
                                $("#lb li[data-id='"+sessionStorage.getItem('doCode')+"']").addClass('select_click').siblings().removeClass('select_click');
                                
                                setTimeout(function(){$("#show_ztbm").html($(".select_click").html())},100)
                            }
                        })
                        indexCodeTurn = 2;
                    }else{}
                } else {
                    layer.msg('行政省批类别列表暂无数据')
                }
            } else {
                layer.msg('行政省批类别列表数据请求失败')
            }
        },(error)=>{
            layer.msg('行政省批类别列表数据请求失败')
        })
	}
	//个人主题
	function theme(theme, serviceObject) {
        let params = {
            cityId: theme,
            serviceObject: serviceObject //服务对象(0自然人1法人)
        }
        http(api.queryTheme,params).then((res) => {
            if (data.status > 0) {
                let zhuti_arr = data.data.themeList;
                let zhuti_str = '';
                if (zhuti_arr.length) {
                    for (let i = zhuti_arr.length - 1; i >= 0; i--) {
                        if(sessionStorage.getItem('doCode') && indexCodeTurn == 1 && sessionStorage.getItem('doCode').indexOf(zhuti_arr[i].id) > -1){
                            indexCodeTurn = 2;
                            zhuti_str += `<li class="select_click" data-id="${zhuti_arr[i].id}"><a href="javascript:;"> ${zhuti_arr[i].name}'</a></li>`;
                        }else{
                            zhuti_str += `<li data-id="${zhuti_arr[i].id}"><a href="javascript:;">${zhuti_arr[i].name}</a></li>`;
                        }
                    }
                    $("#zt").html(zhuti_str);
                    setTimeout(function(){$("#show_ztbm").html($(".select_click").html())},100)
                } else {
                    layer.msg('主题列表暂无数据')
                }
            } else {
                layer.msg('主题列表请求失败')
            }
        },(error) => {
            layer.msg('主题列表请求失败')
        })
	}
	
	//个人部门  数据渲染
	function department(dep) {
        http(api.queryDepartment).then((res) => {
            if (res.status > 0 && res.data != null) {
                $("#bm").parent().show();
                let bumen_arr = res.data.departmentList;
                let bumen_str = '';
                if (bumen_arr.length) {
                    for (let j = 0; j < bumen_arr.length; j++) {
                        bumen_str += `<li><a href="javascript:;" data-id="${bumen_arr[j].id }"> ${bumen_arr[j].name}</a></li>`;
                    }
                    $("#bm").html(bumen_str);

                    if(sessionStorage.getItem('doCode') && indexCodeTurn == 1){
                        $.each(zhuti_arr,function(i,t){
                            if(sessionStorage.getItem('doCode') == t.id){
                                $("#bm li[data-id='"+sessionStorage.getItem('doCode')+"']").addClass('select_click').siblings.removeClass('select_click');
                                setTimeout(function(){$("#show_ztbm").html($(".select_click").html())},100)
                            }
                        })
                        indexCodeTurn = 2;
                    }else{}
                } else {
                    $("#bm").parent().hide();
                };
            } else {
               layer.msg('部门列表数据请求失败')
            }
        },(error) => {
            layer.msg('部门列表数据请求失败')
        })
	}
	//筛选 申报 预约条件
	if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) <= 8) {
		$(".select_right").on('click', 'label', function () {
			if ($(this).attr('for') == 'online_do') {
				if ($(this).find('input').prop('checked') == false) {
					$(this).find('input').prop('checked', true);
					$(this).find('img').attr('src', '../../common/images/portal/xz.png');
					online_do = '0_';
				} else {
					$(this).find('input').prop('checked', false);
					$(this).find('img').attr('src', '../../common/images/portal/wxz.png');
					online_do = '';
				}
			} else {
				if ($(this).find('input').prop('checked') == false) {
					$(this).find('input').prop('checked', true);
					$(this).find('img').attr('src', '../../common/images/portal/xz.png');
					order_do = 1;
				} else {
					$(this).find('input').prop('checked', false);
					$(this).find('img').attr('src', '../../common/images/portal/wxz.png');
					order_do = '';
				}
			}
			rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren);
		})
	} else { };
	
	//悬浮主题部门 效果
	$("#search_condition").on('mouseover', 'li', function () {
		$(this).addClass('select_con').siblings().removeClass('select_con');
	})
	$("#search_condition").on('mouseout', 'li', function () {
		$("#search_condition li").removeClass('select_con');
	})
	//选中 主题部门类别  页面效果
	$("#search_condition").on('click', 'a', function () {
		//判断 传主题还是部门参数
		$(this).parent().addClass('select_click').siblings().removeClass('select_click');
		if ($(this).parents('ol').hasClass('zt')) {
			themeId = $(this).parent().data('id');
			departId = '';
			categoryTwo = '';
			rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren);
		} else if($(this).parents('ol').hasClass('bm')) {
			themeId = '';
			categoryTwo = '';
			departId = $(this).parent().data('id');
			rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren);
		} else if($(this).parents('ol').hasClass('lb')){
			categoryTwo = $(this).parent().data('id');
			themeId = '';
			departId = '';
			rend(curren_id, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, curren);
		}
		sessionStorage.setItem('doCode',$(this).parent().data('id'));
		$("#show_ztbm").text($(this).text())
		$("#show_select").show();
		$("#search_con").show();
	})
	//数据列表 数据
	let con_list = null;

	function rend(cityId, themeId, msg, online_do, order_do, departId, person_type,category, categoryTwo, curren) {
		console.log(curren_id, themeId, msg, online_do, order_do, departId, person_type,category, categoryTwo, curren)

		let personalId, legalId;
		if (person_type == 0) {
			personalId = themeId;
			legalId = '';
		} else if (person_type == 1) {
			personalId = '';
			legalId = themeId;
		} else {
			personalId = '';
			legalId = '';
        }
        
        let params = {
            cityId: cityId,
            naturalPersonTheme: personalId,
            legalPersonTheme: legalId,
            message: msg,
            managementForm: online_do,
            supportReservation: order_do,
            departmentId: departId,
            serviceObject: person_type,
            categoryOne: category,
            categoryTwo: categoryTwo,
            page: curren || 1
        }

        http(api.personalAffair,params).then((res) => {
            if (res.status > 0) {
                con_list = res.data;
                let con_list_sele = con_list.affairCatalogVoList;
                console.log(con_list_sele);
                getList(con_list_sele);

                //跳转页面
                $(".con_dropdown").on('click', 'a', function (e) {
                    e.preventDefault();
                    let href = $(this).attr('href');
                    doCode = $(this).parents('.con_dropdown').data('id');
                    let uRl = href + '?'+personalIndex+'&doCode=' + doCode;
                    if ($(this).attr('title') === '办事指南') {
                        window.location.href = uRl;
                    } else if ($(this).data('id') === 'yuyue') {
                        if (!sessionStorage.getItem('cusToken')) {
                            //没有登录
                            $("#myLoad").modal({
                                show: true
                            });
                            //								window.location.href = '';
                        } else {
                            //								$("#myModal").modal({show:true});
                            //登陆之后判断等级
                            //								if(){
                            //等级小 去实名认真 跳转页面
                            //									$("#myLoad").modal({show:true});
                            //									$("#modal_cont").html('<br />您的等级太低，是否跳转使命认证？<br />')
                            //									window.location.href="";
                            //								}else{
                            //等级大 跳转申报页面
                            //									window.location.href="";
                            sessionStorage.setItem('online', '预约');
                            window.location.href = uRl;
                            //								}
                        }
                    } else if ($(this).data('id') === 'shenbao') {
                        if (!sessionStorage.getItem('cusToken')) {
                            //如果没有登录
                            let con = `<div class="tan_qt">请先登陆个人用户信息</div>`;
                            modal(con);
                            $("#myLoad").modal({
                                show: true
                            });
                            //								window.location.href = 'http://172.28.6.162:8111/portal/UnifiedAuthentication/login';
                        } else {
                            //								$("#myModal").modal({show:true});
                            //登陆之后判断等级
                            //								if(){
                            //等级小 去实名认真 跳转页面
                            //									window.location.href="";
                            //								}else{
                            //等级大 跳转申报页面
                            sessionStorage.setItem('online', '申报');
                            window.location.href = uRl;
                            //								}
                        }
                    } else if ($(this).data('id') == 'collect') {
                        if (!sessionStorage.getItem('cusToken')) {
                            //没有登录
                            $("#myLoad").modal({show: true});
                            //								window.location.href = '';
                        } else {
                            if ($(this).find('img').attr('src') == '../../common/images/portal/collect_gray.png') {
                                $("#myModal").modal({show: true});
                            } else if ($(this).find('img').attr('src') == '../../common/images/portal/collect.png') {
//									$(this).find('img').attr('src','../../common/images/portal/')
                            } else {
                                $("#myLoad").modal({show: true});
                                $("#modal_cont").html('<br />您已收藏！请在我的收藏里查看<br />');
                            }
                        }
                    }
                })
                //分页
                page_str = '共<span class="all_data">' + con_list.affairCatalogVoList.length + '</span>条数据 &nbsp;&nbsp;<span class="prev_page" id="prev_page">上一页</span>&nbsp;&nbsp; 第<span class="curren_page" id="curren_page">' + curren + '</span>页 / 共<span class="all_page" id="all_page">' + con_list.affairCount + '</span>页  &nbsp;&nbsp;<span class="next_page" id="next_page">下一页</span>';
                $("#page").html(page_str);

                let cPage = $("#curren_page").html() - '';

                if (cPage <= 1) {$("#prev_page").addClass('dis');} 
                else if (cPage >= con_list.affairCount) {$("#next_page").addClass('dis');}
                //上一页
                $("#prev_page").on('click', function () {
                    if ($("#curren_page").html() <= 1) {
                        $(this).attr('disabled', true);
                    } else {
                        $(this).attr('disabled', false);
                        cPage -= 1;$("#curren_page").html(cPage);
                        rend(cityId, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, cPage)
                        if (cPage <= 1) {cPage = 1;}
                    }
                })
                //下一页
                $("#next_page").on('click', function () {
                    $("#prev_page").removeClass('dis');
                    if ($("#curren_page").html() < $("#all_page").html()) {
                        cPage += 1;$(this).attr('disabled', false);
                        rend(cityId, themeId, msg, online_do, order_do, departId, person_type, category, categoryTwo, cPage)
                    } else {cPage = $("#all_page").html();$(this).attr('disabled', true);}
                    $("#curren_page").html(cPage);
                })

                //下拉
                let non3 = 0;
                $(document).on('click', '.data_down', function () {
                    if (non3 === 0) {
                        $(this).css('margin-bottom', '12px');
                        $(this).parent().next().next().show();
                        $(this).find('img').attr('src', '../../common/images/portal/arrow2.png');
                        $(this).parent().parent().addClass('event_wrap');
                        non3 = 1;
                    } else {
                        $(this).parent().parent().removeClass('event_wrap');
                        $(this).css('margin-bottom', '0px');
                        $(this).parent().next().next().hide();
                        $(this).find('img').attr('src', '../../common/images/portal/arrow.png');
                        non3 = 0;
                    }
                })

                $("#page").show();
                $("#show_select").show();
                $("#search_con").show();
            } else {
                let nothing = '<div style="width:100%;height:580px;"><img src="../../common/images/portal/404.png" class="nothing"/></div>';
                $("#con_list").html(nothing);
                $("#page").hide();
                // $("#show_select").hide();
            }
        }, (error) => {

        })
    }

    function getList(con_list_sele){
        if(con_list_sele.length > 0){
            let dat_str = `<ul class="content_list">`;
            for (let y = 0; y < con_list_sele.length; y++) {
                if (con_list_sele[y].actualizeBillList.length <= 1) {
                    dat_str += `<li class="event_show clearfix"><div class="con_con"><p><a href="../../html/page/myguide.html?doCode=${con_list_sele[y].actualizeBillList[0].doCode}">${con_list_sele[y].actualizeBillList[0].name}</a>`;
                    // if(sessionStorage.getItem('main_id') == 0){
                    //     dat_str += '<img src="../../common/images/portal/lv'+con_list_sele[y].actualizeBillList[0].natureAffairLevel+'.png" style="margin-left:6px;" />';
                    // }else if(sessionStorage.getItem('main_id') == 1){
                    //     dat_str += '<img src="../../common/images/portal/lv'+con_list_sele[y].actualizeBillList[0].lawAffairLevel+'.png" style="margin-left:6px;" />';
                    // }
                    dat_str += `</p></div><div class="con_gongneng">&nbsp;</div><div class="con_dropdown" data-id="${con_list_sele[y].actualizeBillList[0].doCode}" data-lawlv="${con_list_sele[y].actualizeBillList[0].lawAffairLevel}"><ul><li class="gn_1"><a href="../../html/page/myguide.html" title="办事指南" ><img src="../../common/images/portal/zhinan.png" alt="" />  办事指南</a></li><li  class="gn_2">`;
                    //是否可预约
                    if (con_list_sele[y].actualizeBillList[0].supportReservation == 1) {
                        dat_str += `<a href="../../html/page/yy_sbxuzhi.html" title="网上预约" data-id="yuyue" ><img src="../../common/images/portal/yuyue.png" alt="网上预约" />  网上预约</a>`;
                    } else {
                        dat_str += `<a href="javascript:;" style="color:#aeaeae;" title="网上预约" ><img src="../../common/images/portal/yuyue_gray.png" alt="网上预约" />  网上预约</a>`;
                    }
                    dat_str += `</li><li class="gn_3">`;
                    //是否可网上申报
                    if (con_list_sele[y].actualizeBillList[0].managementForm.indexOf('0_') > -1) {
                        dat_str += `<a href="../../html/page/yy_sbxuzhi.html" data-id="shenbao" ><img src="../../common/images/portal/shensu.png" alt="" />  网上办理</a><div class="online_tishi">网上办理 ${con_list_sele[y].actualizeBillList[0].promptInfo}</div>`;
                    } else {
                        dat_str += `<a href="javascript:;" style="color:#aeaeae;" ><img src="../../common/images/portal/shensu_gray.png" alt="" />  网上办理</a>`;
                    }
                    dat_str += `</li><li><a href="javascript:;" style="color:#aeaeae;padding-left:19px;" data-id="collect"><img src="../../common/images/portal/collect_gray.png" />  收藏</a></li></ul></div><div class="clea"></div></li>`
                } else {
                    dat_str += `<li class=" clearfix"><div class="con_con"><p ><a>${con_list_sele[y].name}</a></p></div><div class="con_gongneng"><p class="data_down"><img src="../../common/images/portal/arrow.png" /><p></div><div class="clea"></div><div class="con_list_detail"><ul>`;
                    for (let x = 0; x < con_list_sele[y].actualizeBillList.length; x++) {
                        dat_str += `<li class="event_show clearfix"><div class="con_con"><img src="../../common/images/portal/circle.png" /><a href="../../html/page/myguide.html?doCode=${con_list_sele[y].actualizeBillList[0].doCode}">${con_list_sele[y].actualizeBillList[x].name }</a>`;
                            // if(sessionStorage.getItem('main_id')==1){
                            //     dat_str += '<img src="../../common/images/portal/lv'+con_list_sele[y].actualizeBillList[x].natureAffairLevel+'.png" style="margin-left:6px;" />';
                            // }else if(sessionStorage.getItem('main_id')==2){
                            //     dat_str += '<img src="../../common/images/portal/lv'+con_list_sele[y].actualizeBillList[x].lawAffairLevel+'.png" style="margin-left:6px;" />';
                            // }
                        dat_str += `</div><div class="con_gongneng"></div><div class="con_dropdown" data-id="${con_list_sele[y].actualizeBillList[x].doCode}"><ul><li class="gn_1"><a href="../../html/page/myguide.html" title="办事指南"><img src="../../common/images/portal/zhinan.png" alt="" />  办事指南</a></li><li>`;
                        //是否可预约
                        if (con_list_sele[y].actualizeBillList[x].supportReservation == 1) {
                            dat_str += `<a href="../../html/page/yy_sbxuzhi.html" data-id="yuyue" ><img src="../../common/images/portal/yuyue.png" alt="网上预约" />  网上预约</a>`;
                        } else {
                            dat_str += `<a href="javascript:;" title="网上预约" data-id="yuyue" ><img src="../../common/images/portal/yuyue_gray.png" alt="网上预约" />  网上预约</a>`;
                        }
                        dat_str += `</li><li class="gn_3">`;
                        //是否可网上申报
                        if (con_list_sele[y].actualizeBillList[x].managementForm.indexOf('0_') > -1) {
                            dat_str += `<a href="../../html/page/yy_sbxuzhi.html" data-id="shenbao" ><img src="../../common/images/portal/shensu.png" alt="网上办理" />网上办理</a>`;
                        } else {
                            dat_str += `<a href="javascript:;"  ><img src="../../common/images/portal/shensu_gray.png" alt="" /></a>`;
                        }
                        dat_str += `</li><li><a href="javascript:;" style="color:#aeaeae;padding-left:19px;" data-id="collect"><img src="../../common/images/portal/collect_gray.png" />  收藏</a></li></ul></div><div class="clea"></div></li>`;
                    }
                    dat_str += `</ul></div></li>`;
                }
            };
            dat_str += `</ul>`;
            $("#con_list").html(dat_str);
        } else {
            let nothing = '<div style="width:100%;height:580px;"><img src="../../common/images/portal/404.png" class="nothing"/></div>';
            $("#con_list").html(nothing);
            $("#page").hide();
        }
    }

    // 模态框
    function modal(con){
		layer.open({
			type: 1,
			title: "温馨提示",
			content: con,
			area:['300px','190px'],
			btn: ["确定"],
			move: false,
			resize: false,
			yes: function(index, layero) { //这里写最后的逻辑和传参
				layer.close(index);
			},
			shade: 0.3,
			maxmin: false
		});
	}
})
