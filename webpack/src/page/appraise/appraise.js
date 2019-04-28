import './appraise.scss'
import '../../common/js/common'
import '../../common/js/servicecomponent/radio'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import utils from '../../common/js/utils'

import '../../common/js/servicecomponent/layer.js'

let star = require('../../common/images/portal/grade.png');
let star_gray = require('../../common/images/portal/grade_gray.png');

$(function(){
    let affairProcessId = utils.getQueryStringHr('doCode');
	let cusT = sessionStorage.getItem('cusToken') || 1; //必传
    let score = '';
    let times = '';
    let content = null;
	$("#times").on('change','input',function(){
        times = $(this).parent().data('times');
	})
	
	/*输入框字数*/
	$("#appraise_txt").on('input',function(){
		let num = $(this).val().replace(/(^\s+)|(\s+$)/g, "").length;
		$("#words_current").text(num);
		if(num>=500){
			$(this).val($(this).val().substring(0,499));
		}
	})
	//满意程度 等级
	$("#gradee").on('click','img',function(){
		let num = $(this).index()-''+1;
		let imgS = $(this).parent().children('img');
		for(let i=0;i<=num;i++){
			imgS.eq(i).attr('src',star);
		}
		for(let j=num;j<=imgS.length-'';j++){
			imgS.eq(j).attr('src',star_gray)
		}
		let rating = ['非常不满意','不满意','基本满意','满意','非常满意'];
		$("#rating").html(rating[num-1]);
		score = num;
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
            success: (res) => {
                if(res.status >= 0){
                    uploadData = that.val();
                    let cA = $("<div >");
                    let txt = uploadData.substring(uploadData.lastIndexOf('\\')-''+1);
                    cA.html('<img src="'+rThat.result+'"><p><span class="del">x</span></p>');
                    that.parents('.add').prev().append(cA);
                    /*图片数组*/
                   imgList.push({fileAddress:res.data[0],fileName:txt});
                    
                    //上传后删除
                    $(".del").on('click',function(){
                        //存放数组索引
                        let index = $(this).parent().parent().index();
                        //删除
                        $(this).parent().parent().remove();
                        //数组删除
                        imgList.splice(index,1);
                    })
                } else {
                    layer.msg('图片上传失败')
                }
            },
            error: (error) => {
                layer.msg('图片上传失败')
            }
        })
	})
	
	/*提交*/
	$("#sub").on('click',function(e){
		e.preventDefault();
		//评论内容
		content = $("#appraise_txt").val();
		if(times === ''){
            let con = `<div class="tan_qt">请选择该事项跑窗口的次数！</dd><div class="clea"></div></div>`;
            modal(con);
		}else{
			if(score == ''){
                let con = `<div class="tan_qt">请选择服务评分等级！</dd><div class="clea"></div></div>`;
                modal(con);     
			}else if(score <= 2){
				if(!$("#appraise_txt").val()){
                    let con = `<div class="tan_qt">请填写评价内容！</dd><div class="clea"></div></div>`;
                    modal(con);
				}else{
					sub(affairProcessId,imgList,content,cusT,score,times);
				}
			}else{
				sub(affairProcessId,imgList,content,cusT,score,times);
			}
		}
	})
	
	function sub(affairProcessId,imgList,content,cusT,score,times){
		let params = {affairProcessId:affairProcessId,attachments:imgList,content:content,cusToken:cusT,score:score,times:times};
        http(api.saveWholeScore,params).then((res) => {
            if(res.status > 0){
                let con = `<div class="tan_qt">提交成功</dd><div class="clea"></div></div>`;
                modal(con);
                $('.layui-layer-btn0').on('click',function(){
					window.history.go(-2);
				})
            } else {
				let con = `<div class="tan_qt">提交失败</dd><div class="clea"></div></div>`;
				modal(con);	
			}
        },(error) => {
            let con = `<div class="tan_qt">提交失败</dd><div class="clea"></div></div>`;
            modal(con);
        })
    }
    // modal
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
