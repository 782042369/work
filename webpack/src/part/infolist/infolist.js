import './infolist.scss'
import 'babel-polyfill';
//初始化list
// if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=8){
//     $(".info_list").css({'position':'absolute','left':'0%'});
// }

//滚动 list显示
window.onscroll = function(){
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //ie7
    // if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=7){
    //     console.log(scrollTop);
    //     if(scrollTop>=118){
    //         $(".info_list").css({'position':'fixed','top':'10px'});
    //     }else{
    //         $(".info_list").css({'position':'absolute','top':0});
    //     }
    // }else if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=8){
    //     if(scrollTop>=118){
    //         $(".info_list").css({'position':'absolute','top':scrollTop-''-118});
    //     }else{
    //         $(".info_list").css({'position':'absolute','top':'20px'});
    //     }
    // }else if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){
    //     if(scrollTop>=118){
    //         $(".info_list").css({'position':'absolute','top':scrollTop-''-138});
    //     }else{
    //         $(".info_list").css({'position':'absolute','top':0});
    //     }
    // }else if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=10){
    //     if(scrollTop>=118){
    //         $(".info_list").css({'position':'absolute','top':scrollTop-''-138});
    //     }else{
    //         $(".info_list").css({'position':'absolute','top':0});
    //     }
    // }else{
        if(scrollTop>=105){
            $(".info_list").css({'top':0});
        }else{
            $(".info_list").css({'top':169});
        }
    // }
}

let idx = 0;
if (location.href.includes('personalinfo')){
    idx = 0;
} else if (location.href.includes('personaloffice')){
    idx = 1;
} else if (location.href.includes('personalsuggest') || location.href.includes('proposal')){
    idx = 2;
} else if (location.href.includes('personalcomplaints') ||  location.href.includes('complaints')){
    idx = 3;
} else if (location.href.includes('personalconsulting') || location.href.includes('advisory')){
    idx = 4;
} else if (location.href.includes('personalappraise') || location.href.includes('rating')){
    idx = 5;
} else if (location.href.includes('personalcollect')){
    idx = 6;
} else if (location.href.includes('personalbusinesslice')){
    idx = 7;
} else if (location.href.includes('personalmessages')){
    idx = 8;
}
$("#info_list").children().eq(idx+1).addClass('info_onselect').siblings().removeClass('info_onselect');