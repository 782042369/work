/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 时间过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-30 18:23:01
 */
/**
 * 
 * @param {*} timestamp 时间
 * @param {*} formats 正则
 */
const zero = (time: any): number => {
	let arr = time < 10 ? '0' + time : time
	return arr
}
const datefilter = (timestamp: any, formats?: any) => {
	let myDate: any = new Date(timestamp)
	let year: any = myDate.getFullYear()
	let month: any = zero(myDate.getMonth() + 1)
	let day: any = zero(myDate.getDate())
	let hour: any = zero(myDate.getHours())
	let minite: any = zero(myDate.getMinutes())
	let second: any = zero(myDate.getSeconds())
	let val: any = formats || 'Y年m月d日 H:i'
	return val.replace(/Y|m|d|H|i|s/gi, function(matches: any): string {
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
