"use strict";
/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ts 数据类型
 * @Date: 2019-04-22 15:40:22
 * @LastEditTime: 2019-04-22 16:15:06
 */
// 布尔类型 boolean
/* let flag: boolean = true
flag = false
console.log('flag: ', flag) */
// 数字 number
/* let arr: number = 1
arr = 2
console.log('arr: ', arr) */
// 字符串 string
/* let arr: string = '1'
arr = '2'
console.log('arr: ', arr) */
// 数组 array
// let arr = [ 1, 2 ] es5
// let arr: number[] = [ 111, 22 ]
// let arr: Array<number> = [ 11, 22 ]
// 元组类型
// let arr: [number, string] = [ 1, '3' ]
// 枚举类型 enum
/* enum flag {
    success = 1,
    error = 2
}
let f: flag = flag.error
console.log('f: ', f)
 */
/* enum color {
    blue,
    red,
    'black'
}
let c: color = color.red
console.log('c: ', c) // 1 标识符没有赋值 值就是下标 */
var color;
(function (color) {
    color[color["blue"] = 0] = "blue";
    color[color["red"] = 3] = "red";
    color[color["black"] = 4] = "black";
})(color || (color = {}));
var d = color.red;
var c = color.black;
console.log('d: ', d); // 3 标识符没有赋值 值就是下标
console.log('c: ', c); // 4 标识符没有赋值 值就是下标
// 任意类型 any
/* let num: any = 2
num = '1'
num = true
console.log('num: ', num) */
// let odiv: Object = document.getElementById('divbox')
/* let odiv: any = document.getElementById('divbox')
odiv.style.color = 'red' // Object is possibly 'null'. */
// null number (nerver的子类)
/* let num: number
console.log('num: ', num) // undefined */
/* let num: undefined
console.log('num: ', num) // undefined */
/* let num: number | undefined
console.log('num: ', num) // undefined
num = 1
console.log('num: ', num) // number */
/* let num: number | null | undefined
console.log('num: ', num) // undefined
num = 1
console.log('num: ', num) // number */
// void 函数没有返回值
/* function run() {
    // es5
    console.log('run: ')
} */
/* function run(): void {
    console.log('run: ')
} */
/* function run(): void {
    // Type '1' is not assignable to type 'void'.
    console.log('run: ')
    return 1
}
 */
/* function run(): number {
    // Type '1' is not assignable to type 'void'.
    console.log('run: ')
    return 1
}
 */
