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

// ts
/* function run(): string {
	// 正确
	return '124'
}
function run(): string {
	// 错误
	return 124
}
 */
/* let fn = function(): number {
	return 1
}
fn() */

// ts定义函数传参数

/* function get(name: string, age: number): string {
	return `name---${name},age---${age}`
}
get('xiaoli', 12)
console.log(get('xiaoli', 12)) */
/* function get(name: string, age?: number): string {
	// 可选参数 age 放到最后
	if (age) {
		return `name---${name},age---${age}`
	} else {
		return `name---${name}`
	}
}
console.log(get('xiaoli', 12)) */
/* function get(name: string, age: number = 20): string {
	// 默认参数 age 放到最后
	if (age) {
		return `name---${name},age---${age}`
	} else {
		return `name---${name}`
	}
}
console.log(get('xiaoli', 12)) */

// 剩余参数
/* function sum(a: number, b: number, d: number, c: number): number {
	return a + b + c + d
}
sum(1, 2, 3, 4)
console.log('sum(1, 2, 3, 4): ', sum(1, 2, 3, 4)) */
/* function sum(...result: number[]): number {
	return result.reduce((acc, cur) => acc + cur)
}
sum(1, 2, 3, 4)
console.log('sum(1, 2, 3, 4): ', sum(1, 2, 3, 4)) */
// ts 函数重载
function get(name: string): string
function get(age: number): number
function get(str: any): any {
	if (typeof str === 'string') {
		return `name${str}`
	} else {
		return `age${str}`
	}
}
// console.log(get(true))
