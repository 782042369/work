import './personalappraise.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'
import paging from '../../common/js/servicecomponent/paging.js'

import 'layui-layer/layer.js'

$(function(){
    // 分页加载
    let pagint = false;
	//初始化数据显示
    let cus = sessionStorage.getItem('cusToken');
    let page = 1;
	getList(cus,page);
	//设置调回页面标示
	sessionStorage.setItem('second','个人投诉');
	//清楚缓存
	sessionStorage.removeItem('online');
	sessionStorage.removeItem('affairName');
    sessionStorage.removeItem('yuyue_success');
    
	function getList(cus,page){
		let data = {
			cusToken : "1",
			page : page || 1,
			size : 10
        }
        http(api.getScoreListByCusToken,data).then((res) => {
            if(res.status >= 0){
                console.log(res);
                let dat = res.data;
                getListStr(dat);
                
                let params = {
					pageSize:10,
					totalRow:parseInt(dat[0].count),
					totalPage:Math.ceil(dat[0].count/10)
                }
                console.log(params);
                pageinit(params,page);
                
                $(document).off().on('click','.remove',function(e){
					let aff = $(this).data('id');
					e.preventDefault();

					let con = `<div class="tan_qt">您确定要删除该记录么？</div>`;

					modal(con,aff);
					
				})

            }else{
                $(".nodata").show();
                layer.msg('我的建议数据列表获取失败')
            }
        },(error) => {
            $(".nodata").show();
            layer.msg('我的建议数据列表获取失败')
        })
  }

    // 数据展示
    function getListStr(dat){
        let html = "";
        $.each(dat, function(i, comment) {
            let n = i + 1;
            html += `<tr><td>${n}</td><td>${dat[i].affairName}</td><td>${dat[i].createTime}</td><td class="td_two"><a href="../page/personalratingdetails.html?rating&${dat[i].affairProcessId}" class="look">查看</a><a href="javascript:;" data-id="${dat[i].affairProcessId}" class="remove">删除</a></td>`;
        });
        $("#complants_list").html(html);
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
                    getList(cus,pageNo);
                }
            });
        }
        pagint = true;
    }

    // 删除框
	function modal(con,aff){
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
				http(api.delScore,{affairProcessId:aff}).then((res) => {
                    if(res.status >= 0){
                        getList(1);
                    } else {
                        layer.msg('删除失败')
                    }
                },(error) => {
                    layer.msg('删除失败')
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
