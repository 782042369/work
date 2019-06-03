/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 时间过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-06-03 11:33:40
 */

type Time = keyof {
	Y: string
	m: string
	d: string
	H: string
	i: string
	s: string
}
/**
 * 
 * @param time 补零
 */
const zero = (time: any): string => {
	let arr = time < 10 ? '0' + time : time
	return arr
}
/**
 * 
 * @param {*} timestamp 时间
 * @param {*} formats 正则
 */
const datefilter = (timestamp: number, formats?: any): string => {
	let myDate: any = new Date(timestamp)
	let year: number = myDate.getFullYear()
	let month: string = zero(myDate.getMonth() + 1)
	let day: string = zero(myDate.getDate())
	let hour: string = zero(myDate.getHours())
	let minite: string = zero(myDate.getMinutes())
	let second: string = zero(myDate.getSeconds())
	let val: any = formats || 'Y年m月d日 H:i'
	return val.replace(/Y|m|d|H|i|s/gi, (matches: Time): any => {
		return {
			Y: year,
			m: month,
			d: day,
			H: hour,
			i: minite,
			s: second
		}[matches]
	})
}
export default datefilter
