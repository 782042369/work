import './gosuggest.scss'
import '../../common/js/common'
import '../../common/js/servicecomponent/radio'
import '../../common/js/servicecomponent/downselect'
import '../../common/css/remind.scss'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import '../../common/js/servicecomponent/layer.js'

// 引入图片
$(function(){
	let cusT = sessionStorage.getItem('cusToken');
	
	let pub = true;
	let typeId = null;
	let title = null;
	let content = null;
	
	/*初始化加载*/
	getType();
	//建议类别 下拉
	$("#type_list").on('click','li',function(){
		typeId = $(this).data('id');
	})
	
	/*建议标题*/
	$("#suggest_title").on('blur',function(){
		var num = $(this).val().replace(/(^\s+)|(\s+$)/g, "").length;
		if(num>=30){
			let con = `<div class="tan_qt">请输入不超过30个字的建议标题</div>`;
			modal(con);
		}
	})
	
	/*输入框字数*/
	$("#suggest_txt").on('input',function(){
		var num = $(this).val().replace(/(^\s+)|(\s+$)/g, "").length;
		$("#words_current").text(num);
		if(num>=500){
			$(".words_num").css('color','#FF3B30');
			$(this).val($(this).val().substring(0,499));
		}else{
			$(".words_num").css('color','#AEAEAE');
		}
	})

	/*是否公开*/
	$(".suggest_public").on('change','input',function(){
		switch ($(this).parent().attr('for')){
			case 'yes' : pub = true;break;
			case 'no' : pub = false;break;
		}
	})
	//上传照片
	var imgList = [];
	$("input[type='file']").on('change',function(){
		//预览
		var files = this.files;
		var reader = new FileReader();
		var rThat;
		reader.readAsDataURL(files[0]);
		reader.onload = function(e){
			var mb = (e.total/1024)/1024;
			if(mb>= 10){
				let con = `<div class="tan_qt">文件大小大于10M</div>`;
				modal(con);
				return;
			}
			rThat = this;
		}
		
		//上传
		var formData = new FormData();
		var uploadData;
		formData.append("file",$(this)[0].files[0]);
		let that = $(this);
		$.ajax({
            type: 'post',
            url: 'http://172.28.50.186:8082/portal/tAffairsAppending/fileUpload',
            data: formData,
         	dataType:'json',
         	contentType:false,
         	processData:false,
         	async:true,
            cache:false, 
			crossDomain: true === !(document.all),
            success: function(data) {
				console.log(data);
				if(data.status >= 0){
					uploadData = that.val();
					var cA = $("<div >");
					var txt = uploadData.substring(uploadData.lastIndexOf('\\')-''+1);
					cA.html('<img src="'+rThat.result+'"><p><span class="del">x</span></p>');
					that.parents('.add').prev().append(cA);
					/*图片数组*/
					console.log(data)
					imgList.push({fileAddress:data.data[0],fileName:txt});
					
					//上传后删除
					$(".del").on('click',function(){
						//存放数组索引
						var index = $(this).parent().parent().index();
						//删除
						$(this).parent().parent().remove();
						//数组删除
						imgList.splice(index,1);
					})
				} else {
					layer.msg('文件上传失败')
				}
			},
			error: function(error){
				layer.msg('文件上传失败')
			}
        })
	})
	
	/*提交*/
	$("#sub").on('click',function(e){
		e.preventDefault();
		//评论内容
		content = $("#suggest_txt").val();
		title = $("#suggest_title").val();
		if($("#suggest_type").val() == '请选择'){
			let con = `<div class="tan_qt">请选择建议类别 </div>`;
			modal(con);
		}else{
			if(!$("#suggest_title").val()){
				let con = `<div class="tan_qt">请输入建议标题 </div>`;
				modal(con);
			}else{
				if($("#suggest_title").val().length > 30){
					let con = `<div class="tan_qt">建议标题请输入少于30个的字符</div>`;
					modal(con);
				}else{
					if($("#words_current").html()-''<1){
						let con = `<div class="tan_qt">请输入建议内容</div>`;
						modal(con);
					}else if($("#words_current").html()-''>500){
						let con = `<div class="tan_qt">请输入少于500字的建议内容</div>`;
						modal(con);
					}else{
						console.log(imgList);
						sub(imgList,pub,content,cusT,title,typeId);
					}
				}
			}
		}

		// http(api.fileUpload,{data: formData}).then((res) => {
		// 	console.log(res);
		// 	uploadData = that.val();
		// 	var cA = $("<div >");
		// 	var txt = uploadData.substring(uploadData.lastIndexOf('\\')-''+1);
		// 	cA.html('<img src="'+rThat.result+'"><p><span class="del">x</span></p>');
		// 	that.parents('.add').prev().append(cA);
		// 	/*图片数组*/
		//    imgList.push({fileAddress:res.data[0],fileName:txt});
			
		// 	//上传后删除
		// 	$(".del").on('click',function(){
		// 		//存放数组索引
		// 		var index = $(this).parent().parent().index();
		// 		//删除
		// 		$(this).parent().parent().remove();
		// 		//数组删除
		// 		imgList.splice(index,1);
		// 	})
		// },(error) => {
		// 	console.log(error);
		// 	layer.msg('文件上传失败')
		// })
	})
	
	function sub(imgList,pub,content,cusT,title,typeId){
		http(api.saveProposal,{attachments:imgList,canPublic:pub,content:content,cusToken:cusT,title:title,typeId:typeId}).then((res) => {
			if(res.status >= 0){
				console.log(res);
				let con = `<div class="tan_qt">提交成功！</div>`;
				modal(con);
				$('.layui-layer-btn0').on('click',function(){
					window.history.go(-1);
				})
			} else {
				layer.msg('建议提交失败');
			}
		},(error) => {
			layer.msg('建议提交失败');
		})
	}
	
	/*初始化加载*/
	function getType(){
		http(api.getProposalType).then((res) => {
			if(res.status > 0){
				let dat = res.data;
				let type_str = '';
				for(let i=0;i<dat.length;i++){
					type_str += '<li data-id="'+dat[i].typeId+'">'+dat[i].typeName+'</li>';
				}
				$("#type_list").html(type_str);
			}
		},(error) => {
			layer.msg('建议类型获取失败');
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
