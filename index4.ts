/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ts 接口
 * @Date: 2019-04-22 15:40:22
 * @LastEditTime: 2019-04-23 12:11:31
 */
// es5定义方法
/* function printlabel() {
	console.log('printlabel')
} */
// ts定义方法
/* function printlabel(params: string): void {
	console.log(params)
}
printlabel('dadas') */

/* function printlabel(params: { 'label': string }): void {
	console.log(params)
}
printlabel({ label: 'dadas' }) */

// 批量函数传参数约束
// 接口定义行为和动作规范

// interface fullname {
// 	firstname: string
// }
// function printlabel(name: fullname) {
// 	console.log(name.firstname)
// }

// /* printlabel({ // 报错
// 	age: 12,
// 	firstname: '1213'
// }) */
// const obj = {
// 	// 报错
// 	age: 12,
// 	firstname: '1213'
// }
// printlabel(obj)

// 可选属性接口
// interface fullname {
// 	firstname: string
// 	firstage?: string
// }
// function printlabel(name: fullname) {
// 	console.log(name.firstname)
// }

// /* printlabel({ // 报错
// 	age: 12,
// 	firstname: '1213'
// }) */
// printlabel({
// 	// 报错
// 	firstname: '1213'
// })
/* interface config {
	url: string
	datatype: string
	data?: string
	type: string
}
function ajax(config: config) {
	var xhr = new XMLHttpRequest()
	xhr.open(config.type, config.url, true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.onreadystatechange = function() {
		// readyState == 4说明请求已完成
		if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
			// 从服务器获得数据
			if (config.datatype === 'json') {
				console.log('xhr.responseText: ', JSON.parse(xhr.responseText))
				console.log('xhr: ', xhr)
			} else {
				console.log('xhr.responseText: ', xhr.responseText)
			}
		}
	}
	xhr.send(config.data)
}
ajax({
	url: 'http://a.itying.com/api/productlist', // api
	datatype: 'json',
	data: 'string',
	type: 'get'
})
 */
// 加密的函数类型
/* interface encrypt {
	(key: string, value: string): string
}
const md5: encrypt = function(key: string, value: string): string {
	return key + value
}
console.log(md5('name', 'zhangsan'))
 */

// 索引接口
// 对数据的约束
/* interface arr {
	[index: number]: string
}
let s: arr = [ '12', '312' ]
console.log('s: ', s[0]) */
// 对象的约束
/* interface obj {
	[index: string]: string
}
let b: obj = {
	name: '12',
	age: '312'
}
 */
// 类类型接口 对类的约束
/* interface obj {
	name: string
	eat(str: string): void
}
class dog implements obj {
	name: string
	constructor(name: string) {
		this.name = name
	}
	eat(): void {
		console.log('str: ', this.name)
	}
}
const dog1 = new dog('小黑')
dog1.eat() */
// 接口扩展
interface animal {
	eat(): void
}
interface person extends animal {
	work(): void
}
class pro {
	public name: string
	constructor(name: string) {
		this.name = name
	}
	coding(code: string) {
		console.log('coding: ', this.name)
	}
}
class web extends pro implements person {
	constructor(name: string) {
		super(name)
	}
	eat(): void {
		console.log('eat ', this.name)
	}
	work(): void {
		console.log('work ', this.name)
	}
}
