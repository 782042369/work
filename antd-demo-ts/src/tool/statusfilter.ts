/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 状态过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-30 17:35:57
 */
/**
 * 
 * @param {*} value 传入类型 输出状态汉字 
 */
export const statusfilter = (value: number): string => {
	enum statusarr {
		'停用',
		'启用'
	}
	return statusarr[value]
}
/**
 * 
 * @param {*} value 传入number 输出节点汉字
 */
export const typefilter = (value: number): string => {
	enum statusarr {
		'模块',
		'菜单',
		'操作'
	}
	return statusarr[value]
}
/**
 * 
 * @param {*} value 传入数字 输出属性汉字
 */
export const typeattributeilter = (value: number): string => {
	enum statusarr {
		'单行录入',
		'多行录入',
		'选择录入'
	}
	return statusarr[value]
}
/**
 * 
 * @param {*} value 传入数字 输出属性汉子
 */
export const positioncode = (value: number): string => {
	enum statusarr {
		'顶部',
		'导航菜单',
		'底部'
	}
	return statusarr[value]
}
