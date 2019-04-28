import './gocomplaints.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'
import '../../common/css/remind.scss'
import '../../common/js/servicecomponent/downselect'
import '../../common/js/servicecomponent/radio'
import api from '../../common/js/api'
import http from '../../common/js/http'
import '../../common/js/servicecomponent/layer.js'

$(function(){
	let cusT = sessionStorage.getItem('cusToken');
	
    let pub = true;
    let content;
    let title;
	
    let typeId = '';
    let areaId = '';
	/*初始化加载*/
	$('.disabled').attr('disabled',true);
	//所属地区 投诉部门 下拉
	$("#area_list").on('click','li',function(){
		areaId = $(this).data('id');
		$("#complants_department").val('');
		getDepart(areaId);
	})
	
	$("#depart_list").on('click','li',function(){
		typeId = $(this).data('id');
	})
	
	/*输入框字数*/
	$("#complants_txt").on('input',function(){
		let num = $(this).val().replace(/(^\s+)|(\s+$)/g, "").length;
		$("#words_current").text(num);
		if(num>=500){
			$(this).val($(this).val().substring(0,499));
			$(".words_num").css('color','#FF3B30');
		} else {
			$(".words_num").css('color','#AEAEAE');
        }
	})

	/*是否公开*/
	$(".suggest_public").on('change','input',function(){
		$(this).next().attr('src','../../common/images/portal/radioed.png').parent().siblings().find('img').attr('src','../img/radiono.png')
		switch ($(this).parent().attr('for')){
			case 'yes' : pub = true;break;
			case 'no' : pub = false;break;
		}
	})
	//上传照片
	let imgList = [];
	$("input[type='file']").on('change',function(){
		//预览
		let files = this.files;
		let reader = new FileReader();
		let rThat;
		reader.readAsDataURL(files[0]);
		reader.onload = function(e){
			let mb = (e.total/1024)/1024;
			if(mb>= 10){
				alert('文件大小大于10M');
				return;
			}
			rThat = this;
		}
		
		//上传
		let formData = new FormData();
		let uploadData;
		formData.append("file",$(this)[0].files[0]);
		that = $(this);
		$.ajax({
            type: 'post',
            url:'http://172.28.50.186:8082/tAffairsAppending/fileUpload',
            data: formData,
         	dataType:'json',
         	contentType:false,
         	processData:false,
         	async:true,
            cache:false, 
			crossDomain: true === !(document.all),
            success: function(data) {
            	console.log(data);
            	uploadData = that.val();
				let cA = $("<div >");
				let txt = uploadData.substring(uploadData.lastIndexOf('\\')-''+1);
				cA.html('<img src="'+rThat.result+'"><p><span class="del">x</span></p>');
				that.parents('.add').prev().append(cA);
                /*图片数组*/
               imgList.push({fileAddress:data.data[0],fileName:txt});
                
                //上传后删除
	        	$(".del").on('click',function(){
	        		//存放数组索引
	        		let index = $(this).parent().parent().index();
	        		//删除
	        		$(this).parent().parent().remove();
	        		//数组删除
	        		imgList.splice(index,1);
	        	})
            }
        })
	})
	
	//标题 离焦
	$("#complants_title").on('blur',function(){
        let num = $(this).val().replace(/(^\s+)|(\s+$)/g, "").length;
		if(num > 30){
            let con = `<div class="tan_qt">请输入不超过30个字的建议标题</div>`;
            modal(con);
		}
	})
	
	/*提交*/
	$("#sub").on('click',function(e){
		e.preventDefault();
		//投诉标题
		let conplantsTit = $("#complants_title").val().replace(/(^\s+)|(\s+$)/g, "");
		if(areaId == ''){
            let con = `<div class="tan_qt">请选择所属地区！</div>`;
            modal(con);
		}else{
			if(typeId == ''){
                let con = `<div class="tan_qt">请选择投诉部门！</div>`;
                modal(con);     
			}else{
				if(!conplantsTit){
                    let con = `<div class="tan_qt">请输入投诉标题</div>`;
                    modal(con);
				}else if(conplantsTit.length > 30){
                    let con = `<div class="tan_qt">请输入不超过30个字的投诉标题</div>`;
                    modal(con);
				}else{
					title = conplantsTit;
					if($("#words_current").html()-''<1){
                        let con = `<div class="tan_qt">请输入投诉内容</div>`;
                        modal(con);
					}else if($("#words_current").html()-''>500){
                        let con = `<div class="tan_qt">请输入少于500字的建议内容</div>`;
                        modal(con);
					}else{
						content = $("#complants_txt").val();
						sub(imgList,pub,content,cusT,areaId,typeId,title)
					}
				}
			}
		}
	})
	
	function sub(imgList,pub,content,cusT,areaId,typeId,title){
        http(api.saveWholeComplaint,{attachments:imgList,canPublic:pub,content:content,cusToken:cusT,districtId:areaId,departmentId:typeId,title:title}).then((res) => {
            if(res.status > 0){
				console.log(res);
				let con = `<div class="tan_qt">提交成功！</div>`;
				modal(con);
				$('.layui-layer-btn0').on('click',function(){
					window.history.go(-1);
				})
			}else{
                layer.msg('投诉提交失败');
            }
        }, (error) => {
            layer.msg('投诉提交失败');
        })
	}
	
	/*初始化加载*/
	getArea();
	function getArea(){
        http(api.getDistrictList).then((res) => {
            if(res.status > 0){
                let arr = res.data;
                let str = '';
                for(let i=0;i<arr.length;i++){
                    str += '<li data-id="'+arr[i].distId+'">'+arr[i].distName+'</li>'
                }
                $("#area_list").html(str);
            }else{
                layer.msg('地区列表获取失败')
            }
        },(error) => {
            layer.msg('地区列表获取失败')
        })
    }
    
	function getDepart(param){
        http(api.getDepartmentList,{distId:param}).then((res) => {
            if(res.status >= 0){
                let str = '';
                if(res.data.length != 0){
                    let dArr = res.data;
					for(let i=0;i<dArr.length;i++){
						str += '<li data-id="'+dArr[i].deptId+'">'+dArr[i].deptName+'</li>'
					}
                } else {
                    str += '<li class="disabled">暂无数据</li>'
                }
                $("#depart_list").html(str);
            } else {
                layer.msg('投诉部门列表数据获取失败')
            }
        },(error) => {
            layer.msg('投诉部门列表数据获取失败')
        })
	}

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
});
