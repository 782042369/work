import '../css/common.scss'
import './servicecomponent/layer.js'
import laydate from './servicecomponent/laydate.js'

// import "./font/iconfont.css"
// 引入全局脚本

$(function() {

    // 我的办件 日期插件
    let start = laydate.render({
        elem: '#startDate',
        min: '1900-1-1 00:00:00',
        max: '2099-6-16 23:59:59',
        trigger: 'click', //采用click弹出
        done: function (value, date, endDate) {
            end.config.min = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            }; //开始日选好后，重置结束日的最小日期
            end.config.value = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            }; //将结束日的初始值设定为开始日
        }
    });


    //结束时间
    let end = laydate.render({
        elem: '#endDate',
        min: '1900-1-1 00:00:00',
        max: '2099-6-16 23:59:59',
        trigger: 'click', //采用click弹出
        done: function (value, date, endDate) {
            start.config.max = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            }; //结束日选好后，重置开始日的最大日期
        }
    });

})
