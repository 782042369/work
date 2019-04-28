import './onlineorder.scss'
import '../../common/js/common'
import '../../common/css/layer.scss'

import '../../part/infolist/infolist'

import api from '../../common/js/api'
import http from '../../common/js/http'
import utils from '../../common/js/utils'

import 'layui-layer/layer.js'

let prev = require('../../common/images/portal/prev.png');
let next = require('../../common/images/portal/next.png');

//申请人cusToken
let cusToken = sessionStorage.getItem('cusToken');
//事项编码
let affairCode = utils.getQueryStringHr('affairCode');
// 办件编码
let affairId = utils.getQueryStringHr('affairProcessId');

// 日历
let rili_json = null;
let DtaT;
let date1, date2, day, Oyear;
let Omouth;
let Oday;
let Ohour;
let st;

getData(affairCode);

function getData(affairC){
    http(api.getAffairOrderTime,{affairCode:affairC}).then((res) => {
        if(res.status >= 0) {
			console.log(res)
            rili_json = res.data;
            
            DtaT = rili_json.nowdate.split("-");
            date1, date2, day,
            Oyear = DtaT[0],
            Omouth = DtaT[1],
            Oday = DtaT[2],
            Ohour = DtaT[3],
            st = 0;
            
			rili_init();

        } else {
            layer.msg('预约查询失败')
        }
    },(error) => {
        layer.msg('预约查询失败')
    })

}
// 是否可预约信息 
let html = ``; 

// 
let arrs_h=[];
let arrs_n=[];

let today = null;
let hours = null;
let	minutes = null;
let UrlS = location.href;
let DtaId = location.href.split("/");

// 初始化日历函数
function rili_init(){
	let json = rili_json;
	
	let JCalendarRili = new JCalendar(Oyear, Omouth, Oday, json);
	document.getElementById("calendar_contain").innerHTML = JCalendarRili.show(); // 执行构造函数里的show方法   /*  |xGv00|106707c554d687c1a77addb2ae941bcc */
	
	//日历旁边的可预约显示
	for(let i=0;i<json.list.length;i++){
		if(Oyear == json.list[i].year){
			for (let j = 0; j < json.list[i].data.length; j++) {
				if(Omouth == json.list[i].data[j].month){
					let dlen = new Date(Oyear, Omouth, 0).getDate();
					for(let n = Oday;n<=dlen;n++){
						for (let k = 0; k < json.list[i].data[j].item.length; k++){
							if(n == json.list[i].data[j].item[k].date){
								html += `<div class="all duan"><div class="half">当天可预约时段</div><div class="half">剩余可预约人数</div></div><div class="all tim"><div class="half2" id="date_time">
										<p><input type="radio" name="timeduan" checked value="1" id="am"/><label for="am"><span class="radio radioed"></span>上午${json.list[i].data[j].item[k].affairTime.amTime}</label></p>
										<p><input type="radio" name="timeduan" value="2" id="pm"/><label for="pm"><span class="radio"></span>下午 ${json.list[i].data[j].item[k].affairTime.pmTime}</label></p>
										</div><div class="half2" id="date_num">
										<p>剩余${json.list[i].data[j].item[k].affairTime.amPeople}个</p>
										<p>剩余${json.list[i].data[j].item[k].affairTime.pmPeople}个</p></div></div>
										<div class="sele">您选择的时间为</div>
										<div class="select_time">
										<p class="yuyue_dat" id="yearDate">${Oyear}-${json.list[i].data[j].month}-${json.list[i].data[j].item[k].date}</p>
										<p class="yuyue_dat" id="ampm">09:00-12:00</p><a href="../html/page/yuyue_success.html" id="go_yuyue">预约</a></div></div>`;
											
								arrs_h.push(html);
								arrs_n.push(n);
							}
						}
					}
					
					for (let k = 0; k < json.list[i].data[j].item.length; k++){
						//活动添加class
						$("#calendar tr td div").each(function(){
							let th = $(this).html();
							if(th == json.list[i].data[j].item[k].date){
								// $(this).addClass("has");
							}

							//显示的日期 添加 类current
							// if(new Date(json.showdate).getDate()==th){
							// 	$(this).addClass("current");
							// }
						});
						if(arrs_h.length>0){
							html = arrs_h[0];
							$("#calendar tr td div").eq(arrs_n[0]-1).addClass("current");
							st = 0;
						}
					}
				}
			}
		}
	}

	//初始化未来最近的显示数据
	let showdate = json.showdate.split("-");
	JCalendarRili.onclick(showdate[0], showdate[1], showdate[2], 1);
	
	$("#rili_info").html(html);

	// 上午下午选择
	$(".rili_right").on('click','.radio',function(){
		$(this).addClass('radioed').parents('p').siblings('p').find('span').removeClass('radioed');
		let ampmtxt = $(this).parent().text().split('').slice(2).join('');
		$("#ampm").html(ampmtxt);
	})

	//预约选择日期
	$('.rili_left td').on('mouseover','div',function(){
		JCalendarRili.click(this);
	});

	// 上个月 下个月  -1为上一个月  1为下一个月 
	$('.rili_left th').on('click','p',function(){
		let idx = $(this).index();
		if(idx == 0){
			JCalendarRili.update(-1);
		} else {
			JCalendarRili.update(1);
		}
	})

	//保存预约
	$(".rili_right").on('click','#go_yuyue',function(e){
		e.preventDefault();
		console.log("预约生效")
		let hrf = $(this).attr('href');
		//预约时间
		let orderT = $("#yearDate").text().replace(/(^\s+)|(\s+$)/g, "") + ' ' + $("#ampm").text().replace(/(^\s+)|(\s+$)/g, "");

		http(api.saveAffairOrder,{cusToken:cusToken || 0,affairProcessId:affairId,orderTime:orderT}).then((res) => {
			if (res.status >= 0) {
				sessionStorage.setItem('yuyue_success',JSON.stringify(data.data));
				// window.location.href = hrf;
			} else {
				layer.msg('预约失败')
			}
		},(error) => {
			layer.msg('预约失败')
		})
	})
}


