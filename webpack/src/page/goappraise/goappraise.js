import './goappraise.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'
import api from '../../common/js/api'
import http from '../../common/js/http'
import '../../common/js/servicecomponent/layer.js'

let bluelittle = require('../../common/images/portal/blue.png');

$(function(){
	if(sessionStorage.getItem('cusToken')){
		$("#load_info").html(`<img src="${bluelittle}"/>您也可以登录<a href="">我的办件</a>进行办件服务的评价 。`)
	}
	
	$("#sub").on('click',function(e){
		e.preventDefault();
		let affairProcessId = $("#affair").val();
		let pas = $("#pas").val();
		let hrf = $(this).attr('href');
		sub(affairProcessId,pas,hrf);
	})
	function sub(affairProcessId,pas,hrf){
        http(api.searchTAffairsByCheckPassword,{affairProcessId:affairProcessId,affairCheckPassword:pas}).then((res) => {
            if(res.status > 0){
                location.href = hrf + '?doCode='+affairProcessId;
            }else{
                $(".tishi").css('opacity',1);
            }
        },(error) => {
            $(".tishi").css('opacity',1);
        })
	}
});
