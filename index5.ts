/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ts 泛型
 * @Date: 2019-04-22 15:40:22
 * @LastEditTime: 2019-04-23 12:28:16
 */
// 只能返回string
/* function getdata(value: string): string {
	return value
} */
// 同时返回多个数据类型
// any 放弃类 数据类型
/* function getdata(value: any): any {
	return value
} */
// 泛型
/* function getdata<T>(value: T): T {
	return value
}
getdata<number>(1)
getdata<string>('1') */

/* function getdata<T>(value: T): any {
	return '2131'
}
getdata<number>(1)
getdata<string>('1') */
// 泛型类

/* class minclass {
	public list: number[] = []
	add(num: number) {
		this.list.push(num)
	}
	min() {
		let minnum = this.list[0]
		for (let i in this.list) {
			if (minnum > this.list[i]) {
				minnum = this.list[i]
			}
		}
		return minnum
	}
}
let m = new minclass()
m.add(2)
m.add(3)
m.add(4)
m.add(1000)
console.log(m.min())
 */
class minclass<T> {
	public list: T[] = []
	add(value: T) {
		this.list.push(value)
		console.log('this.list: ', this.list)
	}
	min(): T {
		let minnum = this.list[0]
		for (let i in this.list) {
			if (minnum > this.list[i]) {
				minnum = this.list[i]
			}
		}
		return minnum
	}
}
let m = new minclass()
m.add('a')
m.add('d')
m.add('t')
console.log(m.min())
