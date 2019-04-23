"use strict";
/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ts 函数
 * @Date: 2019-04-22 15:40:22
 * @LastEditTime: 2019-04-22 20:10:33
 */
/*  es5
function run() {
    console.log('run: ')
}
let run1 = function() {
    console.log('run: ')
}
 */
function get(str) {
    if (typeof str === 'string') {
        return "name" + str;
    }
    else {
        return "age" + str;
    }
}
// console.log(get(true))