function setCurTime(a) {
	if (typeof a != "object") return;
	
	if (a.D == "NaN") {
		a.D = date
	};
	$("selected_date").html(`${a.Y} - ${a.M} - ${a.D}`);
}

function getFullYear(d) {
	yr = d.getYear();
	if (yr < 1000) yr += 1900;
	return yr;
}

function JCalendar(year, month, date, json) { // 日历构造函数
	this.json = json;

	let _date = arguments.length == 0 ? new Date() : new Date(year, month - 1, date);
	//实例变量
	this.year = Oyear;
	this.month = Omouth;
	this.date = Oday;

	this.fday = new Date(this.year, this.month - 1, 1).getDay(); //每月第一天的前一天星期数
	this.dayNum = new Date(this.year, this.month, 0).getDate(); //每月的天数
	//成员变量，当前年月日
	JCalendar.cur_year = this.year;
	JCalendar.cur_month = this.month;
	//JCalendar.cur_date = _date.getDate();
	JCalendar.cur_date = this.date;
	setCurTime({
		//F: Gid("index_history"),
		Y: JCalendar.cur_year,
		M: JCalendar.cur_month,
		D: JCalendar.cur_date
	});
}
// 构造函数原型添加show方法
JCalendar.prototype = {
	show: function() {
		let _th = this;
		let json = _th.json;
		let fday = new Date(this.year, this.month - 1, 1).getDay(); //每月第一天的星期数
		//日历里的每个单元格的数据，预先定义一段空数组，对应日历里第一周空的位置。[注意星期天对应的数是0]
		let date = new Array(fday > 0 ? fday : 0);
		let dayNum = new Date(this.year, this.month, 0).getDate(); //每月的天数
		let html_str = new Array(); //保存日历控件的HTML代码
		let date_index = 0; //date数组的索引
		let weekDay = ["一", "二", "三", "四", "五"];
		for (let j = 1; j <= this.dayNum; j++) { //初始化date数组
			date.push(j);
		}
		html_str.push(`<table id='calendar' cellspacing='0' cellpadding='0' width='840'>`);
		html_str.push(`<th colspan='7' style='text-align:center;border-bottom: 1px solid #E8EAEB;background:#FFF'><p title='上一月份'  style='float:left;' class='prev'><img src='${prev}' width='15' height='15' /></p><span id='calendar_title' style='color:#333;font-weight:normal;font-size:16px;'>${_th.year}年${_th.month}月</span><p title='下一月份' style='float:right;' class='next'><img src='${next}' width='15' height='15' /></p></th>`);
		html_str.push(`<tr>`);
		html_str.push(`<td style='background:#fff;'>日</td>`);
		for (let i = 0; i < 5; i++) { //填充日历头
			html_str.push(`<td style='background:#fff'>${weekDay[i]}</td>`);
		}
		html_str.push(`<td  style='background:#fff;'>六</td>`);
		html_str.push(`</tr>`);
		//日历主体
		let tmp;
		for (let i = 0; i < 6; i++) { //填充日期，6行7列
			html_str.push("<tr>");
			for (let j = 0; j < 7; j++) {
				tmp = date[date_index++];
				tmp = tmp ? tmp : "";
	//			console.log(tmp); //日期
	//			console.log(Oyear); // 2017
				let ifkbespoke=false; // 是否可预约
				let ifkval="";
				for(let yl=0; yl<rili_json.list.length; yl++){
					if(Oyear==rili_json.list[yl].year){ // 等于年					
						for(let ml=0; ml<rili_json.list[yl].data.length; ml++){
							if(Omouth==rili_json.list[yl].data[ml].month){ // 等于月
								for(let dl=0; dl<rili_json.list[yl].data[ml].item.length; dl++){
									if(tmp==rili_json.list[yl].data[ml].item[dl].date){
										ifkbespoke=true;
										ifkval="可预约("+rili_json.list[yl].data[ml].item[dl].peopleNum+")";									
									}
								}
							}
						}
					}
				}		
				if (ifkbespoke) { // 可以预约的				
					html_str.push(`<td><div class='has'>${tmp} ${ifkval}</div></td>`);
				}else if (tmp == "") {
					html_str.push(`<td></td>`);
				}else {
					html_str.push(`<td><div>${tmp}</div></td>`);
				}
			}
			html_str.push(`</tr>`);
		}
		html_str.push(`</table>`);
		return html_str.join("");
	},
	update: function(_month) { // 上一个月  下一个月
		let json = this.json;
		let date = new Date(JCalendar.cur_year, JCalendar.cur_month - 1 + _month, 1);
		let fday = date.getDay(); //每月第一天的星期数
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let dayNum = new Date(JCalendar.cur_year, parseInt(JCalendar.cur_month) + _month, 0).getDate(); //每月的天数
		let tds = document.getElementById("calendar").getElementsByTagName("td");
		
		// alert(year) // 2017年份
		// alert(month)	// 12月份
		// alert(dayNum);	// 天数
		// alert(tds);		// 所有表格下的td DOM对象
		
		for (let i = 7; i < tds.length; i++){ // 清空日历内容
			tds[i].innerHTML = "";
		}
		document.getElementById("calendar_title").innerHTML = year + "年" + (month<10?('0'+month):month) + "月"; //更新显示年月
		//更新当前年月
		JCalendar.cur_year = year;
		JCalendar.cur_month = month;
			
		
		for (let j = 1; j <= dayNum; j++) {
			let ifkbespoke=false; // 是否可预约
			let ifkval="";
			for(let yl=0; yl<rili_json.list.length; yl++){
				if(year==rili_json.list[yl].year){ // 等于年					
					for(let ml=0; ml<rili_json.list[yl].data.length; ml++){
						if(month==rili_json.list[yl].data[ml].month){ // 等于月
							for(let dl=0; dl<rili_json.list[yl].data[ml].item.length; dl++){
								if(j==rili_json.list[yl].data[ml].item[dl].date){
									ifkbespoke=true;
									ifkval="可预约("+rili_json.list[yl].data[ml].item[dl].peopleNum+")";									
								}
							}
						}
					}
				}
			}			
			if(ifkbespoke){
				if (Oday.substr(0,1)=='0'){ let rqday=Oday.substr(1); }
				tds[6 + fday + j].innerHTML = "<div class='has' >" + j + ifkval+"</div>";
			}else {
				tds[6 + fday + j].innerHTML = "<div class='' >" + j + "</div>";
			}
		}
		

		//获取日期数据状态
		for(let i=0;i<json.list.length;i++){
			if(JCalendar.cur_year == json.list[i].year){
				for (let j = 0; j < json.list[i].data.length; j++) {
					if(parseInt(JCalendar.cur_month) == json.list[i].data[j].month){
						for (let k = 0; k < json.list[i].data[j].item.length; k++){
							$("#calendar tr td div").each(function(){
								//console.log()
								let th = $(this).html();
								th = th.length == 1 ? "0" + th : th;
								if(th == json.list[i].data[j].item[k].date){
									// $(this).addClass("has");
								}
							});

							let dlen = new Date(Oyear, Omouth, 0).getDate();
							for(let n =Oday; n<=dlen; n++){
								if(n == parseInt(json.list[i].data[j].item[k].date)){
									arrs_n.push(n);
								}
							}
							if(json.list[i].year == Oyear && json.list[i].data[j].month == Omouth && st == 0){
								let currenSelect = $("#yearDate").text().substr($("#yearDate").text().length-2,2);

								$("#calendar tr td div").each(function(){
									$("#calendar tr td div").removeClass("current");
									$("#calendar tr td div").eq(parseInt(arrs_n[0])+(currenSelect-arrs_n[0]-1)).addClass("current");
								});
							}
							else if(json.list[i].year == Oyear && json.list[i].data[j].month == (Omouth+1) && st == 1){
								$("#calendar tr td div").each(function(){
									if(parseInt($(this).html()) == parseInt(json.list[i].data[j].item[0].date)){
										$("#calendar tr td div").removeClass("current");
										$(this).addClass("current");
									}
								});
							}else if(json.list[i].year == (parseInt(Oyear) + 1) && Omouth == 12 && json.list[i].data[j].month == 1 && st == 1){
								$("#calendar tr td div").each(function(){
									if(parseInt($(this).html()) == parseInt(json.list[i].data[0].item[0].date)){
										$("#calendar tr td div").removeClass("current");
										$(this).addClass("current");
									}
								});
							}
						}
					}
				}
			}
		}
		this.onupdate(year, month, JCalendar.cur_date);
	},
	onupdate: function(year, month, date) { //日历更改时执行的函数，可以更改为自己需要函数,控件传递过来的参数为当前日期
		//alert(year + "年" + month + "月" + date + "日");
	},
	click: function(obj) {
		if($(obj).hasClass("has")){	
			if ($(obj).hasClass('current')) {
				return ;
			} else {
				$("#calendar div").removeClass("current");
				$(obj).addClass("current");
				this.onclick(JCalendar.cur_year, JCalendar.cur_month, parseInt(obj.innerHTML));
			}
			
		}
	},
	onclick: function(year, month, date, _index) {	
		let json = this.json;
		if(!_index){
			_index = 1;			
		}
		
		let today = new Date();
		let hours = today.getHours();
		let	minutes = today.getMinutes();
		if(!_index){
			_index = 1;
		}
		let mo = today.getMonth() + 1;
		let td = date.toString();
		let url;

//		console.log(year)
		let html_ = '';        
		for(let i=0;i<json.list.length;i++){
			if(year == json.list[i].year){
				for (let j = 0; j < json.list[i].data.length; j++) {
					if(month == json.list[i].data[j].month){
						let subHtml = '',totalCount = 0,tempDate;
						for (let k = 0; k < json.list[i].data[j].item.length; k++){
							if(date == json.list[i].data[j].item[k].date){
								totalCount++;
								
								tempDate = json.list[i].data[j].item[k].affairTime;
								if(_index == totalCount){
									subHtml += `<div class="all duan"><div class="half">当天可预约时段</div><div class="half">剩余可预约人数</div></div>
												<div class="all tim"><div class="half2" id="date_time">
												<p><input type="radio" name="timeduan" checked value="1" id="am"/><label for="am"><span class="radio radioed"></span>上午 ${json.list[i].data[j].item[k].affairTime.amTime}</label></p>
												<p><input type="radio" name="timeduan" value="2" id="pm"/><label for="pm"><span class="radio"></span>下午 ${json.list[i].data[j].item[k].affairTime.pmTime}</label></p></div>
												<div class="half2" id="date_num">
												<p class="yuyue_dat">剩余${json.list[i].data[j].item[k].affairTime.amPeople}个</p>
												<p class="yuyue_dat yuyue_mag">剩余${json.list[i].data[j].item[k].affairTime.pmPeople}个</p></div>
												</div><div class="sele">您选择的时间为</div>
												<div class="select_time">
												<p class="yuyue_dat" id="yearDate">${year}-${json.list[i].data[j].month}-${json.list[i].data[j].item[k].date}</p>
												<p class="yuyue_dat" id="ampm">09:00-12:00</p><a href="../html/page/yuyue_success.html" id="go_yuyue">预约</a></div></div>`;
								}
							}
						}
						//<div class="dashiji_page"><span class="d_r2"></span><span class="d_l2"></span><i>1</i>/5</div>
						
						if(_index < totalCount){
							html_ += `<span class="d_r2" onclick="this.onclick(${JCalendar.cur_year}, ${JCalendar.cur_month},${tempDate},${_index + 1});"></span> <i>${_index}</i>${totalCount}</div>`;
						}
						html_ += subHtml;
					}
				}
			}
		}
		$("#rili_info").html(html_);
 	
		setCurTime({		
			Y: year,
			M: month,
			D: date
		})
	}
}